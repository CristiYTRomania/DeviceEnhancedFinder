from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .connection import Base

class Product(Base):

    __tablename__ = "products"
 
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    type = Column(String, nullable=False)
    price = Column(String, nullable=False)
    storage = Column(String, nullable=False)
    ram = Column(String, nullable=False)
    jack = Column(String, nullable=False)
    battery = Column(String, nullable=False)
    nfc = Column(String, nullable=False)
    card_slot_max = Column(String, nullable=False)
    mem_card_slot = Column(String, nullable=False)
    power = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)