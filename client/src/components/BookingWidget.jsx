const BookingWidget = ({placeData}) => {
  return (
    <div>
        <div className="bg-white rounded-xl shadow p-4">
            <div className="text-2xl text-center">
              Price : LKR {placeData.pricePerNight} night
            </div>
            <div className="border">
              <div className="flex">
                <div className="border">
                  <label htmlFor="checkIn">Check-in: </label>
                  <input type="date" id="checkIn" />
                </div>
                <div className="border">
                  <label htmlFor="checkOut">Check-out: </label>
                  <input type="date" id="checkOut" />
                </div>
              </div>
              <div>
                <label htmlFor="numberOfGuests">Number of Guests: </label>
                <input type="number" id="numberOfGuests" value={1}/>
              </div>
            </div>
            <button className="primary">Book Now</button>
          </div>
    </div>
  )
}
export default BookingWidget