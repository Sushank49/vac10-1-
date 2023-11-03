import { click } from "@testing-library/user-event/dist/click";
import { useState, useSyncExternalStore } from "react";

export default function App() {
  // For adding Items Global State
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  // for deleting items
  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // for updating items (checkbox)
  function handleUpdateItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      {/* onAddItems is just a convention */}
      <Form onAddItems={handleAddItems}></Form>
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onUpdateItems={handleUpdateItems}
      ></PackingList>
      <Stats items={items}></Stats>
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

// For getting the data from the user
function Form({ onAddItems }) {
  const [description, setDecsrciption] = useState("");
  const [num, setNum] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, num, packed: false, id: Date.now() };
    setDecsrciption("");
    setNum(1);

    onAddItems(newItem);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={num} onChange={(e) => setNum(Number(e.target.value))}>
        {/* Array.from look into MDN if confustion */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        // e.target means *this* component and the value means the input
        // onChange is to update the state when the value is changed
        onChange={(e) => setDecsrciption(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

// Showing information to the user
function PackingList({ items, onDeleteItems, onUpdateItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onUpdateItems={onUpdateItems}
          ></Item>
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItems, onUpdateItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onClick={() => {
          onUpdateItems(item.id);
        }}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.num} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const total = items.length;
  const packed = items.filter((item) => item.packed === true).length;
  const perc = Math.round((packed / total) * 100);

  return (
    <footer className="stats">
      {total > 0 ? (
        <em>
          💼 You have {total} {items.length >= 2 ? "items" : "item"} on your
          list and you already packed {packed + " "}({perc}%)
        </em>
      ) : (
        <em>Start adding some items to your packing list 🚀</em>
      )}
      <p>
        &copy; {new Date().getFullYear()} Jonas Schmedtmann(From the React
        course), Programmer:{" "}
        <a target="_blank" href="https:\\www.github.com/Sushank49">
          Sushank Dhungana
        </a>
      </p>
    </footer>
  );
}
