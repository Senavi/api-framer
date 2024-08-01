export default {
  async fetch(request, env, ctx) {
      // Parse the URL and extract the 'city' parameter
      const url = new URL(request.url);
      const city = url.searchParams.get('city');

      // Check if the 'city' parameter is provided
      if (!city) {
          return new Response(JSON.stringify({ error: 'City parameter is required' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
          });
      }

      try {
          // Fetch the current time for the specified city from World Time API
          const apiUrl = `http://worldtimeapi.org/api/timezone/${city}`;
          const apiResponse = await fetch(apiUrl);
          const timeData = await apiResponse.json();

          // Prepare the response data
          const responseData = JSON.stringify({
              city: city,
              currentTime: timeData.datetime,
          });

          // Set CORS headers
          const headers = new Headers();
          headers.set('Access-Control-Allow-Origin', '*');
          headers.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
          headers.set('Access-Control-Allow-Headers', 'Content-Type');

          // Return the response
          return new Response(responseData, { headers });
      } catch (error) {
          // Handle any errors that occur during the fetch
          return new Response(JSON.stringify({ error: 'Failed to fetch time data' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
          });
      }
  }
}
