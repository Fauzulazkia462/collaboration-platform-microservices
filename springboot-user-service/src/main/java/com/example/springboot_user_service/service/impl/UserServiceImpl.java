package com.example.springboot_user_service.service.impl;

import com.example.springboot_user_service.dto.UserProfileResponse;
import com.example.springboot_user_service.entity.User;
import com.example.springboot_user_service.repository.UserRepository;
import com.example.springboot_user_service.service.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.Cacheable;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserProfileResponse getCurrentUser(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return UserProfileResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .build();
    }

    @Override
    @Cacheable(value = "users", key = "#email")
    public User getByEmail(String email) {

        System.out.println("FETCHING FROM DATABASE");

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }
}