export default function QueryRes({data, setBannedList, allCats, setAllCats}){

    
    const handleClick = (event) => {
        const {name, value} = event.target;

        setBannedList((prevState) => [...prevState, name+" : "+value]);

        const filteredCatData = allCats.filter((element) => element[name] != value);
        
        setAllCats(filteredCatData)
    }

    return (
        <div className="queryRes">
               <h2>{data.name}</h2>
                <div className="attributes">
                    <label>
                        Breed:
                        <button  
                            onClick={handleClick} value={data.breed_group}
                            name="breed_group"
                        >
                            {data.breed_group}
                        </button>
                    </label>
                    <label>
                        Lifespan:
                        <button 
                            onClick={handleClick} value={data.life_span}
                            name="life_span"
                        >
                            {data.life_span}
                        </button>
                    </label>
                </div>
                <img src={data.imgSrc}/>
        </div> 
    )
}