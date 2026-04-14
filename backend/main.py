from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database.models import Product
from routes import products
app = FastAPI()
app.include_router(products.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
);

@app.get("/")
def read_root():
    return {"mesaj": "Salut! Backend-ul functioneaza perfect!"}

@app.get("/test/")
def read_hello():
    return [
    { "id": 1,  "title": "Acer Nitro V 15 ANV15-52-79A6"    , "type": "Laptop"      , "price": "6000"   , "storage": "1024" , "ram": "32"      , "jack": "Yes", "battery": "0"   , "nfc": "NaN", "card_slot_max": "0"   , "mem_card_slot": "NaN"    , "power": "0"  , },
  ]