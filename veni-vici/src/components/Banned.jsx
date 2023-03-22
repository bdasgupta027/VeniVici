export default function Banned({bannedList, setBannedList}){
    const deleteItem = (event) => {
        const filterBannedList = bannedList.filter((element) => element != event.target.value)

        setBannedList(filterBannedList);
    }
    return (
        <div className="banned-list">
            <br></br>
            <h2>Ban List</h2>
            <br></br>
            
            { bannedList && 
                bannedList.map((item, index) => (
                   <button 
                    value={item} className="banned-item" 
                    key={index}
                    onClick={deleteItem}
                    >{item}
                    </button> 
                ))
            }
        </div>
    )
}