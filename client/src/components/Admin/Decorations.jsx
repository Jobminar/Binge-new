import React, { useEffect, useState } from "react";
import AddDecorations from "./AddDecorations";
import "bootstrap/dist/css/bootstrap.min.css";

const GetDecorations = () => {
  const [decorations, setDecorations] = useState([]);
  const [error, setError] = useState(null);
  const [isAddDecorationOpen, setAddDecorationOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/getdecorations");

      if (!response.ok) {
        throw new Error(
          `Failed to fetch decorations. Status: ${response.status}`
        );
      }

      const jsonData = await response.json();
      setDecorations(jsonData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching decorations:", error.message);
      setError("An error occurred while fetching decorations.");
      setLoading(false);
    }
  };

  const handleDeleteDecoration = async (decorationId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/decorations/${decorationId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchData();
      } else {
        console.error(
          `Failed to delete decoration with ID ${decorationId}. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error deleting decoration:", error.message);
    }
  };

  const handleAddDecoration = () => {
    setAddDecorationOpen(true);
  };

  const handleCloseAddDecoration = () => {
    setAddDecorationOpen(false);
    fetchData();
  };

  return (
    <div  className="container mt-4">
      <h2 className="text-center mb-4">Decorations</h2>
      {error && <p className="alert alert-danger">Error: {error}</p>}

      {isAddDecorationOpen && (
        <div
          className="custom-window-overlay"
          onClick={handleCloseAddDecoration}
        >
          <div className="custom-window" onClick={(e) => e.stopPropagation()}>
            <span
              className="custom-window-close"
              onClick={handleCloseAddDecoration}
            >
              &times;
            </span>
            <h3 className="mb-4">Add New Decoration</h3>
            <AddDecorations onClose={handleCloseAddDecoration} />
          </div>
        </div>
      )}

      <button className="btn btn-primary mb-3" onClick={handleAddDecoration}>
        Add Decoration
      </button>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {!loading && !error && decorations.length > 0 ? (
            decorations.map((decoration) => (
              <tr key={decoration._id}>
                <td>{decoration.decorationName}</td>
                <td>${decoration.price}</td>
                <td style={{width:"30%",height:"30%"}}>
                  

<img style={{ width: "100%", height: '100%' }} src={`data:image/jpeg;base64,${decoration.image}`} alt={decoration.decorationName} />
            
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteDecoration(decoration._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                {loading ? "Loading..." : "No decorations available."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GetDecorations;
