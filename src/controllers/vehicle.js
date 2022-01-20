const models = require("../models/vehicle");
const response = require("../helpers/response");
const vehicle = {};

vehicle.getall = async (req, res) => {
  try {
    const { query } = req;
    const result = await models.getAllPaginated(query);
    console.log(result);
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

vehicle.search = async (req, res) => {
  try {
    const { query } = req;
    let keyword = "%%";
    if (query.name) keyword = `%${query.name}%`;
    const result = await models.search(keyword);
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

vehicle.create = async (req, res) => {
  try {
    const data = req.body;
    const { filename } = req.files[0];
    const image = filename;
    data.image = image;
    const result = await models.create(data);
    return response.success(res, 200, result);
  } catch (error) {
    console.log(error);
    return response.err(res, 500, error);
  }
};

vehicle.delet = async (req, res) => {
  try {
    const result = await models.delet(req.params);
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

vehicle.update = async (req, res) => {
  try {
    const id = req.params;
    const data = req.body;
    const result = await models.update(data, id);
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

vehicle.searchByCategory = async (req, res) => {
  try {
    const data = "";
    const { category } = req.params;
    const { query } = req;
    const result = await models.searchByCategory({ category, query });
    return response.success(res, 200, result);
  } catch (error) {
    console.log(error);
    return response.err(res, 500, error);
  }
};

vehicle.vehicleImg = async (req, res) => {
  try {
    const photos = req.files;
    console.log(photos);
    const { id } = req.params;
    console.log(id);
    let dataImg = [];
    for (let i = 0; i < photos.length; i++) {
      dataImg += photos[i].filename + " ";
    }
    console.log(dataImg);
    const result = await models.vehicleImg(dataImg, id);
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

vehicle.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await models.getById(id);
    return response.success(res, 200, result);
  } catch (error) {
    return response.err(res, 500, error);
  }
};

module.exports = vehicle;
