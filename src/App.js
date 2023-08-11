import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Events from "./pages/Events/Events";
import EventDetails from "./pages/EventDetails/EventDetails";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/event-details/:eventID" element={<EventDetails />} />
      </Routes>
    </div>
  );
}

export default App;
