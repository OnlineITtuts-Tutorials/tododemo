function FilterButtons({ filter, setFilter }) {
  const filters = ["all", "pending", "completed"];

  return (
    <div className="flex justify-center mb-6 space-x-2">
      {filters.map((type) => (
        <button
          key={type}
          onClick={() => setFilter(type)}
          className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
            filter === type
              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
              : "bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600"
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
