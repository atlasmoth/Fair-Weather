import fetcher from "./fetcher";
import helper from "./helper";

export const refresh = (objs, token, dispatch) => {
  const names = objs.map((o) => o.name);
  Promise.all([
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
    .then((data) => {
      const sorted = helper(data);
      localStorage.setItem(token, JSON.stringify(sorted));
      dispatch(sorted);
    })
    .catch(() => {
      console.log(objs);
      const sorted = helper(objs);
      localStorage.setItem(token, JSON.stringify(sorted));
      dispatch(sorted);
    });
};
