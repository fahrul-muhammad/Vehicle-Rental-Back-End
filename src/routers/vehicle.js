const express = require("express");
const vehicleRouter = express.Router();
const controllers = require("../controllers/vehicle");
const valid = require("../middlewares/validate");
const upload = require("../middlewares/upload");

// Get All data Vehicle from database
vehicleRouter.get("/", valid.ValidateRole(["1", "2", "3"]), controllers.getall);
// search by keyword
vehicleRouter.get("/search", valid.ValidateRole(["1", "2", "3"]), controllers.search);
// POST NEW VEHICLE
vehicleRouter.post("/", valid.ValidateRole(["1", "3"]), controllers.create);
// DELET
vehicleRouter.delete("/:id", valid.ValidateRole("1"), controllers.delet);
// UPDATE
vehicleRouter.patch("/update", controllers.update);
// vehicle image
vehicleRouter.post("/vehicle_image", valid.ValidateRole(["1", "3"]), upload.multiUpload, controllers.vehicleImg);
// get all vehicle by category / pathparams
vehicleRouter.get("/:category", valid.ValidateRole(["1", "2", "3"]), controllers.searchByCategory);

module.exports = vehicleRouter;
