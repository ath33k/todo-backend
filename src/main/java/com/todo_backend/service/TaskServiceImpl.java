package com.todo_backend.service;

import com.todo_backend.dao.TaskRepository;
import com.todo_backend.dao.TheListRepository;
import com.todo_backend.entity.Task;
import com.todo_backend.entity.TheList;
import com.todo_backend.exception.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
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
        Sort sort = Sort.by("isCompleted").ascending();
        return taskRepository.findAll(sort);
    }

    @Override
    public List<Task> findTodayTasks() {
        return taskRepository.selectTodayTasks();
    }

    @Override
    public List<Task> findUpcomingTasks() {
        return taskRepository.selectUpcomingTasks();
    }

    @Override
    public Task findById(int theId) throws CustomException {
        Optional<Task> result = taskRepository.findById(theId);

        Task task = null;

        if (result.isPresent()){
            task = result.get();
        }else{
            throw new CustomException("The task you looking for hasn't found", HttpStatus.NOT_FOUND);
        }
        return task;
    }

    @Override
    public Task update(int theId, Task task) throws CustomException {
        Optional<Task> result = taskRepository.findById(theId);
        Task theTask = null;

        if (result.isPresent()){
            theTask = result.get();
        }else{
            throw new CustomException("The task you looking for hasn't found", HttpStatus.NOT_FOUND);
        }
        theTask.setCompleted(task.getIsCompleted());

        return taskRepository.save(theTask);
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
