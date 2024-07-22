package com.todo_backend.controller;

import com.todo_backend.dao.UserRepository;
import com.todo_backend.entity.User;
import com.todo_backend.exception.CustomException;
import com.todo_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/user")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping
    public List<User> getAllUsers(){
        return userService.findAll();
    }

    @DeleteMapping("/delete")
    public void deleteUser(Authentication authentication){
        if (authentication == null){
            throw new CustomException("Please login into perform this request", HttpStatus.UNAUTHORIZED);
        }
        User user = (User) authentication.getPrincipal();
        Optional<User> deleteUser = userService.findByEmail(user.getEmail());
        if (deleteUser.isEmpty()){
            throw new CustomException("Couldn't delete user", HttpStatus.NOT_FOUND);
        }
        userService.delete(deleteUser.get());
    }
}
