from pydantic import BaseModel
from datetime import datetime

class ProductBase(BaseModel):
    title: str
    type: str
    price: str
    storage: str
    ram: str
    jack: str
    battery: str
    nfc: str
    card_slot_max: str
    mem_card_slot: str
    power: str

class ProductResponse(ProductBase):
    id: int
    created_at: datetime
 
    class Config:
        from_attributes = True