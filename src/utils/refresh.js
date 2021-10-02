import { sort } from "./helper";

export const refresh = (objs, token, dispatch) => {
  const sorted = sort(objs);
  localStorage.setItem(token, JSON.stringify(sorted));
  dispatch(sorted);
};
