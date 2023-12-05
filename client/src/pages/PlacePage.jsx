import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../components/BookingWidget";

const PlacePage = () => {
  const { id } = useParams();
  const [placeData, setPlaceData] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    axios.get("/places/" + id).then((response) => {
      setPlaceData(response.data);
    });
  }, [id]);

  if (placeData === null) {
    return <div>Loading...</div>;
  }

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 min-h-screen bg-white border-2 border-black overflow-scroll">
        <button
            className="fixed border-2 border-gray-50 rounded-full  ml-8 p-4 bg-gray-300 opacity-70 "
            onClick={() => setShowAllPhotos(false)}
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
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        <div className="p-8 grid gap-4 md:grid-cols-2 mt-8">
          
          {placeData?.photos?.length > 0 &&
            placeData.photos.map((photo) => {
              return (
                <div key={photo}>
                  <img src={"http://localhost:4000/uploads/" + photo} alt="" />
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 py-6 px-2">
      <h1 className="text-3xl">{placeData.title}</h1>
      <a
        className="my-2 font-semibold underline flex gap-2"
        target="_blank"
        href={"https://maps.google.com/?g=" + placeData.address}
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
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        {placeData.address}
      </a>
      <div className="relative mt-3">
        <div className="grid grid-cols-[2fr_1fr] gap-2 rounded-2xl overflow-hidden">
          <div className="flex">
            {placeData.photos?.[0] && (
              <img onClick={()=>setShowAllPhotos(true)}
                className="object-cover cursor-pointer"
                src={"http://localhost:4000/uploads/" + placeData.photos[0]}
                alt=""
              />
            )}
          </div>
          <div className="grid gap-2 ">
            <div>
              {placeData.photos?.[1] && (
                <img onClick={()=>setShowAllPhotos(true)}
                className="cursor-pointer"
                  src={"http://localhost:4000/uploads/" + placeData.photos[1]}
                  alt=""
                />
              )}
            </div>
            <div>
              {placeData.photos?.[2] && (
                <img onClick={()=>setShowAllPhotos(true)}
                className="cursor-pointer"
                  src={"http://localhost:4000/uploads/" + placeData.photos[2]}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="absolute bottom-1 right-1 bg-white px-3 py-2 flex gap-2 rounded-lg opacity-80 hover:scale-105 shadow-md shadow-gray-500"
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
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
            />
          </svg>
          Show more photos
        </button>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 border-t">
        <div>
          <div>
            <h1 className="font-semibold text-2xl">Description</h1>
            {placeData.description}
          </div>
          <div>
            check-in: {placeData.checkIn}
            <br />
            check-out: {placeData.checkOut}
            <br />
            Max no. of guests: {placeData.maxGuests}
            <br />
          </div>
          <div>{placeData.extraInfo}</div>
        </div>
        <div>
          <BookingWidget placeData={placeData} />
        </div>
      </div>
      <div className="font-semibold text-2xl mt-2 mb-2 border-t">
        <h2 >Extra Info</h2>
      </div>
      <div className="leading-6">
        {placeData.extraInfo}
      </div>
    </div>
  );
};
export default PlacePage;
