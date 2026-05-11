from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database.models import Product
from database.connection import engine, Base
from routes import products, auth, likes_comments
 
Base.metadata.create_all(bind=engine)
 
app = FastAPI()
app.include_router(products.router)
app.include_router(auth.router)
app.include_router(likes_comments.router)
 
from database.connection import engine, Base
Base.metadata.create_all(bind=engine)
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
);
 
@app.get("/")
def read_root():
    return {"mesaj": "Salut! Backend-ul functioneaza perfect!"}