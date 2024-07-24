package com.todo_backend.service;

import com.todo_backend.entity.TheList;
import com.todo_backend.entity.User;
import com.todo_backend.exception.CustomException;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface TheListService {
    List<TheList> findAll();

    List<TheList> findAllByUser(User newUser);

    TheList findById(int theId) throws CustomException;
    TheList update(int theId, TheList theList);

    TheList save(TheList theList, User newUser);

    void deleteById(int theId);
}
