import helper from "./helper";

export const refresh = (objs, token, dispatch) => {
  const sorted = helper(objs);
  localStorage.setItem(token, JSON.stringify(sorted));
  dispatch(sorted);
};
