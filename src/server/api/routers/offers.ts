import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
console.log('start')
interface AccessToken {
  type: string;
  username: string;
  application_name: string;
  client_id: string;
  token_type: string;
  access_token: string;
  expires_in: string;
  state: string;
  scope: string;
}

export interface Hotel {
  chainCode: string;
  iataCode: string;
  dupeId: number;
  name: string;
  hotelId: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  address: {
    countryCode: string;
  };
  distance: {
    value: number,
    unit: string,
  }
  lastUpdate: string;
}

interface HotelData {
  data: Hotel[];
}

// First step: Get the Access Token
async function getAccessToken() {
  const url = "https://test.api.amadeus.com/v1/security/oauth2/token";

  // Replace with your actual client_id and client_secret
  const clientId = "PPKaqbe4HDc0KuSRftO3gXvibjphpBGR";
  const clientSecret = "m2k9aBBN5nNBXh0K";

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", clientId);
  params.append("client_secret", clientSecret);

  console.log("Requesting Access Token...");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  };

  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Error fetching access token: ${response.statusText}`);

  const data = (await response.json()) as AccessToken;
  if (!data.access_token) throw new Error("Failed to retrieve access token");

  console.log("Access Token received:", data.access_token);

  return data.access_token;
}

// Second step: Use the access token to get a list of hotels
async function getHotelsInCity(accessToken: string) {
  const cityCode = "TYO"; // IATA code 
  const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=1`;

  console.log("Fetching hotels in Tokyo with token:", accessToken);

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Error fetching hotels in Tokyo: ${response.statusText}`);

  
  const data = await response.json() as HotelData;
  if (!data) throw new Error("Failed to retrieve hotels");

  console.log("Fetched Hotel Data:", data.data);

  return data.data; // Return the list of hotels
}

// Main function for fetching hotels 
async function fetchHotelsInCity() {
  console.log("Starting to fetch hotels in Tokyo...");

  const accessToken = await getAccessToken();
  if (!accessToken) throw new Error("Could not retrieve access token");

  const hotelData = await getHotelsInCity(accessToken);

  console.log("Final Hotel Data to return:", hotelData);

  return hotelData;
}

// Create tRPC router
export const hotelRouter = createTRPCRouter({
  getHotels: publicProcedure.query(async () => {
    // Fetch and return hotel data
    const hotelData = await fetchHotelsInCity();
    if (!hotelData) throw new Error("Failed to fetch hotels");

    console.log("Sending hotel data back to client.");
    return hotelData;
  }),
});
