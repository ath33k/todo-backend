package com.todo_backend.service;

import com.todo_backend.dao.TaskRepository;
import com.todo_backend.dao.TheListRepository;
import com.todo_backend.entity.TheList;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TheListImpl implements TheListService{

    private TheListRepository listRepository;

    public TheListImpl(TheListRepository listRepository) {
        this.listRepository = listRepository;
    }

    @Override
    public List<TheList> findAll() {
        return listRepository.findAll();
    }

    @Override
    public TheList findById(int theId) {
        Optional<TheList> result = listRepository.findById(theId);

        TheList list = null;


        if (result.isPresent()){
            list = result.get();
        }else{
            throw new RuntimeException("Did bot find list id - " + theId);
        }
        System.out.println(list);
        return list;
    }

    @Override
    public TheList update(int theId) {
        return null;
    }

    @Override
    public TheList save(TheList theList) {
        return listRepository.save(theList);
    }

    @Override
    public void deleteById(int theId) {
        listRepository.deleteById(theId);
    }
}
