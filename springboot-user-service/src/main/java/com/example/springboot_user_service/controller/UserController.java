package com.example.springboot_user_service.controller;

import com.example.springboot_user_service.dto.UserProfileResponse;
import com.example.springboot_user_service.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public UserProfileResponse me(
            Authentication authentication
    ) {

        return userService.getCurrentUser(
                authentication.getName()
        );
    }
}