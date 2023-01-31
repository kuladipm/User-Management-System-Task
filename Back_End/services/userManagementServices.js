const fs = require("fs");
const express = require("express");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");
//bcrypt for encrypting password
const bcrypt = require("bcrypt");
const { use } = require("../route/userManagementRoute");
const saltRounds = 10;
//post method controller
exports.postUserDataInJsonFileService = (bodyData) => {
  console.log(bodyData);
  //collected stored json user data and here stored in existUsers variable
  const existUsers = readUserDataFromJsonFile();
  //we get 0 1 2 as gender radio button value based on that we stored actual gender in user data json file
  let genderValue = bodyData.gender;
  let gender;
  if (genderValue === 0) {
    gender = "Male";
  } else if (genderValue === 1) {
    gender = "Female";
  } else {
    gender = "other";
  }
  //we req body parameter stored in userData object
  const userData = {
    id: uuidv4(),
    userName: bodyData.userName,
    lastName: bodyData.lastName,
    email: bodyData.email,
    password: bcrypt.hashSync(bodyData.password, saltRounds),
    gender: gender,
    dateOfBirth: bodyData.dateOfBirth,
    location: bodyData.location,
    address: bodyData.address,
  };
  console.log(userData)
  //validation applied on fields here we used npm validator
  if (
    !validator.isAlpha(userData.userName, "en-US", { ignore: "-" }) &&
    !validator.isEmpty(userData.userName, [])
  ) {
    return {
      success: false,
      error: "full name must be string and not a empty",
    };
  } else if (!validator.isEmail(bodyData.email)) {
    return { success: false, error: "invalid email id" };
  } else if (!validator.isDate(bodyData.dateOfBirth)) {
    return { success: false, error: "invalid date" };
  }
  //    if (userData.userName === null || userData.dateOfBirth===null || userData.email === null|| userData.password ===null||userData.location===null ||userData.address===null) {
  //        return { success: false, error: 'data in user field are missing'}
  //    }

  //here we check unique email if found shows status error if not found we store entire data into json file
  const findExist = existUsers.find((user) => user.email === userData.email);
  if (findExist) {
    return { success: false, error: "email already exist" };
  } else {
    existUsers.push(userData);
    writeUserDataInJsonFile(existUsers);
    console.log(existUsers);
  }
  return {
    success: true,
    body: `Thank You For The Registration ${bodyData.userName}`,
  };
};

//get all data services
exports. getAllUserDataServices = () => {
    //readUserDataFromJsonFile function read and parse json data
    const usersDataObjectArray = readUserDataFromJsonFile();
    return usersDataObjectArray;
  };

  //GET services for specific username data
exports. getSingleUserDataByUserIdServices = (id) => {
    //get username from url
    const userId = id;
    //get the existing user data
    const existUsers = readUserDataFromJsonFile();
    //check if the username exist or not
    const findExist = existUsers.find((element) => element.id === userId);
    if (!findExist) {
      return { success: false, error: "user id not exist" };
    }
    //send specific username data
    return {
        success: true,
        findExist,
      };
  };

  exports. updateUserDataService = (id,bodyData) => {
    //get the username from urls
    const userId =id;
    let genderValue = bodyData.gender;
  let gender;
  if (genderValue === 0) {
    gender = "Male";
  } else if (genderValue === 1) {
    gender = "Female";
  } else {
    gender = "other";
  }
    //get the update data
    const userData = {
        id: uuidv4(),
        userName: bodyData.userName,
        lastName: bodyData.lastName,
        email: bodyData.email,
        password: bcrypt.hashSync(bodyData.password, saltRounds),
        gender: gender,
        dateOfBirth: bodyData.dateOfBirth,
        location: bodyData.location,
        address: bodyData.address,
    };
    const existUsers = readUserDataFromJsonFile();
    const findExist = existUsers.find((element) => element.id === userId);
    if (!findExist) {
      return { success: false, error: "user id not exist", id };
    }
    const updateUser = existUsers.filter((element) => element.id !== userId);
    updateUser.push(userData);
    writeUserDataInJsonFile(updateUser);
    return{ success: true, body: "User data updated successfully !!" };
  };
  //delete single record services
  exports. deleteSingleRecordService = (id) => {
    const userId = id;
    const existUsers = readUserDataFromJsonFile();
    const filterUser = existUsers.filter((element) => element.id !== userId);
    if (existUsers.length === filterUser.length) {
      return {success: false, error: "user id does not exist" };
    }
    //save the filtered data
    writeUserDataInJsonFile(filterUser);
    return{ success: true, msg: "User removed successfully" };
  };

  //delete  all record form json file
exports. deleteAllRecordsService = () => {
    const filterUser = [];
    //save the filtered data
    writeUserDataInJsonFile(filterUser);
    return{ success: true, msg: "all User removed successfully" };
  };
//read the user data from json file
const writeUserDataInJsonFile = (data) => {
  console.log(data);
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync("userDatabase.json", stringifyData);
};

//get the user data from json file
const readUserDataFromJsonFile = () => {
  const jsonData = fs.readFileSync("userDatabase.json");
  return JSON.parse(jsonData);
};
/* util functions ends */
