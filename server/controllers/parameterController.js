const UserData = require('../models/userModel');

let lastCreatedUserId; // Variable to store the last created user ID

const startMonitoring = async (req, res) => {
  const { stationName, tester } = req.body;

  try {
    // Save user data
    const userData = {
      stationName,
      tester
    };

    // Save user data first
    const createdUser = await UserData.create(userData);

    // Store the created user ID
    lastCreatedUserId = createdUser._id;

    res.status(201).json({ message: 'UserData saved successfully', userId: createdUser._id });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUserData = async (req, res) => {
  try {
    // Delete all user data
    const result = await UserData.deleteMany({});

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'All user data deleted successfully' });
    } else {
      res.status(404).json({ message: 'No user data found to delete' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { startMonitoring, deleteUserData };
