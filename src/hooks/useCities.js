import { useEffect } from "react";
import fetcher from "../utils/fetcher";
import { refresh } from "../utils/refresh";

export default function useCities(cities, key, dispatch) {
  useEffect(() => {
    const names = cities.map((f) => f.name);
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
    ]).then((res) => {
      const fulfilled = res
        .filter((r) => r.status === "fulfilled")
        .map((r) => r.value);
      const merge = cities.map(
        (c) => fulfilled.find((f) => f.id === c.id) ?? c
      );
      refresh(merge, key, dispatch);
    });
  }, [cities, key, dispatch]);
}
