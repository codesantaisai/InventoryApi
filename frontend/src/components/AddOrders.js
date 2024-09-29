import React, { useState } from "react";
import axios from "axios";

export default function AddOrders() {
    const [name, setname] = useState("");
    const [supplier, setsupplier] = useState("");
    const [date, setdate] = useState("");
    const [noOfitems, setnoOfitems] = useState("");

    function sendData(e) {
        e.preventDefault();
        const newOrder = {
            name,
            supplier,
            date,
            noOfitems,
        };
        console.log("test");

        axios
            .post("http://localhost:5000/api/v1/orders/send", newOrder)
            .then(() => {
                console.log("inside");
                alert("Order Added");
                setname("");
                setsupplier("");
                setdate("");
                setnoOfitems("");
            })
            .catch((err) => {
                console.log("error",err);
                alert(err);
            });
    }

    return (
        <div
            style={{
                maxWidth: "800px",
                margin: "40px auto",
                padding: "20px",
                backgroundColor: "#f9f9f9",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
        >
            <style>
                {`
          .form-group {
            margin-bottom: 20px;
          }
          .form-label {
            display: block;
            margin-bottom: 10px;
          }
          .form-control {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
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
            background-color: #23527c;
          }
          .button-container {
            display: flex;
            justify-content: center;
            margin-top: 20px;
          }
        `}
            </style>
            <form onSubmit={sendData}>
                <div className="form-group">
                    <label htmlFor="name" className="form-label">
                        Order Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        onChange={(e) => {
                            setname(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="supplier" className="form-label">
                        Supplier Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="category"
                        onChange={(e) => {
                            setsupplier(e.target.value);
                        }}
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
                        onChange={(e) => {
                            setdate(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="items" className="form-label">
                        No of Items
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="status"
                        onChange={(e) => {
                            setnoOfitems(e.target.value);
                        }}
                    />
                </div>
                <div className="button-container">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
