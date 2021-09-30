export default function fetcher(fetch, url, options) {
  return fetch(url, options).then((res) => {
    if (res.ok && res.status.toString().startsWith("2")) {
      return res.json();
    }
    throw res.json();
  });
}
