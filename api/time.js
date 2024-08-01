const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const response = await fetch('http://worldtimeapi.org/api/timezone/Europe/Helsinki');
    const data = await response.json();
    console.log(data.datetime);

    res.status(200).json({ datetime: data.datetime });
  } catch (error) {
    console.error('Error fetching datetime:', error);
    res.status(500).json({ error: 'Failed to fetch datetime' });
  }
};
