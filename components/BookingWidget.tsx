"use client"
import { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function BookingWidget({ price }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");


  

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    try {
      const response = await axios.post("/api/bookings", {
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        place: place._id,
        price: numberOfNights * place.price,
      });
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      console.error("Error booking the place:", error);
    }
  }

  if (redirect) {
    router.push(redirect);
    return null;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${price} 
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4 text-sm">
            <label>Event Date:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l text-sm">
            <label>Event Time:</label>
            <input
              type="time"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t text-sm">
          <label>Number of guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Phone number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
        )}
      </div>
      <Button className=" my-3 w-full bg-rose-600 font-bold text-white sm:w-96 md:w-80">Book Vendor</Button>
    </div>
  );
}
