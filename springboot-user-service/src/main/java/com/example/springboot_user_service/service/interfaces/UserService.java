package com.example.springboot_user_service.service.interfaces;

import com.example.springboot_user_service.dto.UserProfileResponse;
import com.example.springboot_user_service.entity.User;

public interface UserService {
    UserProfileResponse getCurrentUser(String email);

    User getByEmail(String email);
}