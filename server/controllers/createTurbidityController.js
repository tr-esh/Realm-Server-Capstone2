const UserData = require('../models/userModel')
const TurbidityReading = require('../models/turbidityModel')

const handleTurbidityData = async (req, res) => {
    try {
      // Receive data from the request body
      const { stationName, tester, paramName, paramValue } = req.body;
  
      // Fetch the most recent user data entry
      const latestUserData = await UserData.findOne({}, {}, { sort: { 'createdAt': -1 } });
  
      // Use the saved user data to complete temperature reading
      const turbidityData = {
        station_id: latestUserData.stationName,
        tester_id: latestUserData.tester,
        paramName: paramName, 
        paramValue: paramValue,
      };
  
      // Save temperature reading to TemperatureReading model
      await TurbidityReading.create(turbidityData);
  
      res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  module.exports = { handleTurbidityData }