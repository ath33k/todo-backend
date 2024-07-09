package com.todo_backend.service;

import com.todo_backend.entity.Task;

import java.util.List;

public interface TaskService {
    List<Task> findAll();

    Task findById(int theId);

    Task update(int theId);

    Task save(Task theTask);

    void deleteById(int theId);
}
