// Import necessary dependencies from React and React Router
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import different page components
import Edit from "./Pages/Edit"; // Importing the Edit page component
import FourOFour from "./Pages/Four0Four"; // Importing the Four0Four (404) page component
import Home from "./Pages/Home"; // Importing the Home page component
import Index from "./Pages/Index"; // Importing the Index page component
import New from "./Pages/New"; // Importing the New page component
import Show from "./Pages/Show"; // Importing the Show page component

// Import the NavBar component
import NavBar from "./Components/NavBar.js";

// Main component that defines the structure of the app
function App() {
  return (
    <div className="App">
      {/* Set up the React Router */}
      <Router>
        {/* Render the navigation bar */}
        <NavBar />
        <main>
          {/* Define routes for different pages */}
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home page */}
            <Route path="/kicks" element={<Index />} /> {/* Index page */}
            <Route path="/kicks/new" element={<New />} /> {/* New page */}
            <Route path="/kicks/:id" element={<Show />} /> {/* Show page */}
            <Route path="/kicks/:id/edit" element={<Edit />} /> {/* Edit page */}
            <Route path="*" element={<FourOFour />} /> {/* 404 page */}
          </Routes>
        </main>
      </Router>
    </div>
  );
}

// Export the main App component
export default App;
