const fetch = require('node-fetch');

export default async function handler(request, response) {
    try {
        console.log('Request received:', request.url); // Log the request URL

        const { searchParams } = new URL(request.url);
        const city = searchParams.get('city') || 'Europe/Helsinki';

        console.log('City parameter received:', city); // Log the city parameter

        const apiUrl = `http://worldtimeapi.org/api/timezone/${city}`;
        console.log('Fetching data from:', apiUrl); // Log the API URL

        const apiResponse = await fetch(apiUrl);
        console.log('API response status:', apiResponse.status); // Log the status of the API response

        if (!apiResponse.ok) {
            console.log('Failed to fetch time data from API.');
            throw new Error('Failed to fetch time data');
        }

        const timeData = await apiResponse.json();
        console.log('Time data received:', timeData); // Log the time data

        const currentTime = timeData.datetime;
        console.log('Current time:', currentTime); // Log the current time

        const responseData = {
            message: `The current time in ${city} is ${currentTime}`
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
