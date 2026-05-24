import json
import os
import time

from confluent_kafka import Consumer
from app.services.activity_service import ActivityService

service = ActivityService()

consumer = Consumer({
    'bootstrap.servers': os.getenv("KAFKA_BROKER"),
    'group.id': 'activity-service',
    'auto.offset.reset': 'earliest'
})

# wait until kafka ready
while True:
    try:
        consumer.list_topics(timeout=5)
        print("Kafka connected")
        break
    except Exception as e:
        print("Waiting for Kafka...", e)
        time.sleep(5)

consumer.subscribe([
    'project.created',
    'task.created'
])

def listen():
    while True:

        msg = consumer.poll(1.0)

        if msg is None:
            continue

        if msg.error():
            print(msg.error())
            continue

        event = json.loads(msg.value().decode('utf-8'))

        project_id = (
            event.get("projectId")
            or event.get("project_id")
            or event.get("id")
        )

        service.create_activity(
            project_id=str(project_id),
            event_type=msg.topic().upper(),
            payload=event
        )

        print("Activity stored:", event)