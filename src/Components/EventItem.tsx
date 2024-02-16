import React, { useEffect, useState } from "react";
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

interface EventItemProps {
  event: Event; // Specify type for event prop
}

function EventItem({ event }: EventItemProps) {
  const [showEvent, setShowEvent] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    setShowEvent(!!(event.public_url || isLoggedIn));
  }, [event.private_url, isLoggedIn]);

  const handleEventClickPublic = () => {
    // window.location.href = event.public_url;
    window.open(event.public_url);
  };

  const handleEventClickPrivate = () => {
    // window.location.href = event.private_url;
    window.open(event.private_url);
  };

  return (
    <>
      {showEvent && (
        <div className="m-8">
          <h2 className="cursor-pointer text-3xl">{event.name}</h2>

          <h3>
            {new Date(event.start_time).toLocaleString()} -
            {new Date(event.end_time).toLocaleString()}
          </h3>
          {event.public_url && (
            <button onClick={handleEventClickPublic}>link to event</button>
          )}
          {isLoggedIn && (
            <button onClick={handleEventClickPrivate}>private link</button>
          )}
          <p>Event: {event.event_type}</p>
          <p>Speakers: {event.speaker}</p>
          <p>{event.description}</p>
        </div>
      )}
    </>
  );
}

export default EventItem;
