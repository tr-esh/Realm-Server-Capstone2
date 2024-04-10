const UserData = require('../models/userModel')
const PhReading = require('../models/phLevelModel')

const handlePhData = async (req, res) => {
    try {
      // Receive data from the request body
      const { stationName, tester, paramName, paramValue } = req.body;
  
      // Fetch the most recent user data entry
      const latestUserData = await UserData.findOne({}, {}, { sort: { 'createdAt': -1 } });
  
      // Use the saved user data to complete temperature reading
      const PhData = {
        station_id: latestUserData.stationName,
        tester_id: latestUserData.tester,
        paramName: paramName,  
        paramValue: paramValue,  
      };
  
      // Save temperature reading to TemperatureReading model
      await PhReading.create(PhData);
  
      res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  module.exports = { handlePhData }