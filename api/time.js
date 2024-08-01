const fetch = require('node-fetch');

export default async function handler(request, response) {
    try {
        const { searchParams } = new URL(request.url);
        const city = searchParams.get('city');
        
        console.log('City:', city); // Log the city parameter
        
        if (!city) {
            console.log('No city provided'); // Log if no city is provided
            return response.status(400).json({ error: 'City parameter is required' });
        }

        const apiUrl = `http://worldtimeapi.org/api/timezone/${city}`;
        console.log('API URL:', apiUrl); // Log the API URL
        
        const apiResponse = await fetch(apiUrl);
        console.log('API Response Status:', apiResponse.status); // Log the status of the API response

        if (!apiResponse.ok) {
            throw new Error('Failed to fetch time data');
        }

        const timeData = await apiResponse.json();
        const currentTime = timeData.datetime;
        console.log('Current Time:', currentTime); // Log the current time
        
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        return response.status(200).json({ city, currentTime });
    } catch (error) {
        console.error('Error:', error.message); // Log any errors that occur
        return response.status(500).json({ error: error.message });
    }
}
