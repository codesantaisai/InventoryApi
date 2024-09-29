import React, { useState, useEffect } from "react";
// import './Model.css'; 

const Modal = ({ onClose, onSave, order }) => {
  const [updatedOrder, setUpdatedOrder] = useState({
    ordername: "",
    supplier: "",
    date: "", // changed to lowercase
    noOfitems: ""
  });

  useEffect(() => {
    if (order) {
      setUpdatedOrder(order); // Update the state with the passed order
    }
  }, [order]);

  const handleInputChange = (e) => {
    setUpdatedOrder({
      ...updatedOrder,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="modal-overlay"> {/* Use a CSS class for styling */}
      <div className="modal"> {/* Use a CSS class for styling */}
        <h2>Edit Order</h2>
        <div>
          <label>Order Name</label>
          <input
            type="text"
            name="ordername"
            value={updatedOrder.ordername}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Supplier</label>
          <input
            type="text"
            name="supplier"
            value={updatedOrder.supplier}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date" // changed to lowercase
            value={updatedOrder.date} // changed to lowercase
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>No of Items</label>
          <input
            type="number"
            name="noOfitems"
            value={updatedOrder.noOfitems}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={() => onSave(updatedOrder)}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
