package com.todo_backend.controller;


import com.todo_backend.dao.TaskRepository;
import com.todo_backend.dto.TaskDTO;
import com.todo_backend.entity.Task;
import com.todo_backend.entity.TheList;
import com.todo_backend.service.TaskService;
import com.todo_backend.service.TheListService;
import com.todo_backend.utils.TaskDTOUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private TaskService taskService;
    private TheListService listService;

    @Autowired
    public TaskController(TaskService taskService, TheListService listService) {
        this.taskService = taskService;
        this.listService = listService;
    }

    @GetMapping("/")
    private List<TaskDTO> getAllTasks(){
        return taskService.findAll()
                .stream().map(TaskDTOUtil::toDTO)
                .collect(Collectors.toList());
    }

    @PostMapping("/{listId}")
    private TaskDTO createTask(@PathVariable int listId, @RequestBody Task task){
        TheList list = listService.findById(listId);
        list.addTask(task);
        Task result = taskService.save(task);
        return TaskDTOUtil.toDTO(result);
    }

}
