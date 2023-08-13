import { Link } from "react-router-dom"; 
// Importing the Link component from react-router-dom library

function Kick({ kick, id }) { 
  // Defining a functional component named Kick, which takes 'kick' and 'id' as props
  return (
    <tr className="Kick"> {/* Creating a table row with the class name 'Kick' */}
      <td>
        {kick.is_favorite ? ( // Conditional rendering: If 'kick.is_favorite' is true, render a star emoji, else render empty space
          <span>⭐️</span>
        ) : (
          <span>&nbsp; &nbsp; &nbsp;</span>
        )}
      </td>
      <td>
        <Link to={`/kicks/${id}`}>{kick.name}</Link> {/* Creating a link to a specific route based on the 'id' prop, displaying 'kick.name' */}
      </td>
      <td>
        <Link to={`/kicks/${id}`}>{kick.brand}</Link> {/* Creating a link to a specific route based on the 'id' prop, displaying 'kick.brand' */}
      </td>
      <td>
        <Link to={`/kicks/${id}`}>{kick.price}</Link> {/* Creating a link to a specific route based on the 'id' prop, displaying 'kick.price' */}
      </td>
    </tr>
  );
}

export default Kick; // Exporting the Kick component as the default export
