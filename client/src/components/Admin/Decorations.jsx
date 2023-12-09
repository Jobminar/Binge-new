import { useEffect, useState } from "react";
import AddDecorations from "./AddDecorations";
import "bootstrap/dist/css/bootstrap.min.css";

const GetDecorations = () => {
  const [decorations, setDecorations] = useState([]);
  const [error, setError] = useState(null);
  const [isAddDecorationOpen, setAddDecorationOpen] = useState(false);

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
    } catch (error) {
      console.error("Error fetching decorations:", error.message);
      setError("An error occurred while fetching decorations.");
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
    <div className="container mt-4">
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
          {decorations.map((decoration, index) => (
            <tr key={index}>
              <td>{decoration.decorationName}</td>
              <td>{decoration.price}</td>
              <td>
                {decoration.image && (
                  <img
                    src={`data:image/png;base64,${btoa(
                      String.fromCharCode.apply(
                        null,
                        new Uint8Array(decoration.image.data)
                      )
                    )}`}
                    alt={decoration.decorationName || "Decoration Image"}
                    className="img-thumbnail"
                  />
                )}
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetDecorations;
