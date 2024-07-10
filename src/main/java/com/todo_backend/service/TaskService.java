package com.todo_backend.service;

import com.todo_backend.entity.Task;

import java.util.List;

public interface TaskService {
    List<Task> findAll();
    List<Task> findTodayTasks();
    List<Task> findUpcomingTasks();



    Task findById(int theId);

    Task update(int theId, Task task);

    Task save(Task theTask);

    void deleteById(int theId);
}
