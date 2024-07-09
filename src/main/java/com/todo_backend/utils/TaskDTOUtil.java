package com.todo_backend.utils;

import com.todo_backend.dto.TaskDTO;
import com.todo_backend.entity.Task;
import org.springframework.beans.BeanUtils;

public class TaskDTOUtil {
    public static TaskDTO toDTO(Task task){
        TaskDTO dto = new TaskDTO();
        BeanUtils.copyProperties(task,dto);
        return dto;
    }
    public static Task toTask(TaskDTO dto){
        Task task = new Task();
        BeanUtils.copyProperties(dto,task);
        return task;
    }
}
