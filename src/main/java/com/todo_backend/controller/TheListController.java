package com.todo_backend.controller;
import com.todo_backend.entity.TheList;
import com.todo_backend.entity.User;
import com.todo_backend.exception.CustomException;
import com.todo_backend.service.TheListService;
import com.todo_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lists")
public class TheListController {
    private TheListService listService;
    private UserService userService;

    @Autowired
    public TheListController(TheListService listService, UserService userService) {
        this.listService = listService;
        this.userService = userService;
    }


    @GetMapping
    public List<TheList> getAllList(Authentication authentication){
        if (authentication == null){
            throw new CustomException("User not logged in. please login to get the lists", HttpStatus.UNAUTHORIZED);
        }
        User currentUser = (User) authentication.getPrincipal();
        Optional<User> user = userService.findByEmail(currentUser.getEmail());
        if (user.isEmpty()){
            throw new CustomException("User not logged in. please login to create a list", HttpStatus.UNAUTHORIZED);
        }
        User newUser = user.get();
        return listService.findAllByUser(newUser);

    }

    @PostMapping
    public TheList createList(@RequestBody TheList theList, Authentication authentication){
        if (authentication == null){
            throw new CustomException("User not logged in. please login to create a list", HttpStatus.UNAUTHORIZED);
        }
        User currentUser = (User) authentication.getPrincipal();
        Optional<User> user = userService.findByEmail(currentUser.getEmail());
        if (user.isEmpty()){
            throw new CustomException("User not logged in. please login to create a list", HttpStatus.UNAUTHORIZED);
        }
        User newUser = user.get();

        return listService.save(theList, newUser);
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
