export default async function handler(request, response) {
  try {
      console.log('Request received:', request.url); // Log the request URL

      // Fetch data from the World Time API
      const apiResponse = await fetch('http://worldtimeapi.org/api/timezone/Europe/Helsinki');
      const apiData = await apiResponse.json();

      // Extract time from datetime
      const time = new Date(apiData.datetime).toTimeString().split(' ')[0];
      
      // Create the combined datetime string
      const datetime = new Date(apiData.datetime).toLocaleString();

      // Create the response data object
      const responseData = {
          message: "Hello World",
          number: "192",
          time: time,
          datetime: datetime
      };

      // Set headers for CORS
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
      response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      console.log('Response data:', responseData); // Log the response data

      // Send the response
      return response.status(200).json(responseData);
  } catch (error) {
      console.error('Error during function execution:', error); // Log any errors
      return response.status(500).json({ error: error.message });
  }
}
