function HeadphoneJackFilter(props) {
  const type = ["Yes", "No", "All"]
  return (<>3.5mm headphone jack
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      {
        type.map((type_)=>(
            <button key={type_} onClick={() => props.OnHeadphoneJackFilter(type_)}>
                {type_}
            </button>
        ))
      }
    </div> </>
  );
}

export default HeadphoneJackFilter;