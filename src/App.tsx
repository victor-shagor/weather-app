import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";

function App() {
  return (
    <Router>
      <div className="App" style={{ backgroundColor: "#84b8f1" }}>
        <Route exact path="/">
          <LandingPage />
        </Route>
      </div>
    </Router>
  );
}

export default App;
