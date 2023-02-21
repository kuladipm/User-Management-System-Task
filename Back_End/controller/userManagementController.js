const express = require("express");
const {
  postUserDataInJsonFileService,
  getAllUserDataServices,
  getSingleUserDataByUserIdServices,
  getPaginationDataServices,
  updateUserDataService,
  deleteSingleRecordService,
  deleteAllRecordsService,
} = require("../services/userManagementServices");
//post method for sending data to json file
const postUserDataInJsonFile = (req, res) => {
  console.log;
  const serviceResponse = postUserDataInJsonFileService(req.body);
  if (serviceResponse.success === true) {
    res.status(200).send(serviceResponse.body);
  } else {
    res.status(400).send(serviceResponse.error);
  }
};
//GET method for getting all data from json file
const getAllUserData = (req, res) => {
  //readUserDataFromJsonFile function read and parse json data
  if(JSON.stringify(req.params) !== "{}"){
    const singleUser = getSingleUserDataByUserIdServices(req.params.email);
    if (singleUser!==false) {
      res.status(200).send(singleUser);
    } else {
      res.status(400).send("error email not found");
    }

  }else{
  const users = getAllUserDataServices();
  res.status(200).send(users);
  }
};

// GET method for pagination data
const getPaginationData = (req, res) => {
  const pagination = getPaginationDataServices(req.query.page,req.query.limit);
    res.status(200).send(pagination);
 
};

//patch method
const updateUserData = (req, res) => {
  const updateServiceResponse = updateUserDataService(req.params.id, req.body);
  if (updateServiceResponse.success === true) {
    res.status(200).send(updateServiceResponse.body);
  } else {
    res.status(400).send(updateServiceResponse.body);
  }
};

//delete  one record form json file
const deleteSingleRecord = (req, res) => {
  const deleteServiceResponse = deleteSingleRecordService(req.params.id);
  if (deleteServiceResponse.success === true) {
    res.status(200).send(deleteServiceResponse.msg);
  } else {
    res.status(400).send(deleteServiceResponse.error);
  }
};
//delete  all record form json file
const deleteAllRecords = (req, res) => {
  const deleteAllRecordsResponse = deleteAllRecordsService(req.params.id);
  if (deleteAllRecordsResponse.success === true) {
    res.status(200).send(deleteAllRecordsResponse.msg);
  } else {
    res.status(400).send(deleteAllRecordsResponse.error);
  }
};
module.exports = {
  postUserDataInJsonFile,
  getAllUserData,
  getPaginationData,
  updateUserData,
  deleteSingleRecord,
  deleteAllRecords,
};
