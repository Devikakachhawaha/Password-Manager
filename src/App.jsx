import { useState } from "react";
import Navbar from "./components/Navbar";
import Manager from "./components/Manager";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <> 
      <div className="app-container">
      <Navbar />
      <div className=" content min-h-[77.5vh]  bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(212,225,238,.5)_100%)]">
      <Manager />
      </div>
      <Footer/>
      </div>
    </>
  );
}

export default App;
