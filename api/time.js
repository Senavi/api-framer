const fetch = require('node-fetch');

export default async function handler(request, response) {
    try {
        const { searchParams } = new URL(request.url);
        const city = searchParams.get('city');

        console.log('City parameter received:', city);

        if (!city) {
            console.log('No city parameter provided.');
            return response.status(400).json({ error: 'City parameter is required' });
        }

        const apiUrl = `http://worldtimeapi.org/api/timezone/${city}`;
        console.log('Fetching data from:', apiUrl);

        const apiResponse = await fetch(apiUrl);
        console.log('API response status:', apiResponse.status);

        if (!apiResponse.ok) {
            console.log('Failed to fetch time data from API.');
            throw new Error('Failed to fetch time data');
        }

        const timeData = await apiResponse.json();
        console.log('Time data received:', timeData);

        const currentTime = timeData.datetime;
        console.log('Current time:', currentTime);

        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        return response.status(200).json({ city, currentTime });
    } catch (error) {
        console.error('Error during function execution:', error);
        return response.status(500).json({ error: error.message });
    }
}
