package com.todo_backend.dao;

import com.todo_backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Integer> {
    @Query(value = "SELECT * FROM task WHERE CAST(date_time as DATE) = CURRENT_DATE() ORDER BY date_time and is_completed asc ", nativeQuery = true)
    List<Task> selectTodayTasks();

    @Query(value = "SELECT * FROM task WHERE CAST(date_time as DATETIME ) > NOW() ORDER BY date_time and is_completed asc ", nativeQuery = true)
    List<Task> selectUpcomingTasks();
}
