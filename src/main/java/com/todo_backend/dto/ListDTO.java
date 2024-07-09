package com.todo_backend.dto;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.todo_backend.entity.Task;

import java.util.List;

public class ListDTO {
    private int id;
    private String name;
    private List<Task> tasks;

    public ListDTO() {
    }

    public ListDTO(int id, String name, List<Task> tasks) {
        this.id = id;
        this.name = name;
        this.tasks = tasks;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    @Override
    public String toString() {
        return "ListDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", tasks=" + tasks +
                '}';
    }
}
