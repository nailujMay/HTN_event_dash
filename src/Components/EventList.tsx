import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import EventItem from "./EventItem";
import Login from "./Login";
import { useAuth } from "./AuthContext";

interface Event {
  id: string;
  name: string;
  start_time: string;
  end_time: string;
  public_url: string;
  private_url: string;
  event_type: string;
  speaker: string;
  description: string;
  // Add any other properties of your event object
}
const EventList = () => {
  const [data, setData] = useState<Event[] | null>(null); // No need to specify type in JavaScript
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { logout, isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.hackthenorth.com/v3/events "
        ); // Replace with your API endpoint URL
        const sortedData = response.data.sort(
          (
            a: { start_time: string | number | Date },
            b: { start_time: string | number | Date }
          ) => {
            return (
              new Date(a.start_time).getTime() -
              new Date(b.start_time).getTime()
            );
          }
        );

        setData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };

  const handleClosePopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={handleLoginClick}>Login</button>
      )}
      {/* {isLoggedIn && (
        <button
          onClick={logout}
          className="m-2 px-4 flex justify-center border border-gray-400 hover:bg-gray-100"
        >
          log out
        </button>
      )} */}
      {showLoginPopup && <Login onClose={handleClosePopup} />}
      <ul>
        {data &&
          data.map((event) => <EventItem key={event.id} event={event} />)}
      </ul>{" "}
    </div>
  );
};

export default EventList;
