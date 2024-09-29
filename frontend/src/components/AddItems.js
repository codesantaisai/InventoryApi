import React, { useState } from "react";
import axios from "axios";

export default function AddItems({ onItemAdded }) {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState("");
  const [date, setDate] = useState("");
  const [statusOfItem, setStatusOfItem] = useState(""); // Correctly define the state setter

  function sendData(e) {
    e.preventDefault();

    const newItem = {
      itemName,
      category,
      inStock,
      date,
      statusOfItem,
    };

    axios
      .post("http://localhost:5000/api/v1/stocks/send", newItem)
      .then((response) => {
        alert("Item Added");
        onItemAdded(response.data); // Call the function to pass the new item back
        // Reset form fields
        setItemName("");
        setCategory("");
        setInStock("");
        setDate("");
        setStatusOfItem(""); // Reset the status field
      })
      .catch((err) => {
        alert(err);
      });
  }

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

      <form onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Item Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)} // Correct setter usage
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
            onChange={(e) => setCategory(e.target.value)} // Correct setter usage
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="restaurant">Restaurant</option>
            <option value="bar">Bar</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="stock" className="form-label">
            In Stock
          </label>
          <input
            type="number"
            className="form-control"
            id="stock"
            value={inStock}
            onChange={(e) => setInStock(e.target.value)} // Correct setter usage
          />
        </div>

        <div className="form-group">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)} // Correct setter usage
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
            onChange={(e) => setStatusOfItem(e.target.value)} // Correct setter usage
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
