import { api } from '~/trpc/server';

const FlightOriginsList = async () => {
  const flights = await api.flight.getFlights();

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Flight Origins</h1>
        <ul className="space-y-4">
          {flights?.length > 0 ? (
            flights.map((flight) => {
              return (
                <li key={flight.destination + flight.departureDate + flight.returnDate} className="mb-4 p-6 bg-white rounded-lg shadow-md border border-gray-200 max-w-4xl mx-auto">
                  <p className="text-lg text-gray-800"><strong>Identifier:</strong> {flight.type}</p>
                  <p className="text-lg text-gray-800"><strong>Destination:</strong> {flight.destination}</p>
                  <p className="text-lg text-gray-800"><strong>Start Date:</strong> {flight.departureDate}</p>
                  <p className="text-lg text-gray-800"><strong>End Date:</strong> {flight.returnDate}</p>
                  <p className="text-lg text-gray-800"><strong>Price:</strong> ${flight.price.total}</p>
                </li>
              );
            })
          ) : (
            <li className="text-white text-center">No flights available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FlightOriginsList;



























// import { api } from '~/trpc/server';

// const FlightOriginsList = async () => {
//   const flights: string[] = await api.flight.getFlights(); // Directly fetch the data
//   console.log(flights)
//   // console.log(flights.length)
//   return (
//     <div>
//       <h1>Flight Origins</h1>
//       <ul>
//         {flights?.map((flight, index) => (
//           <li key={index}>{flight}</li> // Display each origin in a list item
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FlightOriginsList;
