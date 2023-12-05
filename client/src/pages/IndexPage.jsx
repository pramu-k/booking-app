import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";


const IndexPage = () => {
  const [places,setPlaces]=useState([]);

  useEffect(()=>{
    axios.get('/places').then((response)=>{
      setPlaces(response.data);
    })
  },[])

  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-6">
      {places.length>0 && places.map((place)=>{
        return(
          <Link to={'/place/'+place._id} key={place._id}>
            <div className="bg-gray-200 rounded-xl mb-2">
              {place.photos.length>0 ?(
                <img className="rounded-xl aspect-square" src={'http://localhost:4000/uploads/'+place.photos[0]} alt="" />
              ):(<img src='/house.svg' alt="" />)}
            </div>
            <h1 className="text-lg font-bold">{place.title}</h1>
            <h2 className="text-sm">{place.address}</h2>
            <div className="flex items-center">
            <h1 className="text-lg font-bold">LKR&nbsp;{place.pricePerNight}&nbsp;</h1>
            <h2>per night</h2>
            </div>
            
          </Link>
        );
      })}
    </div>
  );
};
export default IndexPage;
