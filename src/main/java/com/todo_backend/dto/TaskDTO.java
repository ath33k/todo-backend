package com.todo_backend.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.todo_backend.entity.TheList;

import java.time.LocalDateTime;

public class TaskDTO {
    private int id;
    private String name;
    private String description;
    private LocalDateTime dateTime;

    private TheList list;

    public TaskDTO() {
    }

    public TaskDTO(int id, String name, String description, LocalDateTime dateTime, TheList list) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dateTime = dateTime;
        this.list = list;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public TheList getList() {
        return list;
    }

    public void setList(TheList list) {
        this.list = list;
    }

    @Override
    public String toString() {
        return "TaskDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", dateTime=" + dateTime +
                ", list=" + list +
                '}';
    }
}
