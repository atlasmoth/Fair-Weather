import FavoriteCities from "./favoriteCities";
import LargestCities from "./largestCities";

export default function Home(props) {
  return (
    <div>
      <FavoriteCities
        favorites={props.favorites}
        removeFavorites={props.removeFavorites}
      />
      <LargestCities />
    </div>
  );
}
