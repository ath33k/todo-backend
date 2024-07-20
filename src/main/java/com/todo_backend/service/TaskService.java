package com.todo_backend.service;

import com.todo_backend.entity.Task;
import com.todo_backend.exception.CustomException;

import java.util.List;

public interface TaskService {
    List<Task> findAll();
    List<Task> findTodayTasks();
    List<Task> findUpcomingTasks();



    Task findById(int theId) throws CustomException;

    Task update(int theId, Task task) throws CustomException;

    Task save(Task theTask);

    void deleteById(int theId);
}
