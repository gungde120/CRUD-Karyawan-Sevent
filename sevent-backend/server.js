const express = require('express');
const karyawanRoutes = require('./app/routes/karyawan.routes');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

// Origin khusus untuk Front-End agar url lain selain ini tidak dapat menggunakan app backend
var corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to gungde120 application." });
});

// routes
app.use('/karyawan', karyawanRoutes);

// port
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});