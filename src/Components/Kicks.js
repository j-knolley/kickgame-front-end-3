import axios from "axios";
import { useState, useEffect } from "react";
import Kick from "./Kick"; // Importing the Kick component

// Get the API URL from environment variables
const API = process.env.REACT_APP_API_URL;

// React component to display a list of kicks
function Kicks() {
  // State to store the list of kicks
  const [kicks, setKicks] = useState([]);

  // Effect to fetch kicks data from the API on component mount
  useEffect(() => {
    axios
      .get(`${API}/kicks`)
      .then(
        (response) => {
          // Log the retrieved data and set it in the kicks state
          console.log("response.data:");
          console.log(response.data);
          setKicks(response.data);
        },
        (err) => console.error(err)
      )
      .catch((c) => console.warn("catch", c));
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Render the list of kicks using the Kick component
  return (
    <div>
      <section>
        <table className="Kicks">
          <thead>
            <tr>
              <th>Fav</th>
              <th>Kick</th>
              <th>Brand</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {kicks.map((kick) => {
              // Render the Kick component for each kick
              return <Kick key={kick.id} kick={kick} id={kick.id} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Kicks;
