function CardSlotMaxStorageLimits(props){
    return (
        <div>
            Card Slot Max Storage Limits: From 
            <input
                type="number"
                placeholder="Minimum"
                value={props.MinCardSlotMaxStorage}
                onChange={(e) => props.OnMinCardSlotMaxStorageChange(e.target.value)}
                style={{
                padding: '10px',
                width: '20%',
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
                value={props.MaxCardSlotMaxStorage}
                onChange={(e) => props.OnMaxCardSlotMaxStorageChange(e.target.value)}
                style={{
                padding: '10px',
                width: '20%',
                borderRadius: '20px',
                border: '1px solid #ccc',
                marginLeft: '5px',
                }}
            />
        </div>
    )
}
export default CardSlotMaxStorageLimits