from robyn import Robyn
# import stuff nedded for retuning a  html from file
from robyn import serve_html, serve_file, Request, Response

from robyn.logger import Logger

import json, orjson



app = Robyn(__file__)

logger = Logger()

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
def h(request):
    return serve_html("../../frontend/dist/index.html")

@app.get("/json")
def json_response():
    some_lise = [i for i in range(1000000)]
    return orjson.dumps(some_dummy_data_dict)

# function thawill serve static files from /frontend/dist/assets
@app.get("/assets/:file_path")
def other(request):
    file_path = request.path_params.get("file_path")
    return serve_file(f"../../frontend/dist/assets/{file_path}")


app.start(port=8000, host="0.0.0.0")