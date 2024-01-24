

// main1

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const multer = require("multer");
// const tf = require("@tensorflow/tfjs-node");
// const mongoose = require("mongoose");
// const Jimp = require("jimp");

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

// // Replace the connection string with your local MongoDB URI
// const mongoDBURI = 'mongodb://localhost:27017/TOH';

// async function connectToDatabase() {
//   try {
//     await mongoose.connect(mongoDBURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to the database");
//   } catch (error) {
//     console.error("Error connecting to the database:", error.message);
//   }
// }

// const reportsSchema = new mongoose.Schema({
//   registration_number: String,
//   Phone_number: String,
//   predictions: [
//     {
//       date: { type: Date, default: Date.now },
//       imageName: String,
//       label: String,
//     },
//   ],
// });

// const Reports = mongoose.model("reports", reportsSchema);

// let model;
// const modelPath = "model.js/model.json";

// // Function to generate the new image name
// function generateImageName(username, predictionArrayLength) {
//   return `${username}${predictionArrayLength + 1}.jpg`;
// }

// async function loadModel() {
//   try {
//     model = await tf.loadLayersModel(`file://${modelPath}`);
//     console.log("Model loaded");
//   } catch (error) {
//     console.error("Error loading the model:", error);
//   }
// }

// connectToDatabase();
// loadModel();

// app.use(cors());

// // Middleware to handle OPTIONS requests
// app.options("/getdb", cors());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "web/public/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// app.get("/", function (req, res) {
//   console.log("got a GET request for the home page");
//   res.send("Welcome to Home page");
// });

// app.post("/uploads", upload.single("image"), async (req, res) => {
//   try {
//     console.log("post req received");
//     console.log(req.file);

//     // Check if registration_number already exists in the database
//     const existingRecord = await Reports.findOne({ registration_number: req.body.Rn });

//     const image = await Jimp.read(req.file.path);
//     await image.resize(128, 128);

//     const processedImageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);

//     const inputTensor = tf.node.decodeImage(processedImageBuffer);
//     const expandedTensor = inputTensor.expandDims();
//     const normalizedTensor = expandedTensor.div(255.0);
//     const reshapedTensor = normalizedTensor.reshape([1, 128, 128, 3]);
//     const predictions = model.predict(reshapedTensor);
//     const label = predictions.dataSync()[0] > 0.5 ? 'normal' : 'cracked';
//     console.log({ label, confidence: predictions.dataSync()[0] * 100 });

//     const imageName = generateImageName(req.body.Rn, existingRecord ? existingRecord.predictions.length : 0);
//     const phoneNumber = req.body.Pn;
//     const regNumber = req.body.Rn;

//     const predictionData = {
//       date: new Date(),
//       imageName: imageName,
//       label: label,
//     };

//     if (existingRecord) {
//       // If the registration_number exists, update the predictions array
//       existingRecord.predictions.push(predictionData);
//       await existingRecord.save();
//       console.log("Updated existing record in the database");
//     } else {
//       // If the registration_number doesn't exist, create a new record
//       const saveToDb = new Reports({
//         registration_number: regNumber,
//         Phone_number: phoneNumber,
//         predictions: [predictionData],
//       });

//       await saveToDb.save();
//       console.log("Saved new record to the database");
//     }

//     // Save the image with the generated name
//     const newPath = `web/public/uploads/${imageName}`;
//     await Jimp.read(req.file.path)
//       .then((image) => image.resize(128, 128))
//       .then((processedImage) => processedImage.write(newPath));

//     res.json({ label, confidence: predictions.dataSync()[0] * 100 });

//   } catch (error) {
//     console.error("Error processing image:", error);
//     res.status(500).json({ error: "Error processing image" });
//   }
// });

// app.get("/getdb", async (req, res) => {
//   console.log("got a get req");
//   try {
//     const data = await Reports.find();
//     console.log("Data from the database:", data);
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get("/getdb/:registrationNumber", async (req, res) => {
//   const { registrationNumber } = req.params;

//   try {
//     const user = await Reports.find({ registration_number: registrationNumber });
//     if (!user || user.length === 0) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get("/search", async (req, res) => {
//   console.log("got a get req");
//   console.log(req.query);

//   const { registrationNumber } = req.query;

//   if (!registrationNumber) {
//     return res.status(400).json({ error: 'Registration number is required' });
//   }

//   try {
//     const data = await Reports.find({ registration_number: registrationNumber });
//     console.log("Data from the database:", data);
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// async function startServer() {
//   await loadModel();
//   const port = 8000;
//   await connectToDatabase();
//   const server = app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
//   });
// }

// startServer();

// server.js main
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const multer = require("multer");
// const tf = require("@tensorflow/tfjs-node");
// const mongoose = require("mongoose");
// const Jimp = require("jimp");

// // Replace the connection string with your local MongoDB URI
// const mongoDBURI = 'mongodb://localhost:27017/TOH';

// async function connectToDatabase() {
//   try {
//     await mongoose.connect(mongoDBURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to the database");
//   } catch (error) {
//     console.error("Error connecting to the database:", error.message);
//   }
// }

// const reportsSchema = new mongoose.Schema({
//   registration_number: String,
//   Phone_number: String,
//   predictions: [
//     {
//       date: { type: Date, default: Date.now },
//       imageName: String,
//       label: String,
//       feedback: String, // Add a field for storing feedback
//     },
//   ],
// });

// const Reports = mongoose.model("reports", reportsSchema);

// let model;
// const modelPath = "model.js/model.json";

// // Function to generate the new image name
// function generateImageName(username, predictionArrayLength) {
//   return `${username}${predictionArrayLength + 1}.jpg`;
// }

// async function loadModel() {
//   try {
//     model = await tf.loadLayersModel(`file://${modelPath}`);
//     console.log("Model loaded");
//   } catch (error) {
//     console.error("Error loading the model:", error);
//   }
// }

// connectToDatabase();
// loadModel();

// app.use(cors());
// app.use(express.json());

// // Middleware to handle OPTIONS requests
// app.options("/getdb", cors());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "web/public/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// app.get("/", function (req, res) {
//   console.log("got a GET request for the home page");
//   res.send("Welcome to Home page");
// });

// app.post("/uploads", upload.single("image"), async (req, res) => {
//   try {
//     console.log("post req received");
//     console.log(req.file);

//     // Check if registration_number already exists in the database
//     const existingRecord = await Reports.findOne({ registration_number: req.body.Rn });

//     const image = await Jimp.read(req.file.path);
//     await image.resize(128, 128);

//     const processedImageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);

//     const inputTensor = tf.node.decodeImage(processedImageBuffer);
//     const expandedTensor = inputTensor.expandDims();
//     const normalizedTensor = expandedTensor.div(255.0);
//     const reshapedTensor = normalizedTensor.reshape([1, 128, 128, 3]);
//     const predictions = model.predict(reshapedTensor);
//     const label = predictions.dataSync()[0] > 0.5 ? 'normal' : 'cracked';
//     console.log({ label, confidence: predictions.dataSync()[0] * 100 });

//     const imageName = generateImageName(req.body.Rn, existingRecord ? existingRecord.predictions.length : 0);
//     const phoneNumber = req.body.Pn;
//     const regNumber = req.body.Rn;

//     const predictionData = {
//       date: new Date(),
//       imageName: imageName,
//       label: label,
//     };

//     if (existingRecord) {
//       // If the registration_number exists, update the predictions array
//       existingRecord.predictions.push(predictionData);
//       await existingRecord.save();
//       console.log("Updated existing record in the database");
//     } else {
//       // If the registration_number doesn't exist, create a new record
//       const saveToDb = new Reports({
//         registration_number: regNumber,
//         Phone_number: phoneNumber,
//         predictions: [predictionData],
//       });

//       await saveToDb.save();
//       console.log("Saved new record to the database");
//     }

//     // Save the image with the generated name
//     const newPath = `web/public/uploads/${imageName}`;
//     await Jimp.read(req.file.path)
//       .then((image) => image.resize(128, 128))
//       .then((processedImage) => processedImage.write(newPath));

//     res.json({ label, confidence: predictions.dataSync()[0] * 100 });

//   } catch (error) {
//     console.error("Error processing image:", error);
//     res.status(500).json({ error: "Error processing image" });
//   }
// });

// app.get("/getdb", async (req, res) => {
//   console.log("got a get req");
//   try {
//     const data = await Reports.find();
//     console.log("Data from the database:", data);
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get("/getdb/:registrationNumber", async (req, res) => {
//   const { registrationNumber } = req.params;

//   try {
//     const user = await Reports.find({ registration_number: registrationNumber });
//     if (!user || user.length === 0) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get("/search", async (req, res) => {
//   console.log("got a get req");
//   console.log(req.query);

//   const { registrationNumber } = req.query;

//   if (!registrationNumber) {
//     return res.status(400).json({ error: 'Registration number is required' });
//   }

//   try {
//     const data = await Reports.find({ registration_number: registrationNumber });
//     console.log("Data from the database:", data);
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // New route for submitting feedback
// app.post("/submitFeedback", async (req, res) => {
//   const { registrationNumber, feedback } = req.body;

//   try {
//     const user = await Reports.findOne({ registration_number: registrationNumber });
//     if (!user || user.predictions.length === 0) {
//       return res.status(404).json({ error: "User not found or no predictions available" });
//     }

//     // Assuming predictions is an array within the user document
//     const latestPrediction = user.predictions[user.predictions.length - 1];
    
//     // Assuming you have a field in the prediction for storing feedback
//     latestPrediction.feedback = feedback;

//     await user.save();
//     res.json({ success: true, message: "Feedback saved successfully" });
//   } catch (error) {
//     console.error('Error saving feedback:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// async function startServer() {
//   await loadModel();
//   const port = 8000;
//   await connectToDatabase();
//   const server = app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
//   });
// }

// startServer();










const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const tf = require("@tensorflow/tfjs-node");
const mongoose = require("mongoose");
const Jimp = require("jimp");

// Replace the connection string with your local MongoDB URI
const mongoDBURI = 'mongodb://localhost:27017/TOH';

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoDBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

const reportsSchema = new mongoose.Schema({
  registration_number: String,
  Phone_number: String,
  predictions: [
    {
      date: { type: Date, default: Date.now },
      imageName: String,
      label: String,
      feedback: String, // Add a field for storing feedback
      predictionQuality: String, // Add a field for storing prediction quality
    },
  ],
});

const Reports = mongoose.model("reports", reportsSchema);

let model;
const modelPath = "model.js/model.json";

// Function to generate the new image name
function generateImageName(username, predictionArrayLength) {
  return `${username}${predictionArrayLength + 1}.jpg`;
}

async function loadModel() {
  try {
    model = await tf.loadLayersModel(`file://${modelPath}`);
    console.log("Model loaded");
  } catch (error) {
    console.error("Error loading the model:", error);
  }
}

connectToDatabase();
loadModel();

app.use(cors());
app.use(express.json());

// Middleware to handle OPTIONS requests
app.options("/getdb", cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "web/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", function (req, res) {
  console.log("got a GET request for the home page");
  res.send("Welcome to Home page");
});

app.post("/uploads", upload.single("image"), async (req, res) => {
  try {
    console.log("post req received");
    console.log(req.file);

    // Check if registration_number already exists in the database
    const existingRecord = await Reports.findOne({ registration_number: req.body.Rn });

    const image = await Jimp.read(req.file.path);
    await image.resize(128, 128);

    const processedImageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    const inputTensor = tf.node.decodeImage(processedImageBuffer);
    const expandedTensor = inputTensor.expandDims();
    const normalizedTensor = expandedTensor.div(255.0);
    const reshapedTensor = normalizedTensor.reshape([1, 128, 128, 3]);
    const predictions = model.predict(reshapedTensor);
    const label = predictions.dataSync()[0] > 0.5 ? 'normal' : 'cracked';
    console.log({ label, confidence: predictions.dataSync()[0] * 100 });

    const imageName = generateImageName(req.body.Rn, existingRecord ? existingRecord.predictions.length : 0);
    const phoneNumber = req.body.Pn;
    const regNumber = req.body.Rn;

    const predictionData = {
      date: new Date(),
      imageName: imageName,
      label: label,
    };

    if (existingRecord) {
      // If the registration_number exists, update the predictions array
      existingRecord.predictions.push(predictionData);
      await existingRecord.save();
      console.log("Updated existing record in the database");
    } else {
      // If the registration_number doesn't exist, create a new record
      const saveToDb = new Reports({
        registration_number: regNumber,
        Phone_number: phoneNumber,
        predictions: [predictionData],
      });

      await saveToDb.save();
      console.log("Saved new record to the database");
    }

    // Save the image with the generated name
    const newPath = `web/public/uploads/${imageName}`;
    await Jimp.read(req.file.path)
      .then((image) => image.resize(128, 128))
      .then((processedImage) => processedImage.write(newPath));

    res.json({ label, confidence: predictions.dataSync()[0] * 100 });

  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Error processing image" });
  }
});

app.get("/getdb", async (req, res) => {
  console.log("got a get req");
  try {
    const data = await Reports.find();
    console.log("Data from the database:", data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/getdb/:registrationNumber", async (req, res) => {
  const { registrationNumber } = req.params;

  try {
    const user = await Reports.find({ registration_number: registrationNumber });
    if (!user || user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/search", async (req, res) => {
  console.log("got a get req");
  console.log(req.query);

  const { registrationNumber } = req.query;

  if (!registrationNumber) {
    return res.status(400).json({ error: 'Registration number is required' });
  }

  try {
    const data = await Reports.find({ registration_number: registrationNumber });
    console.log("Data from the database:", data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// New route for submitting feedback with prediction quality
app.post("/submitFeedback", async (req, res) => {
  const { registrationNumber, feedback, predictionQuality } = req.body;

  try {
    const user = await Reports.findOne({ registration_number: registrationNumber });
    if (!user || user.predictions.length === 0) {
      return res.status(404).json({ error: "User not found or no predictions available" });
    }

    // Assuming predictions is an array within the user document
    const latestPrediction = user.predictions[user.predictions.length - 1];
    
    // Assuming you have a field in the prediction for storing feedback
    latestPrediction.feedback = feedback;
    latestPrediction.predictionQuality = predictionQuality; // Save prediction quality

    await user.save();
    res.json({ success: true, message: "Feedback saved successfully" });
  } catch (error) {
   
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function startServer() {
  await loadModel();
  const port = 8001;
  await connectToDatabase();
  const server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

startServer();









































































// MAINMAINMAIN
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const multer = require("multer");
// const tf = require("@tensorflow/tfjs-node");
// const mongoose = require("mongoose");
// const Jimp = require("jimp");

// // Replace the connection string with your local MongoDB URI
// const mongoDBURI = 'mongodb://localhost:27017/TOH';

// async function connectToDatabase() {
//   try {
//     await mongoose.connect(mongoDBURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to the database");
//   } catch (error) {
//     console.error("Error connecting to the database:", error.message);
//   }
// }

// const reportsSchema = new mongoose.Schema({
//   registration_number: String,
//   Phone_number: String,
//   predictions: [
//     {
//       date: { type: Date, default: Date.now },
//       imageName: String,
//       label: String,
//       feedback: String, // Add a field for storing feedback
//     },
//   ],
// });

// const Reports = mongoose.model("reports", reportsSchema);

// let model;
// const modelPath = "model.js/model.json";

// // Function to generate the new image name
// function generateImageName(username, predictionArrayLength) {
//   return `${username}${predictionArrayLength + 1}.jpg`;
// }

// async function loadModel() {
//   try {
//     model = await tf.loadLayersModel(`file://${modelPath}`);
//     console.log("Model loaded");
//   } catch (error) {
//     console.error("Error loading the model:", error);
//   }
// }

// connectToDatabase();
// loadModel();

// app.use(cors());
// app.use(express.json());

// // Middleware to handle OPTIONS requests
// app.options("/getdb", cors());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "web/public/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// app.get("/", function (req, res) {
//   console.log("got a GET request for the home page");
//   res.send("Welcome to Home page");
// });

// app.post("/uploads", upload.single("image"), async (req, res) => {
//   try {
//     console.log("post req received");
//     console.log(req.file);

//     // Check if registration_number already exists in the database
//     const existingRecord = await Reports.findOne({ registration_number: req.body.Rn });

//     const image = await Jimp.read(req.file.path);
//     await image.resize(128, 128);

//     const processedImageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);

//     const inputTensor = tf.node.decodeImage(processedImageBuffer);
//     const expandedTensor = inputTensor.expandDims();
//     const normalizedTensor = expandedTensor.div(255.0);
//     const reshapedTensor = normalizedTensor.reshape([1, 128, 128, 3]);
//     const predictions = model.predict(reshapedTensor);
//     const label = predictions.dataSync()[0] > 0.5 ? 'normal' : 'cracked';
//     console.log({ label, confidence: predictions.dataSync()[0] * 100 });

//     const imageName = generateImageName(req.body.Rn, existingRecord ? existingRecord.predictions.length : 0);
//     const phoneNumber = req.body.Pn;
//     const regNumber = req.body.Rn;

//     const predictionData = {
//       date: new Date(),
//       imageName: imageName,
//       label: label,
//     };

//     if (existingRecord) {
//       // If the registration_number exists, update the predictions array
//       existingRecord.predictions.push(predictionData);
//       await existingRecord.save();
//       console.log("Updated existing record in the database");
//     } else {
//       // If the registration_number doesn't exist, create a new record
//       const saveToDb = new Reports({
//         registration_number: regNumber,
//         Phone_number: phoneNumber,
//         predictions: [predictionData],
//       });

//       await saveToDb.save();
//       console.log("Saved new record to the database");
//     }

//     // Save the image with the generated name
//     const newPath = `web/public/uploads/${imageName}`;
//     await Jimp.read(req.file.path)
//       .then((image) => image.resize(128, 128))
//       .then((processedImage) => processedImage.write(newPath));

//     res.json({ label, confidence: predictions.dataSync()[0] * 100 });

//   } catch (error) {
//     console.error("Error processing image:", error);
//     res.status(500).json({ error: "Error processing image" });
//   }
// });

// app.get("/getdb", async (req, res) => {
//   console.log("got a get req");
//   try {
//     const data = await Reports.find();
//     console.log("Data from the database:", data);
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get("/getdb/:registrationNumber", async (req, res) => {
//   const { registrationNumber } = req.params;

//   try {
//     const user = await Reports.find({ registration_number: registrationNumber });
//     if (!user || user.length === 0) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.get("/search", async (req, res) => {
//   console.log("got a get req");
//   console.log(req.query);

//   const { registrationNumber } = req.query;

//   if (!registrationNumber) {
//     return res.status(400).json({ error: 'Registration number is required' });
//   }

//   try {
//     const data = await Reports.find({ registration_number: registrationNumber });
//     console.log("Data from the database:", data);
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // New route for submitting feedback
// app.post("/submitFeedback", async (req, res) => {
//   const { registrationNumber, imageName, feedback } = req.body;

//   try {
//     const user = await Reports.findOne({ registration_number: registrationNumber });
//     if (!user || user.predictions.length === 0) {
//       return res.status(404).json({ error: "User not found or no predictions available" });
//     }

//     const selectedPrediction = user.predictions.find((prediction) => prediction.imageName === imageName);
//     if (!selectedPrediction) {
//       return res.status(404).json({ error: "Prediction not found" });
//     }

//     // Update the feedback in the selected prediction
//     selectedPrediction.feedback = feedback;

//     await user.save();
//     res.json({ success: true, message: "Feedback saved successfully" });
//   } catch (error) {
//     console.error('Error saving feedback:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// async function startServer() {
//   await loadModel();
//   const port = 8000;
//   await connectToDatabase();
//   const server = app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
//   });
// }

// startServer();
