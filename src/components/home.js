import FavoriteCities from "./favoriteCities";
import LargestCities from "./largestCities";

export default function Home(props) {
  return (
    <div>
      <LargestCities />
      <FavoriteCities
        favorites={props.favorites}
        removeFavorites={props.removeFavorites}
      />
    </div>
  );
}
