import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateItems({ item, onSave, onClose }) {
  const { id } = useParams(); // Get the item ID from the URL parameters
  const navigate = useNavigate(); // for navigation

  const [itemName, setName] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setStock] = useState("");
  const [date, setDate] = useState("");
  const [statusOfItem, setStatusOfItem] = useState("");

  useEffect(() => {
    if (item) {
      setName(item.itemName);
      setCategory(item.category);
      setStock(item.inStock);
      setDate(item.date);
      setStatusOfItem(item.statusOfItem);
    } else {
      // Fetch the existing item details if not passed as a prop
      axios
        .get(`http://localhost:5000/api/v1/stocks/${id}`)
        .then((res) => {
          const fetchedItem = res.data;
          setName(fetchedItem.itemName);
          setCategory(fetchedItem.category);
          setStock(fetchedItem.inStock);
          setDate(fetchedItem.date);
          setStatusOfItem(fetchedItem.statusOfItem);
        })
        .catch((err) => {
          alert("Failed to fetch item details: " + err);
        });
    }
  }, [id, item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedItem = {
      itemName,
      category,
      inStock,
      date,
      statusOfItem,
    };

    // Save the updated item
    axios
      .put(`http://localhost:5000/api/v1/stocks/update/${id}`, updatedItem)
      .then(() => {
        alert("Item updated successfully");
        onSave(updatedItem); // Call onSave with the updated item
        navigate("/");
      })
      .catch((err) => {
        alert("Update failed: " + err);
      });
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <style>{`
        .form-group {
          margin-bottom: 20px;
        }
        .form-label {
          display: block;
          margin-bottom: 10px;
        }
        .form-control {
          width: 100%;
          padding: 5px;
          font-size: 16px;
          border: 1px solid #ccc;
        }
        .btn-container {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
        .btn-primary {
          background-color: #A02334;
          color: #fff;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .btn-primary:hover {
          background-color: #871c2b;
        }
      `}</style>

      <div className="update-items-form">
        <h2>Update Item Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="itemName" className="form-label">
              Item Name
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="itemName"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              value={category}
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="restaurant">Restaurant</option>
              <option value="bar">Bar</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="inStock" className="form-label">
              In-Stock
            </label>
            <input
              type="number"
              value={inStock}
              onChange={(e) => setStock(e.target.value)}
              className="form-control"
              id="inStock"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-control"
              id="date"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              id="status"
              value={statusOfItem}
              className="form-control"
              onChange={(e) => setStatusOfItem(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="in-stock">In-stock</option>
              <option value="out-of-stock">Out-of-stock</option>
              <option value="ordered">Ordered</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="btn-container">
            <button type="submit" className="btn-primary">
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                marginLeft: "10px",
                backgroundColor: "#ccc",
                color: "#333",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
