function SearchBar(props) {
  return (
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Search by device model"
        onChange={(e) => props.candSeSchimba(e.target.value)}
        style={{
          padding: '10px',
          width: '80%',
          borderRadius: '20px',
          border: '1px solid #ccc'
        }}
      />
    </div>
  );
}

export default SearchBar;