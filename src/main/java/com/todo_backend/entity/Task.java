package com.todo_backend.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "task")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm", shape = JsonFormat.Shape.STRING)
    @Column(name = "date_time")
    private LocalDateTime dateTime;

    @Column(name = "is_completed")
    private boolean isCompleted;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JsonBackReference
    @JoinColumn(name = "list_id")
    private TheList list;

    public Task() {
    }

    public Task(String name, String description, LocalDateTime dateTime, boolean isCompleted) {
        this.name = name;
        this.description = description;
        this.dateTime = dateTime;
        this.isCompleted = isCompleted;
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

    public boolean getIsCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public TheList getList() {
        return list;
    }

    public void setList(TheList list) {
        this.list = list;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", dateTime=" + dateTime +
                ", isCompleted=" + isCompleted +
                '}';
    }
}
