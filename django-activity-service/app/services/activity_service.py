from app.repositories.activity_repository import ActivityRepository
import logging

class ActivityService:

    def __init__(self):
        self.repo = ActivityRepository()

    def create_activity(self, project_id, event_type, payload):
        logging.info({
            "message": "Creating activity",
            "project_id": project_id,
            "event_type": event_type,
            "payload": payload
        })

        return self.repo.create(project_id, event_type, payload)

    def get_all(self):
        return self.repo.find_all()

    def get_by_project(self, project_id):
        return self.repo.find_by_project(project_id)