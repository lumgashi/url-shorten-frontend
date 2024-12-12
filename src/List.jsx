import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AnchorzUpLogo from "./assets/AnchorzUp.svg";

export default function List() {
  const [links, setLinks] = useState([]); 
  const [newUrl, setNewUrl] = useState(""); 
  const [expiration, setExpiration] = useState("");
  const navigate = useNavigate();

  // Fetch all URLs on initial render
  useEffect(() => {
    async function fetchLinks() {
      try {
        const response = await fetch("http://localhost:5000/api/urls");
        if (response.ok) {
          const data = await response.json();
          setLinks(data);
        } else {
          toast.error("Failed to fetch links. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching links:", error);
        toast.error("Unable to connect to the server.");
      }
    }
    fetchLinks();
  }, []);

  const handleShorten = async () => {
    // Converting minutes/hours to milliseconds
    const ttlMapping = {
      1: 60000,
      5: 300000,
      30: 1800000,
      60: 3600000,
      300: 18000000,
    };

    const ttl = ttlMapping[expiration] || 60000; 

    try {
      const response = await fetch("http://localhost:5000/api/urls/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ original_url: newUrl, ttl }),
      });

      if (response.ok) {
        const data = await response.json();
        setLinks((prevLinks) => [...prevLinks, data]); 
        setNewUrl(""); 
        setExpiration("");
        toast.success("URL shortened successfully!");
      } else {
        toast.error("Please provide a valid URL.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unable to connect to the server.");
    }
  };

  const handleDelete = async (urlID) => {
    try {
      const response = await fetch(`http://localhost:5000/api/urls/${urlID}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setLinks((prevLinks) =>
          prevLinks.filter((link) => link.urlID !== urlID)
        );
        toast.success("URL deleted successfully!");
      } else {
        toast.error("Failed to delete URL.");
      }
    } catch (error) {
      console.error("Error deleting URL:", error);
      toast.error("Unable to connect to the server.");
    }
  };

  const handleLinkClick = (urlID) => {
    navigate(`/short-url/${urlID}`);
    toast.info("Redirecting to details...");
  };

  return (
    <div className="app" style={{ width: "100%" }}>
      <ToastContainer position="bottom-right" />
      <div className="sidebar">
        <img src={AnchorzUpLogo} alt="AnchorzUp Logo" />
        <h3>My shortened URLs</h3>
        <ul>
          {links.map((link) => (
            <li key={link.urlID}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div onClick={() => handleLinkClick(link.urlID)}>
                  {link.short_url}
                </div>
                <button onClick={() => handleDelete(link.urlID)}>🗑️</button>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#9bb7f4",
                  margin: "5px 0 0",
                }}
              >
                This link has been clicked {link.clicks} times.
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="main">
        <h1>URL Shortener</h1>
        <form className="main-input">
          <input
            type="url"
            required
            placeholder="Paste the URL to be shortened"
            value={newUrl}
            pattern="https://.*"
            onChange={(e) => setNewUrl(e.target.value)}
          />
          <select
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
          >
            <option value="">Add expiration date</option>
            <option value="1">1 minute</option>
            <option value="5">5 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="300">5 hours</option>
          </select>
        </form>
        <button disabled={!newUrl} onClick={handleShorten}>
          Shorten URL
        </button>
      </div>
    </div>
  );
}
