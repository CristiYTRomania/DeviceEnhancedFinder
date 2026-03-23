function StorageLimits(props){
    return (
        <div>
            Stocare în GB: De la 
            <input
                type="number"
                placeholder="Minimum"
                value={props.MinStorage}
                onChange={(e) => props.OnMinStorageChange(e.target.value)}
                style={{
                padding: '10px',
                width: '30%',
                borderRadius: '20px',
                border: '1px solid #ccc',
                marginBottom: '5px',
                marginLeft: '5px',
                marginRight: '5px',
                }}
            />
            până la 
            <input
                type="number"
                placeholder="Maximum"
                value={props.MaxStorage}
                onChange={(e) => props.OnMaxStorageChange(e.target.value)}
                style={{
                padding: '10px',
                width: '30%',
                borderRadius: '20px',
                border: '1px solid #ccc',
                marginLeft: '5px',
                }}
            />
        </div>
    )
}
export default StorageLimits