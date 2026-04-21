from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database.connection import get_db
from database.models import Product
from schemas.product import ProductResponse, ProductCreate

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/", response_model=List[ProductResponse])
def get_all_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    return products

@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(product: ProductCreate,db: Session = Depends(get_db)):
    db_product = Product(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product
 
@router.post("/bulk", response_model=List[ProductResponse], status_code=status.HTTP_201_CREATED)
def create_products_bulk(products: List[ProductCreate],db: Session = Depends(get_db)):
    db_products = [Product(**product.model_dump()) for product in products]
    db.add_all(db_products)
    db.commit()
    for db_product in db_products:
        db.refresh(db_product)
    return db_products