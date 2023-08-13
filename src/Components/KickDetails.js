// Import necessary modules and hooks
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

// Define the KickDetails component
function KickDetails() {
  // Define state variable 'kick' and its setter function
  const [kick, setKick] = useState({});

  // Get the 'id' parameter from the URL using useParams hook
  let { id } = useParams();

  // Get the 'navigate' function from the useNavigate hook
  let navigate = useNavigate();

  // Get the API URL from environment variables
  const API = process.env.REACT_APP_API_URL;

  // Define function to delete a kick
  const deleteKick = () => {
    // Send a DELETE request to the API to delete the kick with the specified id
    axios
      .delete(`${API}/kicks/${id}`)
      .then(
        // If deletion is successful, navigate to the '/kicks' route
        () => navigate(`/kicks`),
        // If an error occurs, log the error to the console
        (error) => console.error(error)
      )
      // Catch any errors during the process and log a warning
      .catch((c) => console.warn("catch", c));
  };

  // Use the useEffect hook to fetch kick details when the component mounts
  useEffect(() => {
    // Send a GET request to the API to retrieve kick details based on the id
    axios
      .get(`${API}/kicks/${id}`)
      .then((response) => {
        // Set the retrieved kick data to the 'kick' state
        setKick(response.data);
      })
      .catch((error) => {
        // If an error occurs during the fetch, log a warning and navigate to the 'not-found' route
        console.warn("catch", error);
        navigate("/not-found");
      });
  }, [id, navigate, API]);

  // Return JSX content for rendering
  return (
    <>
      {/* Display kick details */}
      <article className="container Kick-Details">
        <h3>
          {/* Display a star icon if the kick is marked as a favorite */}
          {kick.is_favorite ? <span>⭐️</span> : null} {kick.name} - By{" "}
          {kick.brand}
        </h3>
        <h5>{kick.releaseDate}</h5>
        <h6>
          <span>Price: </span>
          {kick.price}
        </h6>
      </article>

      {/* Display navigation buttons */}
      <div className="showNavigation">
        <div>
          {/* Button to navigate back to the '/kicks' route */}
          <button>
            <Link to={`/kicks`}>Back</Link>
          </button>
        </div>

        <div>
          {/* Button to navigate to the 'edit' route for the current kick */}
          <button>
            <Link to={`/kicks/${id}/edit`}>Edit</Link>
          </button>
        </div>
        <div>
          {/* Button to delete the current kick */}
          <button onClick={deleteKick}>Delete</button>
        </div>
      </div>
    </>
  );
}

// Export the KickDetails component
export default KickDetails;
