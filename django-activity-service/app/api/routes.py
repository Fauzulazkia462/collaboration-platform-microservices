from fastapi import APIRouter
from app.services.activity_service import ActivityService

router = APIRouter()
service = ActivityService()

@router.get("/activities")
def get_all():
    return [dict(row._mapping) for row in service.get_all()]

@router.get("/activities/{project_id}")
def get_by_project(project_id: str):
    return [dict(row._mapping) for row in service.get_by_project(project_id)]