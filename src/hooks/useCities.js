import { useEffect } from "react";
import fetcher from "../utils/fetcher";
import { refresh } from "../utils/refresh";

export default function useCities(names, key, dispatch) {
  useEffect(() => {
    Promise.allSettled([
      ...names.map((i) =>
        fetcher(
          window.fetch,
          `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${encodeURIComponent(
            i
          )}&APPID=${process.env.REACT_APP_OPENWEATHER}`,
          {}
        )
      ),
    ])
      .then((objs) => {
        const data = objs
          .filter((o) => o.status === "fulfilled")
          .map((o) => o.value);

        refresh(data, key, dispatch);
      })
      .catch(console.log);
  }, [names, key, dispatch]);
}
