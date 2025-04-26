## Inspiration
Planning trips can be stressful and time consuming, with so many options to consider and details to coordinate. We wanted to create a solution that not only simplifies the planning process but also tailors the experience to individual preferences, making travel more accessible and enjoyable for everyone.

## What it does
ItinerAIry takes your trip preferences and sends them to the Gemini API, which gathers relevant travel information like must see destinations, activities, and dining options. Using AI driven analysis and clever itinerary generation prompting, the app tailors the users data to create a detailed, day by day travel plan, providing a personalized trip experience.

## How we built it
We built ItinerAIry using Next.js for the front end, PostgreSQL for database management, and the Gemini API to pull relevant information for trip planning. The app is deployed on Vercel, allowing for fast, scalable performance, and includes authentication through Google and Discord via NextAuth for a smooth user experience.

## Challenges we ran into
A challenge we encountered was getting Gemini to display the response into an ordered table. Initially, we used the json-to-table library to convert the JSON data into a table format, but we faced significant difficulties in customizing the table. As a result, we ended up manually converting the response in a table and ordering that table to ensure it displayed correctly. Another challenge we faced was trying to integrating the Hotel and Flight APIs for a more intuitive app, but the complexity of getting everything to display correctly proved to be a major hurdle. So we decided to instead focus on making our app do best what it was made to do 'make great itineraries'.

## Accomplishments that we're proud of
We’re proud of successfully creating a functional, intuitive AI system that can suggest truly personalized trip itineraries. Were also proud to have managed to implement a clean, user-friendly UI that enhances the planning experience. 

## What we learned
We learned how to optimize prompts, efficiently store user data, work with the Gemini API, integrate APIs into our tech stack, and improve UI design for better accessibility.

## What's next for ItinerAIry
Moving forward, we plan to expand ItinerAIry’s features by incorporating real time updates for hotels, flights, travel conditions, such as weather or transportation delays. We also aim to integrate social sharing capabilities, so users can collaborate on trip planning with friends.
