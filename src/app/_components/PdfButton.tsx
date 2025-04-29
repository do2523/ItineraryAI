"use client";
import { useState } from "react";
import { ItineraryPDF } from "./MyPDF"; // Assuming the ItineraryPDF component is imported correctly
import ConverttoPDF from "./pdfConverter";

export default function MyButtonComponent({ prompt }: { prompt: string }) {
  // You can create any function you want to call on the button click
  const handleClick = () => {
    // Call the ItineraryPDF function with the prompt
    ConverttoPDF({ prompt });
  };

  return (
    <button
      onClick={handleClick} // Attach the handleClick function to the onClick event
      className="ml-4 rounded-md bg-[#334155] px-6 py-3 font-semibold text-white no-underline transition hover:bg-[#1b2534]"
    >
      Click Me
    </button>
  );
}
