package com.example.springboot_user_service.service.interfaces;

public interface TokenBlacklistService {
    void blacklist(String token);
    boolean isBlacklisted(String token);
}