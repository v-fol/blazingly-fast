import falcon.asgi



import json, orjson



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
class Resource:
    async def on_get(self, req, resp):
        resp.text = orjson.dumps(some_dummy_data_dict)
        resp.status = falcon.HTTP_200

app = falcon.asgi.App()

app.add_route('/json', Resource())

