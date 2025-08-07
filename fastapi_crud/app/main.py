from fastapi import FastAPI
from .routes import router
from .database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI CRUD API"}