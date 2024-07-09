package com.todo_backend.controller;

import com.todo_backend.dao.TheListRepository;
import com.todo_backend.dto.ListDTO;
import com.todo_backend.entity.TheList;
import com.todo_backend.service.TheListService;
import com.todo_backend.utils.ListDTOUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/lists")
public class TheListController {
    private TheListService listService;

    @Autowired
    public TheListController(TheListService listService) {
        this.listService = listService;
    }

    @GetMapping("/")
    public List<ListDTO> getAllList(){
        return listService.findAll()
                .stream().map(ListDTOUtil::toDTO)
                .collect(Collectors.toList());
    }

    @PostMapping("/")
    public ListDTO createList(@RequestBody TheList theList){
        TheList list = listService.save(theList);
        return ListDTOUtil.toDTO(list);
    }
}
