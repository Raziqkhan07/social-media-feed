import React from "react";

function FloatingButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-4 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 focus:outline-none"
      style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}
    >
      <span className="text-xl">+</span>
    </button>
  );
}

export default FloatingButton;
