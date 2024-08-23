import flask
from waitress import serve
import json, orjson

app = flask.Flask(__name__)


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

@app.route("/")
def landing():
    with open("../../frontend/dist/index.html", "r") as html_file:
        return flask.Response(response=html_file.read(), status=200, content_type="text/html")
    
@app.route("/json")
def json_response():
    return orjson.dumps(some_dummy_data_dict)

@app.route("/assets/<path:file_path>") 
def other(file_path):
    with open(f"../../frontend/dist/assets/{file_path}", "r") as file:
        return flask.Response(response=file.read(), status=200, content_type="text/html")

if __name__ == "__main__":
    serve(app, host="localhost", port=8000, threads=16)