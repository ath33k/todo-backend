package com.todo_backend.service;

import com.todo_backend.entity.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findByEmail(String email);

    void save(User user);
}
