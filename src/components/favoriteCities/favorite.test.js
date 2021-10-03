import { fireEvent, render, screen } from "@testing-library/react";
import { FavoriteCity } from "./index";
import { MemoryRouter } from "react-router-dom";

const removeFavorites = jest.fn();

const city = {
  coord: {
    lon: 7.0117,
    lat: 4.7907,
  },
  weather: [
    {
      id: 804,
      main: "Clouds",
      description: "overcast clouds",
      icon: "04n",
    },
  ],
  base: "stations",
  main: {
    temp: 25.1,
    feels_like: 25.99,
    temp_min: 25.1,
    temp_max: 25.1,
    pressure: 1011,
    humidity: 89,
    sea_level: 1011,
    grnd_level: 1010,
  },
  visibility: 10000,
  wind: {
    speed: 2.34,
    deg: 224,
    gust: 5.58,
  },
  clouds: {
    all: 95,
  },
  dt: 1633203760,
  sys: {
    country: "NG",
    sunrise: 1633151944,
    sunset: 1633195398,
  },
  timezone: 3600,
  id: 2591746,
  name: "Orogbum",
  cod: 200,
};

it("Test the favorite city component", async () => {
  render(
    <MemoryRouter>
      <FavoriteCity removeFavorites={removeFavorites} city={city} />
    </MemoryRouter>
  );
  expect(screen.getByText(/overcast clouds/gi)).toBeInTheDocument;
  const heart = screen.getByText(/💖/);
  fireEvent.click(heart);
  expect(removeFavorites).toHaveBeenCalledTimes(1);
});
