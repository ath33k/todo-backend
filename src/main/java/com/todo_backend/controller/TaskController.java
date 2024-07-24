package com.todo_backend.controller;


import com.todo_backend.entity.Task;
import com.todo_backend.entity.TheList;
import com.todo_backend.entity.User;
import com.todo_backend.exception.CustomException;
import com.todo_backend.service.TaskService;
import com.todo_backend.service.TheListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Objects;

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

    @GetMapping("")
    private List<Task> getAllTasks(@RequestParam(value = "type", required = false) String type, Authentication authentication){
        if (authentication == null){
            throw new CustomException("Please logged in to get all the tasks", HttpStatus.UNAUTHORIZED);
        }
        User user = (User) authentication.getPrincipal();
        long userId = user.getId();
        if (Objects.equals(type, "today")){
            return taskService.findTodayTasks(userId);
        }else if(Objects.equals(type, "upcoming")){
            return taskService.findUpcomingTasks(userId);
        }else{
            return taskService.findAll(userId);
        }
    }
    @PostMapping("/{listId}")
    private Task createTask(@PathVariable int listId, @RequestBody Task task) throws CustomException {
        System.out.println(task.toString());
        TheList list = listService.findById(listId);
//        list.addTask(task);
        task.setList(list);

        return taskService.save(task);
    }

    @PutMapping("/{taskId}")
    public Task updateTask(@PathVariable int taskId, @RequestBody Task task) throws CustomException {
        return taskService.update(taskId, task);
    }

    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable int taskId){
        taskService.deleteById(taskId);
    }

}
