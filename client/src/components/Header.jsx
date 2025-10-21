import React from "react";

function Header() {
  return (
    <div className="text-center mb-8">
      {/* Main Title */}
      <h1 className="text-4xl font-bold text-white mb-2">Todo List</h1>

      {/* Subtitle */}
      <p className="text-gray-300">Stay organized and get things done!</p>
    </div>
  );
}

export default Header;
