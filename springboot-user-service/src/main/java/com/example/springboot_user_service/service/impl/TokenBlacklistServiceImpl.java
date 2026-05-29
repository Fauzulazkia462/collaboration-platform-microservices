package com.example.springboot_user_service.service.impl;

import com.example.springboot_user_service.service.interfaces.TokenBlacklistService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class TokenBlacklistServiceImpl implements TokenBlacklistService {

    private final StringRedisTemplate redisTemplate;

    private static final String PREFIX = "blacklist:";

    @Override
    public void blacklist(String token) {
        redisTemplate.opsForValue().set(
                PREFIX + token,
                "true",
                Duration.ofHours(2)
        );
    }

    @Override
    public boolean isBlacklisted(String token) {
        return redisTemplate.hasKey(PREFIX + token);
    }
}