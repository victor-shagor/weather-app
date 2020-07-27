import axios from "axios";

import { location } from "./types";

export const getCityLonLat = async (city: string) => {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${city}&inputtype=textquery&fields=geometry&key=${process.env.REACT_APP_GOOGLE}`;
  const { status, data } = await axios.post(proxyurl + url);
  if (status === 200 && data.candidates[0]) {
    return data.candidates[0].geometry.location;
  } else {
    return null;
  }
};

export const getWeatherCondition = async (location: location) => {
  const { status, data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lng}&units=metric&appid=${process.env.REACT_APP_WEATHER}&exclude=hourly,minutely`
  );
  if (status === 200) {
    return data;
  } else {
    return null;
  }
};
