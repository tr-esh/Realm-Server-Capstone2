const Station = require('../models/stationModel'); 
const TemperatureReading = require('../models/temperatureModel');
const TurbidityReading = require('../models/turbidityModel');
const PhReading = require('../models/phLevelModel');
const DeletedStation = require('../models/deletedStation');
const WQIValues = require('../models/wqiModel');
const DeletedParameterModel = require('../models/deletedParameterData');

// Function to get all stations
const getAllStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getStationProvider = async (req, res) => {
  try {
    // Fetch all stations
    const stations = await Station.find();

    // Fetch all WQI values
    const wqiValues = await WQIValues.find();

    // Create a map for faster lookup of status by stationId
    const statusMap = {};
    wqiValues.forEach(wqiValue => {
      statusMap[wqiValue.stationId] = wqiValue.status;
    });

    // Iterate through each station and add status if available
    const stationsWithStatus = stations.map(station => {
      const status = statusMap[station.stationName];
      return { ...station.toObject(), status }; 
    });

    // Send the modified stations array with status added
    res.json(stationsWithStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function to get a specific station by ID
const getStationById = async (req, res) => {
  const { id } = req.params;
  try {
    const station = await Station.findById(id);
    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }
    res.json(station);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Function for StationSort Options
const getAvailableStations = async () => {
  try {
      const stations = await Station.find({}, 'stationName');
      return stations.map(station => ({ value: station.stationName, label: station.stationName }));
  } catch (error) {
      console.error('Error fetching available stations:', error);
      throw error;
  }
};

const handleAvailableStationsRequest = async (req, res) => {
  try {
    const availableStations = await getAvailableStations();
    res.json(availableStations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



//Function for getting lastest data of each parameters
const fetchLatestParameterData = async (req, res) => {
  try {
    // Assuming you have a station ID in the request parameters
    const { stationId } = req.params;
    const decodedStationId = decodeURIComponent(stationId);
    
    // Fetch the latest temperature reading for the given station
    const latestTemperatureReading = await TemperatureReading.findOne(
      { station_id: stationId },
      {},
      { sort: { 'createdAt': -1 } }
    );

    // Fetch the latest turbidity reading for the given station
    const latestTurbidityReading = await TurbidityReading.findOne(
      { station_id: stationId },
      {},
      { sort: { 'createdAt': -1 } }
    );

    // Fetch the latest pH reading for the given station
    const latestPhReading = await PhReading.findOne(
      { station_id: stationId },
      {},
      { sort: { 'createdAt': -1 } }
    );

    // Construct the response based on available data
    const response = {};

    if (latestTemperatureReading) {
      response.temperature = {
        paramName: latestTemperatureReading.paramName,
        paramValue: latestTemperatureReading.paramValue,
        parameterScript: 'measured by degree celsius',
        unit: '°C',
      };
    }

    if (latestTurbidityReading) {
      response.turbidity = {
        paramName: latestTurbidityReading.paramName,
        paramValue: latestTurbidityReading.paramValue,
        parameterScript: 'measured by ntu',
        unit: 'ntu',
      };
    }

    if (latestPhReading) {
      response.pH = {
        paramName: latestPhReading.paramName,
        paramValue: latestPhReading.paramValue,
        parameterScript: 'measured by pH level',
        unit: 'pH',
      };
    }

    // Check if no data is available
    if (Object.keys(response).length === 0) {
      return res.status(404).json({ error: 'Parameter data not found for the specified station' });
    }

    // Return the constructed response
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const fetchStationParameterData = async (station) => {
  const stationId = station._id.toString();

  // Fetch all temperature readings for the given station
  const allTemperatureReadings = await TemperatureReading.find({ station_id: stationId });

  // Fetch all turbidity readings for the given station
  const allTurbidityReadings = await TurbidityReading.find({ station_id: stationId });

  // Fetch all pH readings for the given station
  const allPhReadings = await PhReading.find({ station_id: stationId });

  const parameterData = {};

  if (allTemperatureReadings.length > 0) {
    parameterData.temperature = allTemperatureReadings.map(reading => ({
      paramName: reading.paramName,
      paramValue: reading.paramValue,
      parameterScript: 'measured by degree celsius',
      unit: '°C',
      createdAt: reading.createdAt, 
    }));
  }

  if (allTurbidityReadings.length > 0) {
    parameterData.turbidity = allTurbidityReadings.map(reading => ({
      paramName: reading.paramName,
      paramValue: reading.paramValue,
      parameterScript: 'measured by ntu',
      unit: 'ntu',
      createdAt: reading.createdAt, 
    }));
  }

  if (allPhReadings.length > 0) {
    parameterData.pH = allPhReadings.map(reading => ({
      paramName: reading.paramName,
      paramValue: reading.paramValue,
      parameterScript: 'measured by pH level',
      unit: 'pH',
      createdAt: reading.createdAt, 
    }));
  }

  return parameterData;
};

//Functions that handle removing of station and parameter data from main DB to sub DB
const deleteStation = async (req, res) => {
  const { stationId } = req.params;
  const decodedStationId = decodeURIComponent(stationId);

  try {
    // Find the station in the Station collection
    const station = await Station.findOne({ stationName: decodedStationId });

    if (!station) {
      return res.status(404).json({ message: 'Station not found' });
    }

    // Move the station to the DeletedStation collection
    const deletedStation = new DeletedStation({
      ...station.toObject(),
      deletionTimestamp: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    });
    await deletedStation.save();

    // Remove parameter data associated with the station and move them to their respective "deleted" collections
    await moveParameterData(TemperatureReading, stationId);
    await moveParameterData(TurbidityReading, stationId);
    await moveParameterData(PhReading, stationId);

    // Now remove the station from the Station collection
    await Station.findOneAndDelete({ stationName: decodedStationId });

    res.json({ message: 'Station and its parameter data deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const moveParameterData = async (ParameterModel, stationId) => {
  try {
    // Find and delete parameter data associated with the station
    const parameterData = await ParameterModel.find({ station_id: stationId });
    await ParameterModel.deleteMany({ station_id: stationId });

    // Move parameter data to the "deleted" collection
    const deletedParameterData = parameterData.map(data => ({
      ...data.toObject(),
      deletionTimestamp: new Date()
    }));
    await DeletedParameterModel.insertMany(deletedParameterData);
  } catch (error) {
    console.error('Error moving parameter data:', error);
    throw error;
  }
};


// Controller function to get all deleted documents and count of total documents
const getAllDeletedDocuments = async (req, res) => {
  try {
      // Get all documents
      const allDocuments = await DeletedStation.find().lean();

      // Get the total count of documents in the collection
      const totalCount = await DeletedStation.countDocuments();

      // Respond with all documents and the total count
      res.status(200).json({ allDocuments, totalCount });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};

//function for restoration of deleted station and its parameters data stored in the sub DB
const restoreStation = async (req, res) => {
  const { stationId } = req.params;
  const decodedStationId = decodeURIComponent(stationId);

  try {
    // Find the deleted station in the DeletedStation collection
    const deletedStation = await DeletedStation.findOne({ stationName: decodedStationId });

    if (!deletedStation) {
      return res.status(404).json({ message: 'Deleted station not found' });
    }

    // Move the station back to the Station collection
    const restoredStation = new Station(deletedStation.toObject());
    await restoredStation.save();

    // Restore parameter data associated with the station
    await restoreParameterData(TemperatureReading, stationId);
    await restoreParameterData(TurbidityReading, stationId);
    await restoreParameterData(PhReading, stationId);

    // Now remove the station from the DeletedStation collection
    await DeletedStation.findOneAndDelete({ stationName: decodedStationId });

    res.json({ message: 'Station and its parameter data restored successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const restoreParameterData = async (ParameterModel, stationId) => {
  try {
    // Find and delete parameter data associated with the station from deleted collections
    const deletedParameterData = await DeletedParameterModel.find({ station_id: stationId });
    await DeletedParameterModel.deleteMany({ station_id: stationId });

    // Restore parameter data to the original collection
    const restoredParameterData = deletedParameterData.map(data => ({
      ...data.toObject(),
      _id: undefined // Remove _id to ensure new document creation
    }));
    await ParameterModel.insertMany(restoredParameterData);
  } catch (error) {
    console.error('Error restoring parameter data:', error);
    throw error;
  }
};

// Function to delete a station form sub DB
const deleteStationPermanently = async (req, res) => {
  try {
      const { stationName } = req.params; 

      // Find the pending station request by ID
      const deletedStation = await DeletedStation.findOne({ stationName: stationName });

      // If the pending station request is not found, return an error
      if (!deletedStation) {
          return res.status(404).json({ error: 'Pending station request not found' });
      }

      // Delete the pending station request from the pending collection
      await deletedStation.remove();

      // Respond with success message
      res.status(200).json({ message: 'Request denied successfully' });

  } catch (error) {
      console.error('Error deleting pending station request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getAllStations,
  getStationProvider,
  getStationById,
  fetchLatestParameterData,
  fetchStationParameterData,
  getAvailableStations,
  handleAvailableStationsRequest,
  deleteStation,
  getAllDeletedDocuments,
  restoreStation,
  deleteStationPermanently
};
