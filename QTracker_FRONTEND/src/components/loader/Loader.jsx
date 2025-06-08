import React from "react";

const Loader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex space-x-3">
        <div className="w-2 h-8 bg-blue-500 rounded animate-bounce delay-0"></div>
        <div className="w-2 h-8 bg-blue-500 rounded animate-bounce delay-150"></div>
        <div className="w-2 h-8 bg-blue-500 rounded animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default Loader;
