from typing import Any, Dict, Union
from fastapi import FastAPI, HTTPException
import json

app = FastAPI()


def write_json(data, file="data.json"):
    with open(file, "w", encoding="utf-8") as f:
        json.dump(data, f)


def read_json(file="data.json"):
    with open(file, "r", encoding="utf-8") as f:
        return json.load(f)


@app.get("/")
async def root():
    return {"message": "Sample Rest API"}


@app.post("/user/add", status_code=201)
async def add_user(user_data: Union[Dict, Any]):
    if user_data:
        data = read_json()
        data.append(user_data)
        write_json(data)
        return {"status": "success", "object": user_data, "id": len(data) - 1}
    raise HTTPException(status_code=412, detail="Missing user data")


@app.put("/user/update/{position}")
async def update_user(position: int, user_data: Union[Dict, Any]):
    if user_data:
        data = read_json()
        if position >= len(data):
            raise HTTPException(status_code=416, detail="Out of range")
        data[position] = user_data
        write_json(data)
        return {"status": "success", "object": user_data}
    raise HTTPException(status_code=412, detail="Missing user data")


@app.delete("/user/delete/{position}")
async def delete_user(position: int):
    if position>=0:
        data = read_json()
        if position >= len(data):
            raise HTTPException(status_code=416, detail="Out of range")
        data.remove(data[position])
        len(data)
        write_json(data)
        return {"status": "success"}
    raise HTTPException(status_code=412, detail="Missing user data")
