package com.todo_backend.auth;

import com.todo_backend.entity.User;
import com.todo_backend.exception.CustomException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.http.HttpResponse;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request,
            HttpServletResponse response
    ){
        AuthenticationResponse registerResponse = authenticationService.register(request);
        ResponseCookie cookie = ResponseCookie.from("accessToken",registerResponse.getToken())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(60 * 60 * 24 * 30)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok(registerResponse);
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request,
            HttpServletResponse response
    ){
        AuthenticationResponse loginResponse = authenticationService.authenticate(request);
        ResponseCookie cookie = ResponseCookie.from("accessToken",loginResponse.getToken())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(60 * 60 * 24 * 30)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        if (authentication.isAuthenticated()){
            //clear security context
            SecurityContextHolder.clearContext();
            // clear cookies
            ResponseCookie cookie = ResponseCookie.from("accessToken","")
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(0)
                    .build();
            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        }
        response.sendRedirect("/authenticate");
    }


    @GetMapping("/currentUser")
    public AuthUserResponse checkLoggedInUser(Authentication authentication){
        if (authentication== null){
            throw new CustomException("User not logged in", HttpStatus.UNAUTHORIZED);
        }
        User user = (User) authentication.getPrincipal();
        return AuthUserResponse.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getUsername())
                .build();
    }
}
