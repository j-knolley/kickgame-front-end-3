import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Get the API URL from environment variables
const API = process.env.REACT_APP_API_URL;

// React component for creating a new kick entry
function KickNewForm() {
  // Get a function to navigate to different routes
  let navigate = useNavigate();
  // State to manage submission errors
  const [submitError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // State to manage kick details
  const [kick, setKick] = useState({
    name: "",
    brand: "",
    releaseDate: "",
    price: "",
    is_favorite: false,
  });

  // Function to send a POST request to add a new kick
  const addKick = (newKick) => {
    axios
      .post(`${API}/kicks`, newKick)
      .then(
        (response) => {
          // Navigate to the list of kicks after successful addition
          navigate(`/kicks`);
          setError(false);
        },
        (error) => {
          console.error(error);
          // Set error state and error message on API error
          setError(true);
          setErrorMessage(error);
        }
      )
      .catch((c) => console.warn("catch", c));
  };

  // Handler for text input changes
  const handleTextChange = (event) => {
    setKick({ ...kick, [event.target.id]: event.target.value });
  };

  // Handler for checkbox changes
  const handleCheckboxChange = () => {
    setKick({ ...kick, is_favorite: !kick.is_favorite });
  };

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the 'addKick' function to send the new kick data
    addKick(kick);
  };

  // Render the form
  return (
    <div className="New">
      {/* Display error message if submission error occurred */}
      {submitError ? <h2>There was an error: {errorMessage.Error}</h2> : null}
      <form onSubmit={handleSubmit}>
        {/* Input fields for kick details */}
        <label htmlFor="name">Kick Name:</label>
        <input
          id="name"
          value={kick.name}
          type="text"
          onChange={handleTextChange}
          required
        />
        <label htmlFor="brand">Brand</label>
        <input
          id="brand"
          type="text"
          value={kick.brand}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="releaseDate">Release Date</label>
        <input
          type="text"
          id="releaseDate"
          name="releaseDate"
          value={kick.releaseDate}
          onChange={handleTextChange}
          placeholder=""
        />
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="text"
          name="price"
          value={kick.price}
          onChange={handleTextChange}
        />
        <label htmlFor="is_favorite">Favorite</label>
        <input
          id="is_favorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={kick.is_favorite}
        />

        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default KickNewForm;
