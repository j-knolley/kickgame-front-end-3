import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function KickEditForm() {
  // Extract the 'id' parameter from the URL
  let { id } = useParams();
  // Get a function to navigate to different routes
  let navigate = useNavigate();
  // Get the API URL from environment variables
  const API = process.env.REACT_APP_API_URL;

  // State to store kick details
  const [kick, setKick] = useState({
    name: "",
    brand: "",
    price: "",
    time: "",
    is_favorite: false,
  });

  // Handler for text input changes
  const handleTextChange = (event) => {
    setKick({ ...kick, [event.target.id]: event.target.value });
  };

  // Handler for checkbox changes
  const handleCheckboxChange = () => {
    setKick({ ...kick, is_favorite: !kick.is_favorite });
  };

  // Effect to fetch kick data from the API when 'id' or 'API' changes
  useEffect(() => {
    axios
      .get(`${API}/kicks/${id}`)
      .then(
        (response) => {
          // Set the retrieved kick data in the state
          setKick(response.data);
        },
        (err) => {
          console.error(err);
          // Navigate to a 'not-found' route if there's an error
          navigate(`/not-found`);
        }
      )
      .catch((c) => console.warn("catch", c));
  }, [id, API]);

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the 'updateKick' function to send updated kick data
    updateKick(kick, id);
  };

  // Function to update kick data via API
  const updateKick = (updatedKick) => {
    axios
      .put(`${API}/kicks/${id}`, updatedKick)
      .then(
        () => {
          // Navigate to the kick details page after successful update
          navigate(`/kicks/${id}`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  // Render the form
  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        {/* Input fields for kick details */}
        <label htmlFor="name">Kick Name:</label>
        <input
          id="name"
          value={kick.name}
          type="text"
          onChange={handleTextChange}
        />
        <label htmlFor="brand">Brand</label>
        <input
          id="brand"
          type="text"
          value={kick.brand}
          onChange={handleTextChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          value={kick.price}
          onChange={handleTextChange}
          placeholder=""
        />

        {/* <label htmlFor="time">Favorite</label>
        <input
          id="time"
          type="text"
          name="time"
          value={kick.time}
          onChange={handleTextChange}
        />
        <label htmlFor="is_favorite">Favorite</label>
        <input
          id="is_favorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={kick.is_favorite}
        /> */}
        
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default KickEditForm;

