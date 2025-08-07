1. requirements.txt – Dependencies Ki List
Kyu?: Ye file bataati hai ki project chalane ke liye konsi Python libraries chahiye.

Kaise?: pip install se saari libraries install hoti hain.

Example:

text
Flask==2.0.1
Flask-SQLAlchemy==2.5.1
Matlab, Flask aur SQLAlchemy ki specific versions install karni hain.

2. .flaskenv – Environment Variables (Settings)
Kyu?: Flask ko batata hai ki app kaise run karna hai (development/production).

Kaise?: Automatically load hota hai jab flask run karte ho.

Example:

text
FLASK_APP=run.py
FLASK_ENV=development
Matlab:

FLASK_APP=run.py → Entry point file (run.py) se app start hogi.

FLASK_ENV=development → Debug mode ON, errors detail mein dikhenge.

3. config.py – Database & Secret Settings
Kyu?: App ka configuration (database URL, secret key) store karta hai.

Kaise?: .env file se settings load karta hai (secure way).

Key Lines:

python
SQLALCHEMY_DATABASE_URI = 'sqlite:///app.db'
Matlab:

SQLite database (app.db file) use hogi.

SECRET_KEY sessions aur security ke liye chahiye.

4. __init__.py – App Ka Setup
Kyu?: Flask app create karta hai aur sab kuch connect karta hai.

Kaise?: create_app() function sab kuch initialize karta hai.

Key Logic:

python
db = SQLAlchemy()  # Database setup
migrate = Migrate()  # Database migrations (tables update karne ke liye)

def create_app():
    app = Flask(__name__)  # Flask app banaya
    app.config.from_object(Config)  # Settings load ki
    db.init_app(app)  # Database ko app se connect kiya
    migrate.init_app(app, db)  # Migrations enable ki
    app.register_blueprint(main_bp)  # Routes ko register kiya
    return app
Matlab:

db → Database handle.

migrate → Database tables ko modify karne ka system.

register_blueprint → Routes (URLs) ko app se link kiya.

5. models.py – Database Ka Structure
Kyu?: Database mein table ka structure define karta hai (columns, data types).

Kaise?: SQLAlchemy classes use hoti hain.

Key Logic:

python
class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # Auto-increment ID
    name = db.Column(db.String(100), nullable=False)  # Required field
    description = db.Column(db.String(200))  # Optional field
Matlab:

Item ek table hoga SQLite mein.

id → Unique number (auto-generate hoga).

name → Required field (100 characters max).

description → Optional field (200 characters max).

6. routes.py – API Endpoints (URLs)
Kyu?: User requests ka response deta hai (GET, POST, PUT, DELETE).

Kaise?: Decorators (@bp.route) URLs ko functions se link karte hain.

Key Logic:

GET All Items:

python
@bp.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()  # Database se saare items nikala
    return jsonify([item.to_dict() for item in items])  # JSON mein bheja
Matlab:

Item.query.all() → Database se saari entries fetch ki.

jsonify() → Python dictionary ko JSON format mein convert kiya.

POST New Item:

python
@bp.route('/items', methods=['POST'])
def create_item():
    data = request.get_json()  # JSON data liya
    item = Item(name=data['name'], description=data.get('description', ''))
    db.session.add(item)  # Database mein add kiya
    db.session.commit()  # Save kiya
    return jsonify(item.to_dict()), 201  # Success status code (201)
Matlab:

request.get_json() → Frontend se JSON data liya.

db.session.add() → Database mein temporary store kiya.

db.session.commit() → Permanent save kiya.

DELETE Item:

python
@bp.route('/items/<int:id>', methods=['DELETE'])
def delete_item(id):
    item = Item.query.get_or_404(id)  # Agar item nahi mila, 404 error
    db.session.delete(item)  # Database se delete kiya
    db.session.commit()  # Save kiya
    return jsonify({'message': 'Item deleted'}), 200
Matlab:

get_or_404() → Agar item nahi mila, error dega.

db.session.delete() → Database se entry hata di.

7. run.py – App Start Karne Ka Entry Point
Kyu?: Flask ko batata hai ki app kaise run karna hai.

Kaise?: flask run isko use karega.

Code:

python
from app import create_app
app = create_app()
if __name__ == '__main__':
    app.run()  # Start the server
Matlab:

create_app() → App setup kiya.

app.run() → Server start kiya (http://localhost:5000).

Testing Kaise Kare?
POST Request (New Item Banaye):

bash
curl -X POST -H "Content-Type: application/json" -d "{\"name\":\"Laptop\", \"description\":\"Dell Inspiron\"}" http://localhost:5000/items
-X POST → POST request bheja.

-H "Content-Type: application/json" → JSON data bhej rahe hain.

-d "..." → Data (name & description).

GET Request (Items Dekhe):

bash
curl http://localhost:5000/items
Database mein jo items hain, woh JSON format mein milega.

DELETE Request (Item Hatao):

bash
curl -X DELETE http://localhost:5000/items/1
ID 1 wala item delete ho jayega.

Final Flow (Step-by-Step)
Setup:

python -m venv venv → Virtual environment banaya.

.\venv\Scripts\activate → Virtual environment ON kiya.

pip install -r requirements.txt → Dependencies install ki.

Database Setup:

flask db init → Migrations folder banaya.

flask db migrate -m "Initial migration" → Database changes track kiye.

flask db upgrade → Database mein tables banaye.

Run App:

flask run → Server start kiya (http://localhost:5000).

Test API:

POST → New item banaya.

GET → Items check kiye.

PUT → Item update kiya.

DELETE → Item hata diya.

Sabse Important Cheez (Summary)
Flask → Server chalane ka framework.

SQLAlchemy → Database se baat karne ka system.

CRUD → Create (POST), Read (GET), Update (PUT), Delete (DELETE).

Routes → URLs ke through operations control hote hain.

Migrations → Database tables modify karne ka tareeka.