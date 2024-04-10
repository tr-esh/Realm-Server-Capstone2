require('dotenv').config()
const express = require ('express')
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
const app = express();
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2;

//setup mongoose connection ZSt6kE8TzgVq92jt
mongoose.set('strictQuery', true)
const mongodbConnString = "mongodb+srv://realmadmin:ZSt6kE8TzgVq92jt@realmcluster.ole0mns.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongodbConnString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,})

mongoose.connection.on("error", function(error) {
    console.log(error)
})

mongoose.connection.on("open", function() {
    console.log("Successfully established connection.")
})

const bodyParser = require('body-parser')

//configuration cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//cron job for mode
const triggerGetAllMode = require('./controllers/modeController');
const triggerCalculateWQI = require('./controllers/wqiController');
const triggerPredictionWQI = require('./controllers/wqiPrediction');

//checks IP address
const os = require('os');
const path = require('path');
const interfaces = os.networkInterfaces();

let ip_address;

for (let k in interfaces) {
    for (let k2 in interfaces[k]) {
        let address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            ip_address = address.address;
            break;
        }
    }
}
console.log(ip_address);

const whitelist = [
    'http://localhost:8080',
    'http://localhost:3000',
    'https://www.realm-server.com'
];

const corsOption = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
            console.log(origin, 'is allowed by CORS')
        } else {
            console.log(origin, 'is blocked by CORS');
        }
    },
    credentials: true,
};

app.use(cors())

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use(require("./routes/userRoutes"))
app.use('/api/realm', userRoutes)

//directory for server 
const rootDirectory = path.join(__dirname);
console.log(rootDirectory);


//server-client connection
app.use(express.static(path.join(__dirname, "../client/build")))

app.get("*", (req, res) =>
    res.sendFile(
        path.resolve(__dirname, "../", "client", "build", "index.html")
    )
);

//initiate cron job
async function initiateCronJobs() {
    try {
        await triggerGetAllMode.scheduledAccumulationMode();
        await triggerCalculateWQI.scheduledCalculationWQI();
        await triggerPredictionWQI.scheduleModelProcessingAndPrediction();
        console.log('Cron jobs initiated successfully.');
    } catch (error) {
        console.error('Error initiating cron jobs:', error);
    }
}

initiateCronJobs();


//port
app.listen(8080, () => {
    console.log ('Server running!')
})