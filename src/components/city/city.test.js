import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import City, { NoteComponent } from "./index";
import fetchMock from "jest-fetch-mock";
import { dataContext } from "../../contexts/dataContext";
import { MemoryRouter } from "react-router-dom";

const mockObj = {
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
fetchMock.mockResponse(JSON.stringify(mockObj));
const update = jest.fn();
const remove = jest.fn();

const CustomCity = () => {
  return (
    <dataContext.Provider
      value={{
        favorites: [],
        updateFavorites: update,
        removeFavorites: remove,
        largestCities: [],
      }}
    >
      <MemoryRouter>
        <City
          match={{
            path: "/cities/:city",
            url: "/cities/São Paulo",
            isExact: true,
            params: {
              city: "São Paulo",
            },
          }}
        />
      </MemoryRouter>
    </dataContext.Provider>
  );
};
it("Ensure that component makes right API call and renders result", async () => {
  render(<CustomCity />);

  expect(fetch).toHaveBeenCalledTimes(1);
  await waitFor(() => {
    expect(screen.getByText(/🌡️/gi)).toBeInTheDocument;
  });
  const check = await screen.findByRole("checkbox");
  await waitFor(() => {
    fireEvent.click(check);
  });
  expect(update).toHaveBeenCalledWith(expect.objectContaining(mockObj));
});

it("Test notesComponent", async () => {
  render(<NoteComponent city="Orogbum" />);
  expect(screen.getByText(/Notes/gi)).toBeInTheDocument;
  const textarea = screen.getByRole("textbox");
  expect(textarea).toBeInTheDocument;
  const text = "This is a new note";
  userEvent.type(textarea, text);
  expect(textarea).toHaveValue(text);
  userEvent.click(screen.getByText(/Save/gi));
  const p = screen.getByText(text);
  expect(p.tagName).toBe("P");
});

it("Test for wrong route", async () => {
  fetch.mockRejectOnce(() => Promise.reject("Invalid request"));

  render(
    <dataContext.Provider
      value={{
        favorites: [],
        updateFavorites: update,
        removeFavorites: remove,
        largestCities: [],
      }}
    >
      <MemoryRouter>
        <City
          match={{
            path: "/cities/:city",
            url: "/cities/XYYZXYZ",
            isExact: true,
            params: {
              city: "XYYZXYZ",
            },
          }}
        />
      </MemoryRouter>
    </dataContext.Provider>
  );
  const failTextObj = await screen.findByText(/XYYZXYZ Not Found/gi);
  expect(failTextObj).toBeInTheDocument;
  screen.debug(failTextObj);
});
