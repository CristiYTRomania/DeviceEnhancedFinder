function PowerLimits(props){
    return (
        <div>
            PC power in W: From 
            <input
                type="number"
                placeholder="Minimum"
                value={props.MinPower}
                onChange={(e) => props.OnMinPowerChange(e.target.value)}
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
            to 
            <input
                type="number"
                placeholder="Maximum"
                value={props.MaxPower}
                onChange={(e) => props.OnMaxPowerChange(e.target.value)}
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
export default PowerLimits