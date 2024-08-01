export default async function handler(request, response) {
  try {
      const responseData = {
          message: "Hello World"
      };

      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
      response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      return response.status(200).json(responseData);
  } catch (error) {
      console.error('Error during function execution:', error);
      return response.status(500).json({ error: error.message });
  }
}
