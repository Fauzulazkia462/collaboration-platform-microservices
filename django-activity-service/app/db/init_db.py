from app.db.database import engine
from sqlalchemy import text

def init_db():
    with engine.connect() as conn:

        conn.execute(text("""
        CREATE TABLE IF NOT EXISTS activities (
            id SERIAL PRIMARY KEY,
            project_id VARCHAR(100) NOT NULL,
            event_type VARCHAR(50) NOT NULL,
            payload JSONB,
            created_at TIMESTAMP DEFAULT NOW()
        )
        """))

        conn.commit()