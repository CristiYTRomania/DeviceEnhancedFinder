import { useState, useEffect } from 'react'
import '../App.css'
import MyCard from './MyCard.jsx'
import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter.jsx'
import StorageLimits from './StorageLimits.jsx'
import RamLimits from './RamLimits.jsx'
import BatteryLimits from './BatteryLimits.jsx'
import PriceLimits from './PriceLimits.jsx'
import CardSlotMaxStorageLimits from './CardSlotMaxStorageLimits.jsx'
import PowerLimits from './PowerLimits.jsx'
import SDCardFilter from './SDCardFilter.jsx'
import NFC_Filter from './NFC_Filter.jsx';
import HeadphoneJackFilter from './HeadphoneJackFilter.jsx';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000';
export async function getAllProducts() {
  try {
    const response = await fetch(`${API_URL}/products/`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

function Home() {
  const [textCautat, setTextCautat] = useState("");
  const [tipCautat, setTipCautat] = useState("All");
  const [memorie_interna_minima, setmemorie_interna_minima] = useState(0);
  const [memorie_interna_maxima, setmemorie_interna_maxima] = useState(Infinity);
  const [memorie_ram_minima, setmemorie_ram_minima] = useState(0);
  const [memorie_ram_maxima, setmemorie_ram_maxima] = useState(Infinity);
  const [baterie_minima, setbaterie_minima] = useState(0);
  const [baterie_maxima, setbaterie_maxima] = useState(Infinity);
  const [pret_minim, setpret_minim] = useState(0);
  const [pret_maxim, setpret_maxim] = useState(Infinity);
  const [CardSlotMaxStorage_minim, setCardSlotMaxStorage_minim] = useState(0);
  const [CardSlotMaxStorage_maxim, setCardSlotMaxStorage_maxim] = useState(Infinity);
  const [Power_minim, setPower_minim] = useState(0);
  const [Power_maxim, setPower_maxim] = useState(Infinity);
  const [SDCardFilterSelect, setSDCardFilterSelect] = useState("All");
  const [NFC_FilterSelect, setNFC_FilterSelect] = useState("All");
  const [HeadphoneJackFilterSelect, setHeadphoneJackFilterSelect] = useState("All");

  const [produse, setProduse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const products = await getAllProducts();
        setProduse(products);
        setError(null);
      } catch (err) {
        setError('The products cannot load.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
 
    fetchProducts();
  }, []); 

  const produseFiltrate = produse.filter((p) => {
      const nume_cautate = p.title.toLowerCase().includes(textCautat.toLowerCase())
      const tip_filtrat  = tipCautat === "All" || p.type.toLowerCase() === tipCautat.toLowerCase()
      const minim = memorie_interna_minima || 0;
      const maxim = memorie_interna_maxima || Infinity;
      const memorie_interna = Number(p.storage) >= minim && Number(p.storage) <= maxim
      const minim_ram = memorie_ram_minima || 0;
      const maxim_ram = memorie_ram_maxima || Infinity;
      const memorie_ram = Number(p.ram) >= minim_ram && Number(p.ram) <= maxim_ram
      const minim_baterie = baterie_minima || 0;
      const maxim_baterie = baterie_maxima || Infinity;
      const baterie = Number(p.battery) >= minim_baterie && Number(p.battery) <= maxim_baterie
      const minim_pret = pret_minim || 0;
      const maxim_pret = pret_maxim || Infinity;
      const pret = Number(p.price) >= minim_pret && Number(p.price) <= maxim_pret
      const minim_Power = Power_minim || 0;
      const maxim_Power = Power_maxim || Infinity;
      const Power = Number(p.power) >= minim_Power && Number(p.power) <= maxim_Power
      const minim_CardSlotMaxStorage = CardSlotMaxStorage_minim || 0;
      const maxim_CardSlotMaxStorage = CardSlotMaxStorage_maxim || Infinity;
      const CardSlotMaxStorage = Number(p.card_slot_max) >= minim_CardSlotMaxStorage && Number(p.card_slot_max) <= maxim_CardSlotMaxStorage
      const SDCardFilterConst = SDCardFilterSelect === "All" || p.mem_card_slot.toLowerCase() === SDCardFilterSelect.toLowerCase()
      const NFC_FilterSelectConst = NFC_FilterSelect === "All" || p.nfc.toLowerCase() === NFC_FilterSelect.toLowerCase()
      const HeadphoneJackFilterSelectConst = HeadphoneJackFilterSelect === "All" || p.jack.toLowerCase() === HeadphoneJackFilterSelect.toLowerCase()
      return nume_cautate && tip_filtrat && memorie_interna && memorie_ram && baterie && pret && Power && CardSlotMaxStorage && SDCardFilterConst && NFC_FilterSelectConst && HeadphoneJackFilterSelectConst
    }
  );
  const navigate = useNavigate();
  const handleLogOut = (e) => {
    e.preventDefault();
    navigate('/login');
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/signup');
  };
  const clearAll = (e) => {
    setTextCautat("");
    setTipCautat("All");
    setmemorie_interna_minima(0);
    setmemorie_interna_maxima(Infinity);
    setmemorie_ram_minima(0);
    setmemorie_ram_maxima(Infinity);
    setbaterie_minima(0);
    setbaterie_maxima(Infinity);
    setpret_minim(0);
    setpret_maxim(Infinity);
    setCardSlotMaxStorage_minim(0);
    setCardSlotMaxStorage_maxim(Infinity);
    setPower_minim(0);
    setPower_maxim(Infinity);
    setSDCardFilterSelect("All");
    setNFC_FilterSelect("All");
    setHeadphoneJackFilterSelect("All");
  }
  return(
    <>
      <button type="logout" onClick={handleLogOut}>Logout</button>
      <button type="signup" onClick={handleSignUp}>Sign Up</button>
      <h1>Device enhanced finder</h1>
      <TypeFilter onSelect={(tip_filtrat) => setTipCautat(tip_filtrat)} />
      <SDCardFilter OnSDCardFilter={(SDCardFilterConst) => setSDCardFilterSelect(SDCardFilterConst)} />
      <NFC_Filter OnNFC_Filter={(NFC_FilterSelectConst) => setNFC_FilterSelect(NFC_FilterSelectConst)} />
      <HeadphoneJackFilter OnHeadphoneJackFilter={(HeadphoneJackFilterSelectConst) => setHeadphoneJackFilterSelect(HeadphoneJackFilterSelectConst)} />
      <button type="clearAll" onClick={clearAll}>Clear all filters</button><h1 />
      <SearchBar  candSeSchimba={(valoare) => setTextCautat(valoare)} />
      <StorageLimits OnMinStorageChange={(valoare) => setmemorie_interna_minima(valoare)} OnMaxStorageChange={(valoare) => setmemorie_interna_maxima(valoare)}/>
      <RamLimits OnMinRamChange={(valoare) => setmemorie_ram_minima(valoare)} OnMaxRamChange={(valoare) => setmemorie_ram_maxima(valoare)}/>
      <BatteryLimits OnMinBatteryChange={(valoare) => setbaterie_minima(valoare)} OnMaxBatteryChange={(valoare) => setbaterie_maxima(valoare)}/>
      <PriceLimits OnMinPriceChange={(valoare) => setpret_minim(valoare)} OnMaxPriceChange={(valoare) => setpret_maxim(valoare)}/>
      <PowerLimits OnMinPowerChange={(valoare) => setPower_minim(valoare)} OnMaxPowerChange={(valoare) => setPower_maxim(valoare)}/>
      <CardSlotMaxStorageLimits OnMinCardSlotMaxStorageChange={(valoare) => setCardSlotMaxStorage_minim(valoare)} OnMaxCardSlotMaxStorageChange={(valoare) => setCardSlotMaxStorage_maxim(valoare)}/>
      {produseFiltrate.map((p) => (
        <MyCard 
          id={p.id}
          key={p.id}
          title={p.title}
          type={p.type}
          price={p.price}
          storage={p.storage}
          ram={p.ram}
          jack={p.jack}
          battery={p.battery}
          nfc={p.nfc}
          card_slot_max={p.card_slot_max}
          mem_card_slot={p.mem_card_slot}
          power={p.power}
        />
      ))}
    </>
  )
}
export default Home