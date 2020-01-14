const express = require("express");
const multer = require("multer");
const uploadConfig = require("../src/config/upload");

const SessionController = require("./controllers/SessionController");
const SpotController = require("./controllers/SpotController");
const DashboardController = require("./controllers/DashboardController");
const BookingController = require("./controllers/BookingController");

const routes = express.Router();
const uploadFile = multer(uploadConfig);

//#region session
routes.post('/sessions', SessionController.store);
//#endregion

//#region spot
routes.get('/spots', SpotController.index);
routes.get('/spots/:spot_id', SpotController.indexFindById);
routes.post('/spots', uploadFile.single("thumbnail"), SpotController.store);
routes.post('/spots/:spot_id', uploadFile.single("thumbnail"), SpotController.update);
routes.delete('/spots/:spot_id', SpotController.destroy);
//#endregion

//#region dashboard
routes.get('/dashboard', DashboardController.show);
//#endregion

//#region booking
routes.post('/spots/:spot_id/bookings', BookingController.store);
//#endregion

module.exports = routes;