# Full-Stack Microservices Collaboration Platform

A production-style **microservices-based collaboration system** built as a portfolio project to demonstrate **3+ years of software engineering experience** across backend, frontend, distributed systems, and cloud-native architecture.

---

## Overview

This system simulates a real-world **team collaboration platform** where users can:

- Create and manage projects
- Assign and track tasks
- View system activity logs
- Receive simulated notifications (email, SMS, etc.)
- View analytics dashboards

It is built using a **polyglot microservices architecture**, combining multiple backend technologies, event-driven communication, and a microfrontend frontend system.

The backends are built with **SOLID principles**, making the system more scalable, maintainable, and readable.

The frontend global state is carefully managed to ensure maintainability across multiple modules and microfrontends.

---

## Tech Stack

### Frontend
- React (Host Application)
- Vue 3 (Microfrontend - Project Module)
- TypeScript
- Zustand (State Management)
- Axios

### Backend Services
- Spring Boot (Authentication Service + JWT)
- Node.js (Project & Task Service)
- Django (Activity Service)
- Laravel (Notification Service)
- .NET (Analytics Service)

### Communication & Infrastructure
- Kafka (Event Streaming / Async Communication)
- Redis (JWT Blacklist / Token Revocation)
- PostgreSQL (Primary Database)

### DevOps
- Docker
- Docker Compose

---

## System Architecture

<img src=".readme-images/system_architecture.png" alt="System Architecture Diagram" width="900"/>

---

## Highlighted Flows

### Logout Flow

Logout does not immediately invalidate JWT tokens.

Instead:
- Token is stored in Redis blacklist
- Format: `blacklist:<token>`
- All services validate tokens against Redis before accepting requests

<img src=".readme-images/logout_seq_diagram.png" alt="Logout Flow Diagram" width="900"/>

---

### Create Task Flow

- Node.js service handles task creation
- Publishes event to Kafka
- Other services consume events asynchronously

<img src=".readme-images/create_task_seq_diagram.png" alt="Create Task Flow Diagram" width="900"/>

---

## How to Run

### Prerequisites

Make sure you have installed:

- Docker
- Docker Compose

---

### Start All Services

```bash
docker compose up --build