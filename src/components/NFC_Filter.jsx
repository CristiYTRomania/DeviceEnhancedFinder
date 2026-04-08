function NFC_Filter(props) {
  const type = ["Yes", "No", "All"]
  return (<> NFC support
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      {
        type.map((type_)=>(
            <button key={type_} onClick={() => props.OnNFC_Filter(type_)}>
                {type_}
            </button>
        ))
      }
    </div> </>
  );
}

export default NFC_Filter;