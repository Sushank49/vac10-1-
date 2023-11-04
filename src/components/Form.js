import { useState } from "react";
// For getting the data from the user
export default function Form({ onAddItems }) {
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
