package com.todo_backend.dao;

import com.todo_backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Integer> {
    @Query(value =
            "SELECT * FROM task " +
            "WHERE CAST(date_time AS DATE) = CURRENT_DATE() " +
            "AND list_id = ANY (" +
            "SELECT l.id FROM user u " +
            "INNER JOIN list l ON u.id = l.user_id " +
            "WHERE :userId = l.user_id)" +
            "ORDER BY date_time and is_completed asc", nativeQuery = true)
    List<Task> selectTodayTasks(@Param("userId") long userId);

    @Query(value =
            "SELECT * FROM task " +
            "WHERE CAST(date_time AS DATETIME ) > NOW()" +
            "and list_id = ANY (" +
            "SELECT l.id FROM user u " +
            "INNER JOIN list l ON u.id = l.user_id " +
            "WHERE :userId = l.user_id)" +
            "ORDER BY date_time and is_completed asc", nativeQuery = true)
    List<Task> selectUpcomingTasks(@Param("userId") long userId);

    @Query(value =
            "SELECT * FROM task " +
            "WHERE list_id = ANY (" +
            "SELECT l.id FROM user u " +
            "INNER JOIN list l ON u.id = l.user_id " +
            "WHERE :userId = l.user_id)" +
            "ORDER BY date_time and is_completed asc", nativeQuery = true)
    List<Task> getAllTasks(@Param("userId") long userId);
}
