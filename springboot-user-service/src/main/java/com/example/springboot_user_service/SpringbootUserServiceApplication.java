package com.example.springboot_user_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class SpringbootUserServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(SpringbootUserServiceApplication.class, args);
	}
}
