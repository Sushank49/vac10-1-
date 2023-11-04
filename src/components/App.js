import { click } from "@testing-library/user-event/dist/click";
import { useState } from "react";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

  function handleDeleteList() {
    const confirmed = window.confirm(
      "You are about to delete the entire packing list. Are you sure you want to continue?"
    );
    if (confirmed) setItems([]);
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
        onDeleteList={handleDeleteList}
      ></PackingList>
      <Stats items={items}></Stats>
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}
