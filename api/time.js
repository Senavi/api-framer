export default async function handler(request, response) {
  try {
      console.log('Request received:', request.url); // Log the request URL

      const responseData = {
          message: "Hello World"
      };

      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
      response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      console.log('Response data:', responseData); // Log the response data

      return response.status(200).json(responseData);
  } catch (error) {
      console.error('Error during function execution:', error); // Log any errors
      return response.status(500).json({ error: error.message });
  }
}
