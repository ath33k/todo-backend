package com.todo_backend.service;

import com.todo_backend.entity.TheList;

import java.util.List;

public interface TheListService {
    List<TheList> findAll();

    TheList findById(int theId);
    TheList update(int theId);

    TheList save(TheList theList);

    void deleteById(int theId);
}
