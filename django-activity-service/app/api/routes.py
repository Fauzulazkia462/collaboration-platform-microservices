from fastapi import APIRouter, Depends

from app.services.activity_service import ActivityService
from app.middleware.auth_middleware import verify_token

router = APIRouter()

service = ActivityService()

@router.get("/activities")
def get_all(user = Depends(verify_token)):
    return [
        dict(row._mapping)
        for row in service.get_all()
    ]

@router.get("/activities/project/{project_id}")
def get_by_project(
    project_id: str,
    user = Depends(verify_token)
):
    return [
        dict(row._mapping)
        for row in service.get_by_project(project_id)
    ]