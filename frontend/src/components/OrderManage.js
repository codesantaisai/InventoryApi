import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UpdateOrders from "./UpdateOrders";
import jsPDF from "jspdf"; // Don't forget to import jsPDF if you're using it

export default function OrderManage() {
  const { id } = useParams();
  const [orders, setOrders] = useState([
    { id: 1, ordername: "jar", supplier: "xyz", Date: "2024-05-18", noOfitems: "300" },
  ]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Added searchQuery state

  const navigate = useNavigate();

  // Fetch orders from the backend when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/orders`);
        console.log("data",response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const editOrder = (order) => {
    setSelectedOrder(order);
    setShowUpdateForm(true);
  };

  const handleSave = async (updatedOrder) => {
    try {
      await axios.put(`http://localhost:5000/api/v1/orders/${updatedOrder.id}`, updatedOrder);
      setOrders((prevOrders) => 
        prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
      );
      setShowUpdateForm(false);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/orders/${orderId}`);
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order: " + error.message);
    }
  };

  // Correctly define filteredOrders with searchQuery filter
  const filteredOrders = orders.filter(order =>
    order.ordername.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Order Management Report", 14, 16);
    const columns = ["Order Name", "Supplier", "Date", "No Of Items"];
    const rows = filteredOrders.map(order => [
      order.ordername,
      order.supplier,
      order.Date,
      order.noOfitems,
    ]);
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 22,
    });
    doc.save("order_report.pdf");
  };

  return (
    <div style={containerStyle}>
      {showUpdateForm ? (
        <UpdateOrders 
          order={selectedOrder} 
          onSave={handleSave} 
          onClose={() => setShowUpdateForm(false)} 
        />
      ) : (
        <div style={tableWrapperStyle}>
          <div style={searchWrapperStyle}>
            <input
              type="text"
              placeholder="Search Orders"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={searchInputStyle} // Add style for search input if needed
            />
            <button onClick={() => {}} style={buttonStyle}>
              Search
            </button>
          </div>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerStyle}>Order Name</th>
                <th style={headerStyle}>Supplier</th>
                <th style={headerStyle}>Date</th>
                <th style={headerStyle}>No Of Items</th>
                <th style={headerStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={cellStyle}>{order.ordername}</td>
                  <td style={cellStyle}>{order.supplier}</td>
                  <td style={cellStyle}>{order.Date}</td>
                  <td style={cellStyle}>{order.noOfitems}</td>
                  <td style={cellStyle}>
                    <button style={buttonStyle} onClick={() => editOrder(order)}>
                      Update
                    </button>
                    <button style={deleteButtonStyle} onClick={() => deleteOrder(order.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={buttonContainerStyle}>
            <button onClick={generateReport} style={reportButtonStyle}>
              Generate Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline styles for layout
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
  padding: '20px',
};

const tableWrapperStyle = {
  backgroundColor: '#fff',
  padding: '10px',
  borderRadius: '10px',
  boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '60%',
  overflowX: 'auto',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left',
  minWidth: '600px',
};

const headerStyle = {
  backgroundColor: '#A02334',
  color: '#fff',
  padding: '10px',
};

const cellStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
};

const buttonStyle = {
  backgroundColor: '#A02334',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  padding: '5px 10px',
  cursor: 'pointer',
};

const deleteButtonStyle = {
  backgroundColor: 'red',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  padding: '5px 10px',
  cursor: 'pointer',
};

const searchInputStyle = {
  padding: '10px',
  marginBottom: '10px',
  width: '100%',
  maxWidth: '250px',
  borderRadius: '5px',
  border: '1px solid #ddd',
};

const searchWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
};

const buttonContainerStyle = {
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'center',
};

const reportButtonStyle = {
  padding: '10px 20px',
  cursor: 'pointer',
  border: 'none',
  backgroundColor: '#A02334',
  color: 'white',
  borderRadius: '5px',
};
