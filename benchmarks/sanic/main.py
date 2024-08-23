from sanic import Sanic
from sanic import response

import time

app = Sanic("app")


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
async def landing(request):
    with open("../../frontend/dist/index.html", "r") as html_file:
        return response.html(html_file.read())

@app.route("/json")
async def json_response(request):
    return response.json(some_dummy_data_dict)

if __name__ == "__main__":
    app.run(host="localhost", port=8000)