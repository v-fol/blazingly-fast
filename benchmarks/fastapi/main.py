import uvicorn


from fastapi import FastAPI
from fastapi.responses import HTMLResponse, ORJSONResponse
from fastapi.staticfiles import StaticFiles

from pydantic import BaseModel

import time

import json, orjson

# make orjson the default json encoder
app = FastAPI(default_response_class=ORJSONResponse)



class DummyData(BaseModel):
    name: str
    age: int
    city: str
    has_children: bool
    titles: list
    salary: float
    is_married: bool
    is_single: bool
    is_divorced: bool
    is_widowed: bool
    is_engaged: bool
    siblings: str | None
    parents: str | None
    spouse: str | None



some_dummy_data_dict = {
    "name": "John Doe",
    "age": 30,
    "city": "New York",
    "has_children": False,
    "titles": ["engineer", "developer", "programmer", "coder"],
    "salary": 100000.0,
    "is_married": True,
    "is_single": False,
    "is_divorced": False,
    "is_widowed": False,
    "is_engaged": False,
    "siblings": None,
    "parents": None,
    "spouse": None,   
}


@app.get("/")
async def landing():
    with open("../../frontend/dist/index.html", "r") as html_file:
        return HTMLResponse(content=html_file.read(), status_code=200)
    

@app.get("/json", response_model=DummyData)
async def json_response() -> DummyData:
    # sleep for 200ms to simulate a slow response
    some_lise = [i for i in range(1000000)]
    return some_dummy_data_dict


# add stattic files to /asserts/ in /frontend/dist/assets diresctory
app.mount("/assets", StaticFiles(directory="../../frontend/dist/assets"), name="assets")

# Run the FastAPI server
if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
