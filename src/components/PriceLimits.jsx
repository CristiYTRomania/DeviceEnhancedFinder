function PriceLimits(props){
    return (
        <div>
            Prețul în RON: De la 
            <input
                type="number"
                placeholder="Minimum"
                value={props.MinPrice}
                onChange={(e) => props.OnMinPriceChange(e.target.value)}
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
                value={props.MaxPrice}
                onChange={(e) => props.OnMaxPriceChange(e.target.value)}
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
export default PriceLimits