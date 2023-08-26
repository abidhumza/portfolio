import React from "react";
import { Tilt } from "react-tilt";

const CustomAlert = ({ visible, onClose, isError, onReset }) => {
  if (!visible) {
    return null; // If not visible, don't render anything
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <Tilt // Wrap the content with the Tilt component
        className={`Tilt bg-white rounded-lg p-4 w-64 ${
          isError ? "bg-red-200" : "bg-white"
        } shadow-lg transform hover:shadow-xl transition-transform duration-300`}
        options={{
          max: 45,
          scale: 1,
          perspective: 1000,
          speed: 450,
        }} // Tilt options
      >
        <p
          style={{ color: isError ? "black" : "gray" }} // Set color based on error
          className="text-600"
        >
          {isError
            ? "Sorry, something went wrong. Please try again later."
            : "Thank you. I will get back to you as soon as possible."}
        </p>
        <button
          onClick={() => {
            onClose();
            onReset();
          }}
          className={`mt-4 ${isError ? "bg-red-500" : "bg-blue-500"} hover:${
            isError ? "bg-red-600" : "bg-blue-600"
          } text-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`}
        >
          OK
        </button>
      </Tilt>
    </div>
  );
};

export default CustomAlert;
