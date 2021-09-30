export default async function fetcher(fetch, url, options) {
  const res = await fetch(url, options);
  if (res.ok && res.status.toString().startsWith("2")) {
    return res.json();
  }
  throw await res.json();
}
