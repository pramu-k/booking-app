import { useEffect, useState } from "react";
import Perks from "../components/Perks";
import PhotoUploader from "../components/PhotoUploader";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);

  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [pricePerNight, setPricePerNight] = useState(0);
  const [extraInfo, setExtraInfo] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPricePerNight(data.pricePerNight);
      setExtraInfo(data.extraInfo);
    });
  }, [id]);

  const setTitleAndDescription = (title, description) => {
    return (
      <>
        <h2 className="text-2xl mt-4">{title}</h2>
        <p className="text-gray-500 text-sm mb-1">{description}</p>
      </>
    );
  };

  const savePlace = async (event) => {
    event.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      checkIn,
      checkOut,
      maxGuests,
      pricePerNight,
      extraInfo,
    };
    if (id) {
      //update
      await axios.put("/places",{id,...placeData});
      setRedirect(true);
    } else {
      //new place
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {setTitleAndDescription(
          "Title",
          "Title for your place. Should be short and catchy as in advertisement"
        )}
        <input
          type="text"
          placeholder="title, for example: My lovely apartment"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        {setTitleAndDescription("Address", "Address to the place")}
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        />
        {setTitleAndDescription("Photos", "More photos, more attraction")}
        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {setTitleAndDescription("Description", "Description of the place")}
        <textarea
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        {setTitleAndDescription("Perks", "Select all the perks of your place")}
        <Perks selected={perks} onChange={setPerks} />
        {setTitleAndDescription(
          "Check In & Out Times",
          "Add check in and out times. Please keep an interval for cleaning before guests."
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
          <div>
            <h3>Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(event) => {
                setCheckIn(event.target.value);
              }}
            />
          </div>
          <div>
            <h3>Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(event) => {
                setCheckOut(event.target.value);
              }}
            />
          </div>
          <div>
            <h3>Maximum no. of guests</h3>
            <input
              type="text"
              value={maxGuests}
              onChange={(event) => {
                setMaxGuests(event.target.value);
              }}
            />
          </div>
          <div>
            <h3>Price per night (LKR)</h3>
            <input
              type="text"
              value={pricePerNight}
              onChange={(event) => {
                setPricePerNight(event.target.value);
              }}
            />
          </div>
        </div>

        {setTitleAndDescription("Extra info", "House rules, etc..")}
        <textarea
          value={extraInfo}
          onChange={(event) => {
            setExtraInfo(event.target.value);
          }}
        />

        <button className="primary mt-4">Submit</button>
      </form>
    </div>
  );
};
export default PlacesFormPage;
