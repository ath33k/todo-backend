package com.todo_backend.dao;

import com.todo_backend.entity.TheList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TheListRepository extends JpaRepository<TheList, Integer> {
}
