from flask import Blueprint, request, jsonify
from app import db
from app.models import Item

bp = Blueprint('main', __name__)

@bp.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    return jsonify([item.to_dict() for item in items])

@bp.route('/items/<int:id>', methods=['GET'])
def get_item(id):
    item = Item.query.get_or_404(id)
    return jsonify(item.to_dict())

@bp.route('/items', methods=['POST'])
def create_item():
    data = request.get_json()
    if not data or 'name' not in data:
        return jsonify({'error': 'Name is required'}), 400
    
    item = Item(
        name=data['name'],
        description=data.get('description', '')
    )
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201

@bp.route('/items/<int:id>', methods=['PUT'])
def update_item(id):
    item = Item.query.get_or_404(id)
    data = request.get_json()
    
    if 'name' in data:
        item.name = data['name']
    if 'description' in data:
        item.description = data['description']
    
    db.session.commit()
    return jsonify(item.to_dict())

@bp.route('/items/<int:id>', methods=['DELETE'])
def delete_item(id):
    item = Item.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'Item deleted'}), 200