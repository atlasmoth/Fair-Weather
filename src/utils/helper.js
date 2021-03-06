export const sort = (arr = []) => {
  const compare = (a, b) => {
    var nameA = a.name.toUpperCase().trim();
    var nameB = b.name.toUpperCase().trim();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  };
  return [...arr].sort(compare);
};
export const fetchFromLocal = (key = "") =>
  JSON.parse(localStorage.getItem(key) ?? "[]");
