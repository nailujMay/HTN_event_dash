import EventList from "./Components/EventList";
import { AuthProvider } from "./Components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div>
        <h1 className="m-4 flex justify-center text-5xl">Events</h1>
        <EventList />;
      </div>
    </AuthProvider>
  );
}

export default App;
