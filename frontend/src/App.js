import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import AddItems from './components/AddItems';
import StockManage from './components/StockManage';
import UpdateItems from "./UpdateItems";
import AddOrders from './components/AddOrders';
import OrderManage from './components/OrderManage';
import Modal from './Modal'; // Correct the path if needed
// import { SearchBar } from './components/SearchBar'; // Remove if not used
import UpdateOrders from './components/UpdateOrders';

function App() {
  const [someOrder, setSomeOrder] = useState(null);
  const handleClose = () => {
    console.log("Modal closed");
  };

  const handleSave = (updatedOrder) => {
    console.log("Order saved:", updatedOrder);
    setSomeOrder(updatedOrder); // Optional: update state with saved order
  };

  const [results, setResults] = useState({});

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/send" element={<AddItems />} />
          <Route path="/" element={<StockManage />} />
          <Route path="/update-items/:id" element={<UpdateItems />} /> {/* Route to UpdateItems */}
          <Route path="/update-orders/:id" element={<UpdateOrders/>}/>
          <Route path="/orders" element={<AddOrders />} />
          <Route path="/manage" element={<OrderManage />} />
        </Routes>
        {someOrder && (
          <Modal onClose={handleClose} onSave={handleSave} order={someOrder} />
        )}
      </div>
    </Router>
  );
}

export default App;
