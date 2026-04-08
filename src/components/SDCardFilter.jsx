function SDCardFilter(props) {
  const type = ["microSD", "SD", "No", "All"]
  return (<>Memory card slot
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      {
        type.map((type_)=>(
            <button key={type_} onClick={() => props.OnSDCardFilter(type_)}>
                {type_}
            </button>
        ))
      }
    </div> </>
  );
}

export default SDCardFilter;