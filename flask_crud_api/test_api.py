import requests

BASE_URL = "http://localhost:5000/items"

# Test GET all items
response = requests.get(BASE_URL)
print("GET all items:", response.json())

# Test POST new item
new_item = {
    "name": "Python Test Item",
    "description": "Created from Python script"
}
response = requests.post(BASE_URL, json=new_item)
print("POST new item:", response.json())

# Test GET specific item
item_id = response.json()['id']
response = requests.get(f"{BASE_URL}/{item_id}")
print(f"GET item {item_id}:", response.json())

# Test PUT update
update_data = {"name": "Updated Name"}
response = requests.put(f"{BASE_URL}/{item_id}", json=update_data)
print(f"PUT update item {item_id}:", response.json())

# Test DELETE
response = requests.delete(f"{BASE_URL}/{item_id}")
print(f"DELETE item {item_id}:", response.json())