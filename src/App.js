import React from "react";
import NavScrollExample from "./components/homePage/Navbar";
import MainRoutes from "./routes/MainRoutes";
import Navbar from "./components/homePage/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <MainRoutes />
    </div>
  );
};

export default App;
