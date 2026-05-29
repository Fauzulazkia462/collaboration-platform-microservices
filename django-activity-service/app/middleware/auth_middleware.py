import jwt
import os
import redis

from fastapi import Header, HTTPException

redis_client = redis.Redis(
    host=os.getenv("REDIS_HOST"),
    port=os.getenv("REDIS_PORT"),
    decode_responses=True
)

def verify_token(authorization: str = Header(None)):

    if not authorization:
        raise HTTPException(status_code=401, detail="Unauthorized")

    token = authorization.split(" ")[1]

    # CHECK BLACKLIST
    if redis_client.exists(f"blacklist:{token}"):
        raise HTTPException(status_code=401, detail="Token is blacklisted")

    try:
        payload = jwt.decode(
            token,
            os.getenv("JWT_SECRET"),
            algorithms=["HS512"]
        )

        return payload

    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")