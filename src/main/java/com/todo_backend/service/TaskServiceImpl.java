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
import java.util.Objects;
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
    public List<Task> findAll(long userId) {
//        Sort sort = Sort.by("isCompleted").ascending();
//        return taskRepository.findAll(sort);
        return taskRepository.getAllTasks(userId);
    }

    @Override
    public List<Task> findTodayTasks(long userId) {
        return taskRepository.selectTodayTasks(userId);
    }

    @Override
    public List<Task> findUpcomingTasks(long userId) {
        return taskRepository.selectUpcomingTasks(userId);
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
    @Transactional
    public Task update(int theId, Task task) throws CustomException {
        Task result = taskRepository.findById(theId)
                .orElseThrow(()-> new CustomException("task with " + theId +
                        "does not exist", HttpStatus.NOT_FOUND));

        var name = task.getName();
        var description = task.getDescription();
        var isCompleted = task.getIsCompleted();
        var dateTime =task.getDateTime();

        if (name != null &&
                name.length() > 0 &&
                !Objects.equals(result.getName(), name)){
            result.setName(name);
        }

        if (description != null &&
                description.length() > 0 &&
                !Objects.equals(result.getDescription(), description)){
            result.setName(description);
        }
        if (result.getIsCompleted() != isCompleted){
            result.setName(description);
        }
        if (dateTime != null &&
                !Objects.equals(result.getDateTime(), dateTime)){
            result.setName(description);
        }

        return taskRepository.save(result);
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
