package com.todo_backend.service;

import com.todo_backend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<User> findByEmail(String email);

    List<User> findAll();

    void save(User user);

    void delete(User user);
}
