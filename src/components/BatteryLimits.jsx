function BatteryLimits(props){
    return (
        <div>
            Battery in mAh: From 
            <input
                type="number"
                placeholder="Minimum"
                value={props.MinBattery}
                onChange={(e) => props.OnMinBatteryChange(e.target.value)}
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
                value={props.MaxBattery}
                onChange={(e) => props.OnMaxBatteryChange(e.target.value)}
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
export default BatteryLimits