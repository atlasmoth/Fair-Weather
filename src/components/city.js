import { memo, useEffect, useState } from "react";
import fetcher from "../utils/fetcher";
import { getIcon } from "./../utils/getIcon";
import Skycons from "react-skycons";
import { nanoid } from "nanoid";
import Editable from "./editable";

function City(props) {
  const { city } = props.match.params;
  const [stats, setStats] = useState(
    () => props.favorites.find((s) => s.name === decodeURI(city)) ?? null
  );
  const [loading, setLoading] = useState(true);

  const [isFavorite, setIsFavorite] = useState(() =>
    props.favorites.some(
      (s) =>
        s.name.toLowerCase().trim() === decodeURI(city).toLowerCase().trim()
    )
  );
  useEffect(() => {
    setIsFavorite(
      props.favorites.some(
        (s) =>
          s.name.toLowerCase().trim() === decodeURI(city).toLowerCase().trim()
      )
    );
  }, [props.favorites, city]);
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {stats && (
          <>
            <h2 className="enlarge">
              <span style={{ marginRight: "2rem" }}>
                {stats.name}, {stats?.sys?.country}
              </span>
              {isFavorite ? (
                <span
                  className="point"
                  onClick={() => {
                    props.removeFavorites(stats);
                  }}
                >
                  <i className="fas fa-heart red"></i>
                </span>
              ) : (
                <span
                  className="point"
                  onClick={() => {
                    props.updateFavorites(stats);
                  }}
                >
                  <i className="far fa-heart blue"></i>
                </span>
              )}
            </h2>
            <Skycons
              color="#091f2f"
              type={getIcon(stats.weather[0].id)}
              animate={true}
              size={150}
              resizeClear={true}
              style={{ backgroundColor: "transparent" }}
            />

            <h2 style={{ textTransform: "capitalize" }}>
              {stats.weather[0].description}
            </h2>
            <h2>
              {stats.main.temp} <sup>o</sup>C
            </h2>
          </>
        )}
        {!loading && !stats && (
          <>
            <h2 className="enlarge">{decodeURI(city)} not found</h2>
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
  const [notes, setNotes] = useState(() => {
    const notesList = localStorage.getItem(city);
    return notesList ? JSON.parse(notesList) : [];
  });
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
      <h2 className="enlarge">Notes</h2>
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
          <h3>Add Note</h3>
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
