import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "../components/Perks";
import axios from "axios";
import PhotoUploader from "../components/PhotoUploader";
import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "../components/AccountNav";

const PlacesPage = () => {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div className="text-center">
        list of all added places
        <br />
        <Link
          className="inline-flex gap-1 bg-primary rounded-full py-2 px-4 text-white"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add New Place
        </Link>
      </div>
      <div>
        {places.length > 0 &&
          places.map((place) => {
            return (
              <Link to={'/account/places/'+place._id} className="bg-gray-200 p-3 rounded-2xl m-2 flex gap-2">
                {place.photos.length > 0 && (
                  <div className="w-32 h-32 bg-gray-100 flex">
                    <img src={'http://localhost:4000/uploads/'+place.photos[0]} alt="" />
                  </div>
                )}
                <div>
                  <h2>{place.title}</h2>
                  <p>{place.description}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
export default PlacesPage;
