from fastapi import FastAPI
from app.api.routes import router
import threading
from app.consumers.kafka_consumer import listen
from app.db.init_db import init_db
from app.config.corsConfig import setup_cors

app = FastAPI()

setup_cors(app)

app.include_router(
    router,
    prefix="/api/v1"
)

# start kafka consumer in background
threading.Thread(target=listen, daemon=True).start()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.on_event("startup")
def startup():
    init_db()