import jwt
import os

from fastapi import Header, HTTPException

def verify_token(authorization: str = Header(None)):

    if not authorization:
        raise HTTPException(status_code=401, detail="Unauthorized")

    token = authorization.split(" ")[1]

    try:
        payload = jwt.decode(
            token,
            os.getenv("JWT_SECRET"),
            algorithms=["HS512"]
        )

        return payload

    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")