package com.example.springboot_user_service.dto;

import com.example.springboot_user_service.entity.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserProfileResponse {

    private String id;

    private String email;

    private String fullName;

    private Role role;
}