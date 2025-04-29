// Import necessary modules
import { PDFDownloadLink } from "@react-pdf/renderer"; // For generating a downloadable PDF link
import { useEffect, useState } from "react"; // React hooks
import { ItineraryPDF } from "./MyPDF"; // Custom component that defines the PDF structure

// Define the ConverttoPDF component
export default function ConverttoPDF({ prompt }: { prompt: string }) {
  // State to hold the parsed JSON response
  const [jsonResponse, setJsonResponse] = useState<any>(null);

  // useEffect hook runs whenever the 'prompt' prop changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Attempt to parse a portion of the prompt string into JSON
        const json = JSON.parse(prompt.slice(8, prompt.length - 4));
        setJsonResponse(json); // Store the parsed JSON in state
      } catch (error) {
        console.error("Error parsing JSON:", error);
        setJsonResponse(null); // Reset state on error
      }
    };
    fetchData();
  }, [prompt]);

  // If JSON parsing hasn't completed yet, show a loading message
  if (jsonResponse == null) {
    return <div>Loading...</div>;
  }

  // Render a PDF download link using the parsed JSON data
  return (
    <PDFDownloadLink
      document={<ItineraryPDF data={jsonResponse} />}
      fileName="itinerary.pdf"
      className="ml-4 rounded-md bg-[#334155] px-6 py-3 font-semibold text-white no-underline transition hover:bg-[#1b2534]"
    >
      Download PDF
    </PDFDownloadLink>
  );
}
