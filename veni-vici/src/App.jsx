import { useState, useEffect } from 'react'
import QueryRes from './Components/QueryRes'
import History from './Components/History';
import Banned from './Components/Banned';
import './App.css'

function App() {
  const [allCats, setAllCats] = useState([]);
  const [history, setHistory] = useState([
    {
      name: null, 
      imgSrc: null
    }
  ]);
  const [data, setData] = useState({
    name: "",
    breed_group: null,
    life_span: null,
    imgSrc: ""
  })
  const [bannedList, setBannedList] = useState([]);
  const [showData, setShowData] = useState(false);

  const api_key = "live_cmOwopM5xEB7xyRk7fNkIMB8JuElJ1eUsb0ExuKWZSQDkvS0D5mjEY2kAByTRH3F";

  useEffect(() => {
    async function getAPI() {
      const response = await fetch("https://api.thedogapi.com/v1/breeds",{headers: {
        'x-api-key': api_key
      }})
      const queryData = await response.json();

      //filter data so only data with displayed attributes are in the state allCats
      var FilteredData = queryData.filter(element => element.image?.url != null);
      // FilteredData = queryData.filter(element => element.origin != null);


      //set it to allCats state var
      setAllCats(FilteredData);     
    }
    getAPI();
  },[])

  const fillData = (index) => {
    const {name, breed_group, life_span, image} = allCats[index];
    setData(prevState => ({
      ...prevState,
      name: name,
      breed_group: breed_group,
      life_span: life_span,
      imgSrc: image.url
    }))

    setHistory((prevCats) => [...prevCats, {name: name, imgSrc: image.url}]);

  }
  const getRandomCat = () => {
    let randNum = Math.floor(Math.random() * 65);
    while(allCats[randNum] === undefined){
      randNum = Math.floor(Math.random() * 65);
    }
    fillData(randNum);
    console.log(data.life_span);


    setShowData(true);
  }

  return (
    <div className="App">
      <History history={history}/>

      <div className="main-container">
        <h1>Veni Vici</h1>
        <h3>Find a dog to adopt!</h3>

        {showData && 
          <QueryRes 
            data={data} 
            setBannedList={setBannedList} 
            allCats={allCats}
            setAllCats={setAllCats}
          />
        }

        <button onClick={getRandomCat}>Discover!</button>
      </div> 
      <Banned 
        bannedList={bannedList} 
        setBannedList={setBannedList}
      />
    </div>
  )
}

export default App