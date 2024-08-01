const fetch = require('node-fetch');

export default async function handler(request, response) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    if (!city) {
        return response.status(400).json({ error: 'City parameter is required' });
    }

    try {
        const apiUrl = `http://worldtimeapi.org/api/timezone/${city}`;
        const apiResponse = await fetch(apiUrl);
        if (!apiResponse.ok) {
            throw new Error('Failed to fetch time data');
        }

        const timeData = await apiResponse.json();
        const currentTime = timeData.datetime;

        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        return response.status(200).json({ city, currentTime });
    } catch (error) {
        return response.status(500).json({ error: error.message });
    }
}
