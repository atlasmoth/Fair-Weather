import { memo, useEffect, useState } from "react";
import fetcher from "../utils/fetcher";
import { getIcon } from "./../utils/getIcon";
import Skycons from "react-skycons";
import { nanoid } from "nanoid";
import Editable from "./editable";
import { useDataContext } from "../contexts/dataContext";
import { fetchFromLocal } from "../utils/helper";

function City(props) {
  const dataContext = useDataContext();
  const { favorites, largestCities, updateFavorites, removeFavorites } =
    dataContext;
  const { city } = props.match.params;
  const [stats, setStats] = useState(
    () =>
      [...favorites, ...largestCities].find(
        (s) =>
          s.name.toLowerCase().trim() ===
          decodeURIComponent(city).toLowerCase().trim()
      ) ?? null
  );
  const [loading, setLoading] = useState(true);

  const [isFavorite, setIsFavorite] = useState(() =>
    favorites.some(
      (s) =>
        s.name.toLowerCase().trim() === decodeURI(city).toLowerCase().trim()
    )
  );
  useEffect(() => {
    setIsFavorite(
      favorites.some(
        (s) =>
          s.name.toLowerCase().trim() === decodeURI(city).toLowerCase().trim()
      )
    );
  }, [favorites, city]);
  useEffect(() => {
    fetcher(
      window.fetch,
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&APPID=${process.env.REACT_APP_OPENWEATHER}`,
      {}
    )
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => {
      setLoading(true);
      setStats(null);
    };
  }, [setStats, city]);

  return (
    <>
      <div className="center-flex">
        {stats && (
          <>
            <h2 className="enlarge heart-container">
              <span className="right-span">
                {stats.name}, {stats?.sys?.country}
              </span>
              <label className="heart-switch">
                <input
                  type="checkbox"
                  defaultChecked={isFavorite}
                  onClick={() => {
                    isFavorite
                      ? removeFavorites(stats)
                      : updateFavorites(stats);
                  }}
                />
                <svg viewBox="0 0 33 23" fill="white">
                  <path d="M23.5,0.5 C28.4705627,0.5 32.5,4.52943725 32.5,9.5 C32.5,16.9484448 21.46672,22.5 16.5,22.5 C11.53328,22.5 0.5,16.9484448 0.5,9.5 C0.5,4.52952206 4.52943725,0.5 9.5,0.5 C12.3277083,0.5 14.8508336,1.80407476 16.5007741,3.84362242 C18.1491664,1.80407476 20.6722917,0.5 23.5,0.5 Z"></path>
                </svg>
              </label>
            </h2>
            <Skycons
              color="#091f2f"
              type={getIcon(stats.weather[0].id)}
              animate={true}
              size={150}
              resizeClear={true}
              className="transparent"
            />

            <h3 className="capital">{stats.weather[0].description}</h3>
            <h3 className="options">
              <span>
                🌡️ {stats.main.temp} <sup>o</sup>C
              </span>{" "}
              <span>💨 {stats.wind.speed}m/s </span>
              <span>🌦️{stats.main.humidity / 100}</span>
            </h3>
          </>
        )}
        {!loading && !stats && (
          <>
            <h2 className="enlarge">{decodeURIComponent(city)} not found</h2>
            <span>
              <i className="fas fa-bomb enlarge"></i>
            </span>
          </>
        )}
      </div>
      {stats && <NoteComponent city={stats.name} />}
    </>
  );
}

const NoteComponent = ({ city }) => {
  const [notes, setNotes] = useState(fetchFromLocal(city));
  const updateNotes = (note, id) => {
    let newNotes;
    if (id) {
      newNotes = [
        ...notes
          .map((tempNote) =>
            tempNote.id === id ? { ...tempNote, note } : { ...tempNote }
          )
          .filter((n) => n.note.length > 0),
      ];
    }
    if (!id) {
      newNotes = [...notes, { id: nanoid(), note }].filter(
        (n) => n.note.length > 0
      );
    }
    setNotes(newNotes);
    localStorage.setItem(city, JSON.stringify(newNotes));
  };
  const [currNote, setCurrNote] = useState("");

  return (
    <div className="notes">
      <h2 className="enlarge">🖊️ Notes </h2>
      <ul>
        {notes.map((n) => (
          <li key={n.id}>
            <Editable text={n.note} id={n.id} updateNotes={updateNotes} />
          </li>
        ))}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateNotes(currNote);
          setCurrNote("");
        }}
      >
        <label htmlFor="note">
          <h3>Add Note </h3>
        </label>

        <textarea
          id="note"
          value={currNote}
          onChange={(e) => setCurrNote(e.target.value)}
        ></textarea>
        <button className="btn">Save</button>
      </form>
    </div>
  );
};
export default memo(City);
