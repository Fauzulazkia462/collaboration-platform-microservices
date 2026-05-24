package com.example.springboot_user_service.service.interfaces;

import com.example.springboot_user_service.dto.*;
import jakarta.servlet.http.HttpServletRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    void logout(HttpServletRequest request);
}
