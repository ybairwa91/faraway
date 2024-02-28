import React from "react";
import { useState } from "react";

function App() {
  // STATE
  const [newItem, setNewItem] = useState([]);

  // HANDLER FUNCTIONS
  function handleItem(item) {
    setNewItem((items) => [...items, item]);
  }
  function handleDeleteItems(id) {
    setNewItem((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setNewItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  //JSX
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleItem} />
      <PackingList
        items={newItem}
        onDeleteItem={handleDeleteItems}
        onToggleItem={handleToggleItem}
      />
      <Stats />
    </div>
  );
}

// A component
function Logo() {
  //JSX
  return <h1>🏝️ Far Away 🧳</h1>;
}

//Form ka input package list me dalna hai means packageList change hogi and
//re-render bhi hogi
function Form({ onAddItems }) {
  //States
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  //handler functions
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    let newItem = { description, quantity, package: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);
    //Back to intial stage after hit enter or submit forms
    setQuantity(() => 1);
    setDescription(() => "");
  }

  //return jsx by component
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            key={item.id}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>You have X items in your lists,and You packed X (X%)</em>
    </footer>
  );
}
export default App;
