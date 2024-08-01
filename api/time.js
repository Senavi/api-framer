// api/time.js

const fetch = require('node-fetch');

export default async function handler(req, res) {
    const { city } = req.query;

    if (!city) {
        res.status(400).json({ error: 'City parameter is required' });
        return;
    }

    const apiUrl = `http://worldtimeapi.org/api/timezone/${city}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch time data');
        }

        const timeData = await response.json();
        const currentTime = timeData.datetime;

        res.status(200).json({ city, currentTime });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
