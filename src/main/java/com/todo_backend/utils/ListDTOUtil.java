package com.todo_backend.utils;

import com.todo_backend.dto.ListDTO;
import com.todo_backend.dto.TaskDTO;
import com.todo_backend.entity.Task;
import com.todo_backend.entity.TheList;
import org.springframework.beans.BeanUtils;

public class ListDTOUtil {
    public static ListDTO toDTO(TheList list){
        ListDTO dto = new ListDTO();
        BeanUtils.copyProperties(list,dto);
        return dto;
    }
    public static TheList toTask(ListDTO dto){
        TheList list = new TheList();
        BeanUtils.copyProperties(dto,list);
        return list;
    }
}
