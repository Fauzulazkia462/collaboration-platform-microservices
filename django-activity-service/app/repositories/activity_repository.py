import json
from sqlalchemy import text
from app.db.database import engine

class ActivityRepository:

    def create(self, project_id, event_type, payload):
        with engine.begin() as conn:
            result = conn.execute(
                text("""
                    INSERT INTO activities (project_id, event_type, payload)
                    VALUES (:project_id, :event_type, CAST(:payload AS JSONB))
                    RETURNING id, project_id, event_type, payload, created_at
                """),
                {
                    "project_id": project_id,
                    "event_type": event_type,
                    "payload": json.dumps(payload)
                }
            )
            return result.fetchone()

    def find_all(self):
        with engine.begin() as conn:
            result = conn.execute(
                text("""
                    SELECT * FROM activities
                    ORDER BY created_at DESC
                """)
            )
            return result.fetchall()

    def find_by_project(self, project_id):
        with engine.begin() as conn:
            result = conn.execute(
                text("""
                    SELECT * FROM activities
                    WHERE project_id = :project_id
                    ORDER BY created_at DESC
                """),
                {"project_id": project_id}
            )
            return result.fetchall()