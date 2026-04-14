from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database.connection import get_db
from database.models import Product
from schemas.product import ProductResponse

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/", response_model=List[ProductResponse])
def get_all_products(
    db: Session = Depends(get_db)  
):
    products = db.query(Product).all()
 
    return products