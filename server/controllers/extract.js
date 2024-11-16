const fs = require('fs');
const { parse } = require('fast-csv');

const csvFilePath = 'consolidated_data.csv'; // Replace with your CSV file path

const extract =  async (req, res) => {
  const { commodity, market, district } = req.body;

  if (!commodity || !market || !district) {
    return res.status(400).json({ error: 'commodity, market, and district are required.' });
  }

  const groupKey = `${commodity}_${market}_${district}`;
  const groupedData = {};

  try {
    // Parse CSV file
    const stream = fs.createReadStream(csvFilePath).pipe(parse({ headers: true }));

    stream.on('data', (row) => {
      const { Commodity, Market, District, Arrival_Date, Modal_Price } = row;

      console.log("Given input today "+commodity+" MArket: "+market);
      console.log(District.toLowerCase()+" "+Market.toLowerCase());
      // Check if the row matches the requested group
      if (
        Commodity.toLowerCase() === commodity.toLowerCase() &&
        Market.toLowerCase() === market.toLowerCase() &&
        District.toLowerCase() === district.toLowerCase() &&
        Arrival_Date &&
        Modal_Price
      ) {
        if (!groupedData[groupKey]) {
          groupedData[groupKey] = [];
        }
        groupedData[groupKey].push({ Arrival_Date, Modal_Price });
      }
    });

    stream.on('end', () => {
      if (!groupedData[groupKey]) {
        return res.status(404).json({ message: 'No data found for the given criteria.' });
      }
      console.log(groupedData[groupKey])
      res.json(groupedData[groupKey]);
    });

    stream.on('error', (error) => {
      console.error('Error reading CSV file:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = extract;