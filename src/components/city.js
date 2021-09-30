import { useEffect } from "react";
import Md from "./md";

export default function City(props) {
  const { city } = props.match.params;

  useEffect(() => {
    console.log(props);
  }, [props]);
  return (
    <div>
      <h2>We in yo city</h2>
      <Md name={city} />
    </div>
  );
}
