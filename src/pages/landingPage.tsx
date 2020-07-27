import React, { useState } from "react";
import { getCityLonLat, getWeatherCondition } from "../services";
import Swal from "sweetalert2";
import { Weather, Current } from "./../types";

const LandingPage = () => {
  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const getDay = new Date().getDay();
  daysOfTheWeek.splice(getDay, 1);
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let today = new Date();
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<Weather[]>([]);
  const [current, setCurrent] = useState<Current>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const location = await getCityLonLat(city);
    if (location && location.lng) {
      const result = await getWeatherCondition(location);
      setCurrent(result.current);
      result.daily.splice(7, 1);
      const pop = result.daily.pop();
      result.daily.unshift(pop);
      setWeather(result.daily);
    } else {
      Swal.fire("Error", "Invalid City", "error");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "50vw",
          height: "60vh",
          borderTopLeftRadius: "25px",
          borderBottomLeftRadius: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "2rem",
          }}
        >
          <h3>Weather Forecast</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="&#xf002; Search New Places"
              onChange={(e: any) => setCity(e.target.value)}
              style={{
                height: "20px",
                width: "10rem",
                borderRadius: "10px",
                marginTop: "1rem",
                border: "0.5px solid black",
              }}
            />
          </form>
        </div>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <h4>Week</h4>
            {daysOfTheWeek.map((day, index) => (
              <p key={index}>{day}</p>
            ))}
          </div>
          <div style={{ color: "#B3B3B3" }}>
            <h4>Humidity</h4>
            {weather.length &&
              weather.map((res, index) => (
                <p key={index}>
                  {new Date(res.dt * 1000).getDay() !== getDay &&
                    res.humidity + "%"}
                </p>
              ))}
          </div>
          <div style={{ color: "#B3B3B3" }}>
            <h4>Temperature</h4>
            {weather.length &&
              weather.map((res, index) => (
                <p key={index}>
                  {new Date(res.dt * 1000).getDay() !== getDay &&
                    res.temp.day + "c"}
                </p>
              ))}
          </div>
          <div style={{ color: "#B3B3B3" }}>
            <h4>Description</h4>
            {weather.length &&
              weather.map((res, index) => (
                <p key={index}>
                  {new Date(res.dt * 1000).getDay() !== getDay &&
                    res.weather[0].description}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#061F41",
          width: "30vw",
          height: "60vh",
          borderTopRightRadius: "25px",
          borderBottomRightRadius: "25px",
          color: "white",
        }}
      >
        <h4>Today</h4>
        <h6 style={{ marginTop: "-1.3rem" }}>
          {today.toLocaleDateString("en-US", options)}
        </h6>
        <span style={{ fontSize: "6rem" }}>{current && current.temp}</span>
        <p style={{ marginTop: "-1.5rem", marginBottom: "4rem" }}>{city}</p>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <p>Humidity</p>
            <p>{current && current.humidity}</p>
          </div>
          <div>
            <p>Temperature</p>
            <p>{current && current.temp + "c"}</p>
          </div>
          <div>
            <p>Description</p>
            <p>{current && current.weather[0].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
