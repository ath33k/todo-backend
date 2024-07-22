package com.todo_backend.service;

import com.todo_backend.dao.TheListRepository;
import com.todo_backend.dao.UserRepository;
import com.todo_backend.entity.TheList;
import com.todo_backend.entity.User;
import com.todo_backend.exception.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TheListImpl implements TheListService{

    private UserRepository userRepository;
    private TheListRepository listRepository;

    @Autowired
    public TheListImpl(UserRepository userRepository, TheListRepository listRepository) {
        this.userRepository = userRepository;
        this.listRepository = listRepository;
    }

    @Override
    public List<TheList> findAll() {
        return listRepository.findAll();
    }

    @Override
    public List<TheList> findAllByUser(User newUser) {
        return newUser.getAllLists();
    }

    @Override
    public TheList findById(int theId) throws CustomException {
        Optional<TheList> result = listRepository.findById(theId);

        TheList list = null;

        if (result.isPresent()){
            list = result.get();
        }else{
            throw new CustomException("The list you looking for hasn't found", HttpStatus.NOT_FOUND);
        }
        return list;
    }

    @Override
    public TheList update(int theId) {
        return null;
    }

    @Override
    public TheList save(TheList theList, User newUser) {
        theList.setUser(newUser);
        return listRepository.save(theList);
    }



    @Override
    public void deleteById(int theId) {
        listRepository.deleteById(theId);
    }
}
