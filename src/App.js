import { useState, useSyncExternalStore } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
  // For adding Items Global State
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div className="app">
      <Logo />
      {/* onAddItems is just a convention */}
      <Form onAddItems={handleAddItems}></Form>
      <PackingList items={items}></PackingList>
      <Stats></Stats>
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
  console.log(num);

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
function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id}></Item>
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have x items on your list and you already passed X(X%)</em>
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
