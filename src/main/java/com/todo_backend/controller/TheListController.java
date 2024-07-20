package com.todo_backend.controller;
import com.todo_backend.entity.TheList;
import com.todo_backend.exception.CustomException;
import com.todo_backend.service.TheListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/lists")
public class TheListController {
    private TheListService listService;

    @Autowired
    public TheListController(TheListService listService) {
        this.listService = listService;
    }

    @GetMapping("")
    public List<TheList> getAllList(){
        return listService.findAll();

    }

    @PostMapping("")
    public TheList createList(@RequestBody TheList theList){
        return listService.save(theList);

    }

    @GetMapping("/{listId}")
    public TheList getList(@PathVariable int listId) throws CustomException {
        return listService.findById(listId);
    }

    @DeleteMapping("/{listId}")
    public void deleteList(@PathVariable int listId){
        listService.deleteById(listId);
    }


}
