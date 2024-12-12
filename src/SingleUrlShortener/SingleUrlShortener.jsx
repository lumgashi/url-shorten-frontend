import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error404 from "../assets/404.jpg";

export default function SingleUrlShortener() {
  const { id } = useParams();
  const hasFetched = useRef(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (hasFetched.current) return; 
    hasFetched.current = true;

    const fetchUrlData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/urls/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.original_url) {

            toast.success("Redirecting to the original URL...");
              window.location.href = data.original_url;
          } else {
            toast.error("No URL found in the response.");
            setError("No URL found in the response.");
          }
        } else if (response.status === 410) {
          toast.warn("This link has expired or been deleted.");
          setError("This link has expired or been deleted.");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
           setError("An unexpected error occurred. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Unable to connect to the server. Please try again.");
      }
    };

    fetchUrlData();
  }, [id]); 

  return (
    <div className="container" style={{ width: "100%", height: "100vh" }}>
      <ToastContainer position="bottom-right" />{" "}
      {error ? (
        <div className="img-wrapper">
          <img src={Error404} alt="Error 404" className="error-image" />
          <Link to={"/"}>Go Back</Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
