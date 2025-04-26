import { api } from '~/trpc/server';

export default async function HotelList() {
  // Fetch hotels using the tRPC API
  const hotels = await (api.offers.getHotels());

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Hotels in New York City</h1>
        <ul className="space-y-4">
          {hotels?.length > 0 ? (
            hotels.map((hotel) => {
              return (
                <li key={hotel.hotelId} className="mb-4 p-6 bg-white rounded-lg shadow-md border border-gray-200 max-w-4xl mx-auto">
                  <p className="text-lg text-gray-800">
                    <strong>Hotel Name:</strong> {hotel.name}
                  </p>
                  <p className="text-lg text-gray-800">
                    <strong>Hotel Chain Code:</strong> {hotel.chainCode}
                  </p>
                  <p className="text-lg text-gray-800">
                    <strong>Location:</strong> {hotel.geoCode.latitude}, {hotel.geoCode.longitude}
                  </p>
                  <p className="text-lg text-gray-800">
                    <strong>Last Update:</strong> {new Date(hotel.lastUpdate).toLocaleDateString()}
                  </p>
                </li>
              );
            })
          ) : (
            <li className="text-black text-center">No hotels available</li>
          )}
        </ul>
      </div>
    </div>
  );
};
