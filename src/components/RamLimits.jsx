function RamLimits(props){
    return (
        <div>
            RAM memory in GB: From 
            <input
                type="number"
                placeholder="Minimum"
                value={props.MinRAM}
                onChange={(e) => props.OnMinRamChange(e.target.value)}
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
                value={props.MaxRAM}
                onChange={(e) => props.OnMaxRamChange(e.target.value)}
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
export default RamLimits