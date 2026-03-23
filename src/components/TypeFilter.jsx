function TypeFilter(props) {
  const type = ["Smartphone", "Laptop", "Tablet", "External SSD", "Flash Drive", "Smartwatch", "PC", "All"]
  return (
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      {
        type.map((type_)=>(
            <button key={type_} onClick={() => props.onSelect(type_)}>
                {type_}
            </button>
        ))
      }
    </div>
  );
}

export default TypeFilter;