import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import UpdateItems from "../UpdateItems"; // Ensure the path is correct

export default function StockManage() {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const navigate = useNavigate();

  // Fetch items from the backend when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/stocks/all`);
        setItems(response.data.data); // Adjust to match the structure of your response
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const editItem = (item) => {
    navigate(`/update-items/${id}`);
    setSelectedItem(item);
    setShowUpdateForm(true);
  };

  const handleSave = async (updatedItem) => {
    try {
      await axios.put(`http://localhost:5000/api/stocks/${updatedItem.stockId}`, updatedItem);
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
      setShowUpdateForm(false);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/stocks/delete/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item: " + error.message);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Stock Management Report", 14, 16);
    const columns = ["Item Name", "Category", "In Stock", "Date", "Status"];
    const rows = filteredItems.map(item => [
      item.itemName,
      item.category,
      item.inStock,
      item.Date,
      item.statusOfItem,
    ]);
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 22,
    });
    doc.save("stock_report.pdf");
  };

  return (
    <div style={containerStyle}>
      <div style={searchWrapperStyle}>
        <SearchBar onSearch={(query) => setSearchQuery(query)} />
      </div>

      {showUpdateForm ? (
        <UpdateItems 
          item={selectedItem} 
          onSave={handleSave} 
          onClose={() => setShowUpdateForm(false)} 
        />
      ) : (
        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerStyle}>Item Name</th>
                <th style={headerStyle}>Category</th>
                <th style={headerStyle}>In Stock</th>
                <th style={headerStyle}>Date</th>
                <th style={headerStyle}>Status</th>
                <th style={headerStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={cellStyle}>{item.itemName}</td>
                  <td style={cellStyle}>{item.category}</td>
                  <td style={cellStyle}>{item.inStock}</td>
                  <td style={cellStyle}>{item.date}</td>
                  <td style={cellStyle}>{item.statusOfItem}</td>
                  <td style={cellStyle}>
                    <button style={buttonStyle} onClick={() => editItem(item)}>
                      Update
                    </button>
                    <button style={deleteButtonStyle} onClick={() => deleteItem(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={buttonContainerStyle}>
        <button onClick={generateReport} style={reportButtonStyle}>
          Download Report
        </button>
      </div>
    </div>
  );
}

// Add the missing styles below the component
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
  padding: '20px',
};

const searchWrapperStyle = {
  marginBottom: '20px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
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
  padding: '8px',
  backgroundColor: '#f2f2f2',
  borderBottom: '2px solid #ddd',
};

const cellStyle = {
  padding: '8px',
  whiteSpace: 'nowrap',
};

const buttonStyle = {
  marginRight: '8px',
  padding: '5px 12px',
  cursor: 'pointer',
  border: 'none',
  backgroundColor: '#A02334',
  color: 'white',
  borderRadius: '5px',
};

const deleteButtonStyle = {
  padding: '5px 12px',
  cursor: 'pointer',
  border: 'none',
  backgroundColor: '#A02334',
  color: 'white',
  borderRadius: '5px',
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
