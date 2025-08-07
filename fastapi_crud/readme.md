1. .env File - Environment Variables
Kyu?: Database connection string aur secret values store karne ke liye

Kaise?: python-dotenv package isse automatically load karta hai

Example:

ini
DATABASE_URL=postgresql://user:password@localhost/dbname
Matlab:

Database ka address, username, password sab ek jagah

Code mein directly nahi likha, secure way

2. database.py - Database Connection
Kyu?: Database se baat karne ka setup

Kaise?: SQLAlchemy engine aur session banata hai

Key Lines:

python
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Matlab:

engine - Database se connect karne ka bridge

SessionLocal - Har request ke liye naya database session

3. models.py - Database Tables Ka Structure
Kyu?: Database mein tables kaise dikhenge define karta hai

Kaise?: SQLAlchemy classes use hoti hain

Example:

python
class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
Matlab:

items naam ka table banega

id primary key hoga (auto increment)

index=True search fast karne ke liye

4. schemas.py - Data Validation
Kyu?: Request/Response data ka shape define karta hai

Kaise?: Pydantic models use hote hain

Example:

python
class ItemCreate(BaseModel):
    name: str
    description: str | None = None
Matlab:

Frontend se aane wale data ka format

name required field hai

description optional hai

5. crud.py - Database Operations
Kyu?: Actual database queries yahan hote hain

Kaise?: SQLAlchemy sessions use karke

Key Functions:

python
def create_item(db: Session, item: ItemCreate):
    db_item = Item(**item.dict())
    db.add(db_item)
    db.commit()
    return db_item
Matlab:

db.add() - Database mein temporary add kiya

db.commit() - Permanent save kiya

db.refresh() - Latest data fetch kiya

6. routes.py - API Endpoints
Kyu?: URL routes handle karta hai

Kaise?: FastAPI router aur dependencies

Example:

python
@router.post("/items/", response_model=Item)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    return crud.create_item(db=db, item=item)
Matlab:

@router.post - POST request handle karega

Depends(get_db) - Har request ke liye naya DB session

response_model - Output format validate karega

7. main.py - App Entry Point
Kyu?: FastAPI app start karne ke liye

Kaise?: Metadata create karke aur routes include karke

Key Lines:

python
Base.metadata.create_all(bind=engine)
app = FastAPI()
app.include_router(router, prefix="/api/v1")
Matlab:

create_all() - Database tables banayega

FastAPI() - App ka core object

include_router() - Saare routes register karega

Testing Flow
POST Request (Create):

bash
curl -X POST "http://localhost:8000/api/v1/items/" -d '{"name":"Phone"}'
Database mein naya entry banega

GET Request (Read):

bash
curl "http://localhost:8000/api/v1/items/1"
ID 1 wala item milega

PUT Request (Update):

bash
curl -X PUT "http://localhost:8000/api/v1/items/1" -d '{"name":"New Phone"}'
Existing item update hoga

DELETE Request (Delete):

bash
curl -X DELETE "http://localhost:8000/api/v1/items/1"
Item delete ho jayega

Special FastAPI Features
Automatic Docs:

http://localhost:8000/docs - Interactive API testing

http://localhost:8000/redoc - Clean documentation

Data Validation:

Agar galat data bheja to automatic error dega

Fast Performance:

Flask se faster because of ASGI support

Async Support:

async/await use kar sakte hain for heavy operations

Complete Flow
Request aata hai (POST /items)

Pydantic validate karta hai data

CRUD function database mein entry banata hai

Response wapas jata hai with proper format

Automatic docs mein sab dikh jata hai