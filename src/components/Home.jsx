import { useState } from 'react'
import '../App.css'
import MyCard from './MyCard.jsx'
import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter.jsx'
import StorageLimits from './StorageLimits.jsx'
import RamLimits from './RamLimits.jsx'
import BatteryLimits from './BatteryLimits.jsx'
import { useNavigate } from 'react-router-dom';
function Home() {
  const [textCautat, setTextCautat] = useState("");
  const [tipCautat, setTipCautat] = useState("All");
  const [memorie_interna_minima, setmemorie_interna_minima] = useState(0);
  const [memorie_interna_maxima, setmemorie_interna_maxima] = useState(Infinity);
  const [memorie_ram_minima, setmemorie_ram_minima] = useState(0);
  const [memorie_ram_maxima, setmemorie_ram_maxima] = useState(Infinity);
  const [baterie_minima, setbaterie_minima] = useState(0);
  const [baterie_maxima, setbaterie_maxima] = useState(Infinity);
  const produse = [
    { id: 1,  title: "Acer Nitro V 15 ANV15-52-79A6"   , type: "Laptop"    , price: "6000"   , storage: "1024" , ram: "32"      , jack: "Yes", battery: "0"   , nfc: "NaN", card_slot_max: "NaN" , mem_card_slot: "NaN"    , power: "NaN", },
    { id: 2,  title: "Apple iPhone 12 mini"            , type: "Smartphone", price: "855.55" , storage: "256"  , ram: "4"       , jack: "No" , battery: "2227", nfc: "Yes", card_slot_max: "NaN" , mem_card_slot: "No"     , power: "NaN", },
    { id: 3,  title: "Asus V440VAK-BPC0170"            , type: "PC"        , price: "2800"   , storage: "512"  , ram: "16"      , jack: "Yes", battery: "0"   , nfc: "NaN", card_slot_max: "NaN" , mem_card_slot: "No"     , power: "120", },
    { id: 4,  title: "Asus Vivobook 15 X540UBR"        , type: "Laptop"    , price: "963.73" , storage: "256"  , ram: "8"       , jack: "Yes", battery: "0"   , nfc: "NaN", card_slot_max: "256" , mem_card_slot: "microSD", power: "NaN", },
    { id: 13, title: "E-Boda Smart Time 100"           , type: "Smartwatch", price: "59.89"  , storage: "0"    , ram: "0.03125" , jack: "No" , battery: "230" , nfc: "No" , card_slot_max: "NaN" , mem_card_slot: "No"     , power: "NaN", },
    { id: 5,  title: "Fairphone 6"                     , type: "Smartphone", price: "2795.04", storage: "256"  , ram: "8"       , jack: "No" , battery: "4415", nfc: "Yes", card_slot_max: "2048", mem_card_slot: "microSD", power: "NaN", },
    { id: 6,  title: "HP Elitebook Folio 9470m"        , type: "Laptop"    , price: "500"    , storage: "128"  , ram: "8"       , jack: "Yes", battery: "0"   , nfc: "NaN", card_slot_max: "NaN" , mem_card_slot: "SD"     , power: "NaN", },
    { id: 7,  title: "HP ProOne 400"                   , type: "PC"        , price: "NaN"    , storage: "512"  , ram: "4"       , jack: "Yes", battery: "0"   , nfc: "NaN", card_slot_max: "NaN" , mem_card_slot: "SD"     , power: "NaN", },
    { id: 8,  title: "MSI Katana 15 HX B14WFK-265XRO"  , type: "Laptop"    , price: "6200"   , storage: "512"  , ram: "16"      , jack: "No" , battery: "0"   , nfc: "NaN", card_slot_max: "NaN" , mem_card_slot: "NaN"    , power: "NaN", },
    { id: 9,  title: "Nothing Phone (4a)"              , type: "Smartphone", price: "1980.46", storage: "256"  , ram: "12"      , jack: "No" , battery: "5080", nfc: "Yes", card_slot_max: "NaN" , mem_card_slot: "No"     , power: "NaN", },
    { id: 10, title: "OnePlus Nord 2 5G"               , type: "Smartphone", price: "909.58" , storage: "128"  , ram: "8"       , jack: "No" , battery: "4500", nfc: "Yes", card_slot_max: "NaN" , mem_card_slot: "No"     , power: "NaN", },
    { id: 11, title: "Samsung Galaxy A15 4G"           , type: "Smartphone", price: "639"    , storage: "128"  , ram: "4"       , jack: "Yes", battery: "5000", nfc: "Yes", card_slot_max: "1024", mem_card_slot: "microSD", power: "NaN", },
    { id: 12, title: "Samsung Galaxy S10e"             , type: "Smartphone", price: "662.23" , storage: "128"  , ram: "6"       , jack: "Yes", battery: "3100", nfc: "Yes", card_slot_max: "512" , mem_card_slot: "microSD", power: "NaN", },
  ];
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
      return nume_cautate && tip_filtrat && memorie_interna && memorie_ram && baterie
    }
  );
  const navigate = useNavigate();
  const handleLogOut = (e) => {
    e.preventDefault();
    navigate('/login');
  };
  return(
    <>
      <button type="logout" onClick={handleLogOut}>Logout</button>
      <h1>Device enhanced finder</h1>
      <TypeFilter onSelect={(tip_filtrat) => setTipCautat(tip_filtrat)} />
      <SearchBar  candSeSchimba={(valoare) => setTextCautat(valoare)} />
      <StorageLimits OnMinStorageChange={(valoare) => setmemorie_interna_minima(valoare)} OnMaxStorageChange={(valoare) => setmemorie_interna_maxima(valoare)}/>
      <RamLimits OnMinRamChange={(valoare) => setmemorie_ram_minima(valoare)} OnMaxRamChange={(valoare) => setmemorie_ram_maxima(valoare)}/>
      <BatteryLimits OnMinBatteryChange={(valoare) => setbaterie_minima(valoare)} OnMaxBatteryChange={(valoare) => setbaterie_maxima(valoare)}/>
      {produseFiltrate.map((p) => (
        <MyCard 
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