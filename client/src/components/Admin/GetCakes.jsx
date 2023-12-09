import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PostCakes from "./PostCakes";
const GetCakes = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddCake, setShowAddCake] = useState(false);

  useEffect(() => {
    fetchData();
  }, [showAddCake]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://binge-be.onrender.com/getcakes");

      if (!response.ok) {
        throw new Error(`Failed to fetch cakes. Status: ${response.status}`);
      }

      const jsonData = await response.json();
      setCakes(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError("Failed to fetch cakes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCake = async (cakeId) => {
    try {
      const response = await fetch(
        `https://binge-be.onrender.com/cakes/${cakeId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setCakes((prevCakes) =>
          prevCakes.filter((cake) => cake._id !== cakeId)
        );
      } else {
        console.error(
          `Failed to delete cake with ID ${cakeId}. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error deleting cake:", error.message);
    }
  };

  const handleToggleAddCake = () => {
    setShowAddCake((prev) => !prev);
  };

  const handleCloseAddCake = () => {
    setShowAddCake(false);
    fetchData();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Premium Cakes</h2>

      <button
        type="button"
        className="btn btn-primary mb-3"
        onClick={handleToggleAddCake}
        disabled={loading}
      >
        {showAddCake ? "Cancel Adding Cake" : "Add Cake"}
      </button>

      {showAddCake && (
        <PostCakes onClose={handleCloseAddCake} />
        // Replace "PostCakes" with the actual component for adding cakes.
      )}

      {loading && <p>Loading...</p>}

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <table className="table table-striped mt-3">
        <thead className="text-center">
          <tr>
            <th>Cake Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cakes.map((cake) => (
            <tr key={cake._id}>
              <td>{cake.cakeName}</td>
              <td>{cake.price}</td>
              <td>
                {cake.image && (
                  <img
                    src={`data:${cake.image.contentType};base64,${cake.image.data}`}
                    alt={cake.cakeName}
                    className="cake-image"
                  />
                )}
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteCake(cake._id)}
                  disabled={loading}
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

export default GetCakes;
