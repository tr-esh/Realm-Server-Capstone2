// routes/index.js
const express = require("express");
const router = express.Router();
const multer = require('multer');
const { signupUser, loginUser } = require('../controllers/useController');
const stationController = require('../controllers/stationController');
const { startMonitoring, deleteUserData } = require("../controllers/parameterController");
const { getAllStations, getStationProvider, fetchLatestParameterData, fetchStationParameterData, handleAvailableStationsRequest, deleteStation, getAllDeletedDocuments, restoreStation, deleteStationPermanently } = require('../controllers/getstationController');
const { handleUserData } = require("../controllers/createTempController");
const { handleTurbidityData } = require('../controllers/createTurbidityController');
const { handlePhData } = require('../controllers/createPhController');
const { getTemperatureMode, getTurbidityMode, getPhMode, getAllMode } = require("../controllers/modeController");
const { handleActivityLog, handleStationActivityLog, getActivityLogs, getStationLogs } = require("../controllers/activityLogController");
const { handleYearInfoRequest } = require("../controllers/yearController");
const { getDataCountForAllStations, getMonthlyData } = require("../controllers/entryController");
const { approveStationRequest , deletePendingStationRequest } = require("../controllers/adminController")
const { getAllDocuments } = require('../controllers/getDocument')
const { calculateWQIController, identifyStationController, getAllWQIPoorValues } = require('../controllers/wqiController');
const { predictWQI, getWQIPredictions, fetchWQIData } = require('../controllers/predictionWQI');
const { predictNext5DaysWQIForStations, preprocessAndTrainModels } = require("../controllers/wqiPrediction");
const { calculateStationWQI, getModeTemperature, getModeTurbidity, getModePH, wqiCalculationController, getLatestModeDataForEachParameter, calculateWQIForStation  } = require("../controllers/calculateWQI");

// for station creation
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage });

// Login route
router.post('/login', loginUser);

// Sign up route
router.post('/signup', signupUser);

// Create station route
router.post('/createStation', upload.single('stationImage'), stationController);
router.post('/approvePending/:stationId', approveStationRequest);
router.delete('/deletePending/:stationId', deletePendingStationRequest);

// initialization for station data acquisition
router.post('/startMonitoring', startMonitoring);

// station data post route
router.post('/postedTemp', handleUserData);
router.post('/postedTurbidity', handleTurbidityData);
router.post('/postedPh', handlePhData);

// calculate WQI
router.get('/calculateWQI', calculateWQIController);
router.get('/wqiResult', calculateWQIForStation);

//prediction WQI
router.get('/predictionWQI', predictWQI);
router.get('/getWQIPredictions/:stationId', predictNext5DaysWQIForStations);
router.get('/trainData', preprocessAndTrainModels);
router.get('/fetchWQI', fetchWQIData);

//fetch low wqi
router.get('/lowWQI', identifyStationController);

//get mode 
router.get('/modeTemp', getTemperatureMode);
router.get('/modeTurbidity', getTurbidityMode);
router.get('/modePh', getPhMode);
router.get('/paramMode', getAllMode);
router.get('/fetchTempMode', getModeTemperature)
router.get('/fetchTurbidityMode', getModeTurbidity)
router.get('/fetchPhMode', getModePH)
router.get('/getAllMode', getLatestModeDataForEachParameter)

//get request for notification
router.get('/getRequest', getAllDocuments)
router.get('/getPoorWQI', getAllWQIPoorValues)

// activity log - station added
router.get('/activityLog', handleActivityLog);
router.get('/stationActivity', handleStationActivityLog);

// activity log - station added by selected station
router.get('/activityLogs/:stationName', getActivityLogs);
router.get('/stationLogs/:stationName', getStationLogs);

// get all station
router.get('/setStation', getAllStations);
router.get('/provideStation', getStationProvider);

//get all deleted documents
router.get('/getDeletedStation', getAllDeletedDocuments);

//get all station for stationSort
router.get('/stationOptions', handleAvailableStationsRequest);
router.get('/yearOptions', handleYearInfoRequest);
router.get('/monthlyEntry/:stationId/:year', getDataCountForAllStations)
router.get('/monthlyData/:stationId', getMonthlyData)

// get latest parameter readings under selected station
router.get('/latestStationReadings/:stationId', fetchLatestParameterData); 
router.get('/stationReadings/:stationId', fetchStationParameterData)

// reset for station data acquisition
router.delete('/deleteUserData', deleteUserData);

//delete station move to trash bin
router.post('/deleteStation/:stationId', deleteStation);

//delete station permanently
router.delete('/deleteStationDB/:stationName', deleteStationPermanently);

//restore station
router.post('/restoreStation/:stationId', restoreStation);

module.exports = router;

