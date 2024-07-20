package com.todo_backend.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@RequiredArgsConstructor
@Component
public class AuthenticationFilter extends OncePerRequestFilter {
    private final JWTService jwtService;
    private final UserDetailsService userDetailsService;

    // this filter goes through all the request from client
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        String jwt = null;
        final String userEmail;

        if ((request.getCookies() == null)){
            filterChain.doFilter(request,response);
            return;
        }
        for (Cookie cookie: request.getCookies()){
            if (cookie.getName().equals("accessToken")){
                jwt = cookie.getValue();
                break;
            }
        }
        if (jwt == null){
            filterChain.doFilter(request,response);
            return;
        }

//        if(authHeader == null || !authHeader.startsWith("Bearer")){
//            filterChain.doFilter(request,response);
//            return;
//        }

        //'Bearer ' letter ending at num 7
//        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);
        // if we have username and user not authenticated
        if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null){
            //get userdetails from the database
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

            if (jwtService.isTokenValid(jwt, userDetails)){
                // create authentication token
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

                // extend authentication token with details of the  request
                authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }

            filterChain.doFilter(request,response);
        }
    }
}
