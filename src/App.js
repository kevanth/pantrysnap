import { useState, useEffect } from "react"; 

function App() {
  const [items, setItems] = useState([
  { name: "Milk", quantity: 2, category: "Dairy" },
  { name: "Tissue", quantity: 5, category: "General" },
])
  return (
    <div className="App">
      <header className="App-header">
          <h1>PantrySnap</h1>
          {items.map((item, index) => (
            <div key={index}>
              <h2>{item.name}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>Category: {item.category}</p>
            </div>
          ))}
      </header>
    </div>
  );
}

export default App;
