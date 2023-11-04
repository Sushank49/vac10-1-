import { useState } from "react";
import Item from "./Item";

// Showing information to the user
export default function PackingList({
  items,
  onDeleteItems,
  onUpdateItems,
  onDeleteList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy == "input") sortedItems = items;
  if (sortBy == "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy == "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onUpdateItems={onUpdateItems}
            onDeleteList={onDeleteList}
          ></Item>
        ))}
      </ul>
      <div
        className="actions"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <select>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={() => onDeleteList()}>Clear List</button>
      </div>
    </div>
  );
}
