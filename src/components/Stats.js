export default function Stats({ items }) {
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
