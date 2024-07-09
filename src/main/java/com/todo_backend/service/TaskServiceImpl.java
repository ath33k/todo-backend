package com.todo_backend.service;

import com.todo_backend.dao.TaskRepository;
import com.todo_backend.dao.TheListRepository;
import com.todo_backend.entity.Task;
import com.todo_backend.entity.TheList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService{
    private TaskRepository taskRepository;
    private TheListRepository theListRepository;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, TheListRepository theListRepository) {
        this.taskRepository = taskRepository;
        this.theListRepository = theListRepository;
    }

    @Override
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    @Override
    public Task findById(int theId) {
        Optional<Task> result = taskRepository.findById(theId);

        Task task = null;

        if (result.isPresent()){
            task = result.get();
        }else{
            throw new RuntimeException("Did not find task id - " + theId);
        }
        return task;
    }

    @Override
    public Task update(int theId) {
        return null;
    }

    @Override
    public Task save(Task theTask) {
        return taskRepository.save(theTask);
    }

    @Override
    public void deleteById(int theId) {
        taskRepository.deleteById(theId);
    }
}
