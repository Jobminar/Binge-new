import "./navbar.css";
import grid from "../../assets/images/grid.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Handle logic for login, you can add your own implementation here
    navigate("/login");
  };

  return (
    <>
      <div
        className="grid-button"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={grid} alt="grid" />
      </div>
      <div className="nav-con">
        <div
          onClick={() => {
            navigate("/");
          }}
        >
          HOME
        </div>
        <div
          onClick={() => {
            navigate("/aboutus");
          }}
        >
          ABOUT US
        </div>
        <div
          onClick={() => {
            navigate("/gallery");
          }}
        >
          GALLERY
        </div>
        <div
          onClick={() => {
            navigate("/contactus");
          }}
        >
          CONTACT US
        </div>
        <div
          onClick={() => {
            navigate("/blogs");
          }}
        >
          BLOGS
        </div>
        <div
          onClick={() => {
            navigate("/refund");
          }}
        >
          Refund
        </div>
      </div>
    </>
  );
};

export default Navbar;
