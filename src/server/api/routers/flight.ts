import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface AccessToken {
  type: string,
  username: string,
  application_name: string,
  client_id: string,
  token_type: string,
  access_token: string,
  expires_in: string,
  state: string,
  scope: string,
}

interface FlightData {
  data: {
    type: string,
    origin: string,
    destination: string,
    departureDate: string,
    returnDate: string,
    price: {
      total: string,
    },
    links: {
      flightDates: string,
      flightOffers: string,
    }
  }[]
}

// import fetch from "node-fetch"; // or native fetch if in an environment supporting it
// First step: Get the Access Token
async function getAccessToken() {
  const url = 'https://test.api.amadeus.com/v1/security/oauth2/token';

  // Replace with your actual client_id and client_secret
  const clientId = 'PPKaqbe4HDc0KuSRftO3gXvibjphpBGR';
  const clientSecret = 'm2k9aBBN5nNBXh0K';

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params
  };

    const response = await fetch(url, options);
    if(!response) throw new Error(`Error fetching access token:`);

    const data = await response.json() as AccessToken;
    if (!data.access_token) throw new Error('Failed to retrieve access token');

    return data.access_token;
}

// Second step: Use the access token to get a list of flight destinations
async function getFlightDestinations(accessToken: string) {
  const url = 'https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=PAR&maxPrice=200';

  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  };

  const response = await fetch(url, options);
  if(!response) throw new Error(`Error fetching flight destinations: `);

  const data = await response.json() as FlightData;
  if(!data.data) throw new Error('Failed to retrieve flight destinations');

  return data.data; // Return the flight destinations
}

// test
// Main function for fetching flight destinations
async function fetchFlightDestinations() {
  const accessToken = await getAccessToken();
  if (!accessToken)  throw new Error('Could not retrieve access token');

  const flightDestinations = await getFlightDestinations(accessToken);
  
  return flightDestinations;
}

// Create tRPC router
export const flightRouter = createTRPCRouter({
  getFlights: publicProcedure.query(async () => {
    // Fetch and return flight destinations

    const flightData = await fetchFlightDestinations();
    if(!flightData) new Error('Failed to fetch flight destinations');
    
    return flightData;
  }),

  getRecommendedLocations: publicProcedure.query(async () => {
    const accessToken = await getAccessToken();
    if (!accessToken)  throw new Error('Could not retrieve access token');

    const url = 'https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=PAR&maxPrice=200';

    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    };

    const response = await fetch(url, options);
    if(!response) throw new Error(`Error fetching flight destinations: `);

    const data = await response.json() as FlightData;
    if(!data.data) throw new Error('Failed to retrieve flight destinations');

    return data.data; // Return the flight destinations
  })
});
