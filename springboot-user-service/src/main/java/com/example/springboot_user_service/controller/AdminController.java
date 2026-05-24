package com.example.springboot_user_service.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    @GetMapping("/dashboard")
    public String dashboard() {
        return "ADMIN ACCESS";
    }
}