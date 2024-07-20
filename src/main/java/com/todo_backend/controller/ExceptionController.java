package com.todo_backend.controller;

import com.todo_backend.exception.CustomException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class ExceptionController {

    @ExceptionHandler(value = CustomException.class)
    public ProblemDetail handleError(CustomException ex){
        ProblemDetail pd = ProblemDetail.forStatus(ex.getHttpStatus());
        pd.setDetail(ex.getMessage());
        pd.setProperty("timestamp", LocalDateTime.now());
        pd.setTitle(ex.getHttpStatus().getReasonPhrase());
        return pd;
    }
}
