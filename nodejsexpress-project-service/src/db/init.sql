CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    owner_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    project_id INT,
    title VARCHAR(255),
    status VARCHAR(50),
    assigned_to VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);