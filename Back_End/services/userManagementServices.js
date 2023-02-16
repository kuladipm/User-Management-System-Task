const fs = require("fs");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");
//bcrypt for encrypting password
const bcrypt = require("bcrypt");
const { use } = require("../route/userManagementRoute");
const  { readUserDataFromJsonFile,writeUserDataInJsonFile }=require("../model/fileModel");
const saltRounds = 10;
//post method controller
exports.postUserDataInJsonFileService = (bodyData) => {
  console.log(bodyData.gender);
  //collected stored json user data and here stored in existUsers variable
  const existUsers = readUserDataFromJsonFile();
  //we get 0 1 2 as gender radio button value based on that we stored actual gender in user data json file
  let genderValue = bodyData.gender;
  console.log(genderValue)
  let gender;
  if (genderValue === "male") {
    gender = "Male";
  } else if (genderValue === "female") {
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
    address:bodyData.address,
    street:bodyData.street,
    landmark:bodyData.landmark,
    city:bodyData.city,
    state: bodyData.state,
    pin: bodyData.pin,
  };

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
  //here we check unique email if found shows status error if not found we store entire data into json file
  const findExist = existUsers.find((user) => user.email === userData.email);
  if (findExist) {
    return { success: false, error: "email already exist" };
  } else {
    existUsers.push(userData);
    writeUserDataInJsonFile(existUsers);
   
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
exports. getSingleUserDataByUserIdServices = (email) => {
    //get username from url
    console.log(email)
    const userId = email;
    //get the existing user data
    const existUsers = readUserDataFromJsonFile();
    //check if the username exist or not
    const findExist = existUsers.find((element) => element.email === userId);
    if (!findExist) {
      return { success: false, error: "email not exist" };
    }
    //send specific username data
    return {
        success: true,
        findExist,
      };
  };
  //GET method for pagination data
  exports. getPaginationDataServices = (pageValue,limitValue) => {
    console.log(pageValue)
    console.log(limitValue)
    const existUsers = readUserDataFromJsonFile();
        let page = parseInt(pageValue);
        let limit = parseInt(limitValue);
        let totalRecords=existUsers.length
        // calculating the starting and ending index
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        paginationData= existUsers.slice(startIndex, endIndex);
        // return  results;
        return{ paginationData:paginationData, totalRecords:totalRecords,existUsers:existUsers};
        // next();
      };
    

  
  // exports. updateUserDataService = (id,bodyData) => {
  //   //get the username from urls
  //   const userId =id;
  // let genderValue = bodyData.gender;
  // console.log(genderValue)
  // // let gender;
  // if (genderValue === "Male") {
  //   genderValue = "Male";
  // } else if (genderValue ==="Female") {
  //   genderValue = "Female";
  // } else if (genderValue ==="other"){
  //   genderValue = "other";
  // }
  //   //get the update data
  //   const userData = {
  //       id: uuidv4(),
  //       userName: bodyData.userName,
  //       lastName: bodyData.lastName,
  //       email: bodyData.email,
  //       password: bcrypt.hashSync(bodyData.password, saltRounds),
  //       gender: genderValue,
  //       dateOfBirth: bodyData.dateOfBirth,
  //       location: bodyData.location,
  //       address: bodyData.address,
  //   };
  //   const existUsers = readUserDataFromJsonFile();
  //   const findExist = existUsers.find((element) => element.id === userId);
  //   if (!findExist) {
  //     return { success: false, error: "user id not exist", id };
  //   }
  //   const updateUser = existUsers.filter((element) => element.id !== userId);
  //   updateUser.push(userData);
  //   writeUserDataInJsonFile(updateUser);
  //   return{ success: true, body: "User data updated successfully !!" };
  // };

  exports.updateUserDataService = (userId, body) => {
    const existingUser = readUserDataFromJsonFile();
    let id = userId;
    let bodyData = body;
    if (bodyData.userName.trim() === "" || !validator.isAlpha(bodyData.userName) ||
    bodyData.lastName.trim() === "" || !validator.isAlpha(bodyData.lastName) ||
    !validator.isEmail(bodyData.email)) {
      return { success: false, error: `Please Enter Valid Data!`};
    } else {
      let user = existingUser.find((user) => user.id === id);
      if (bodyData.userName ) user.userName = bodyData.userName;
      // if (bodyData.middleName)  user.middleName = bodyData.middleName;
      if (bodyData.lastName)  user.lastName = bodyData.lastName;
      if (bodyData.gender)  user.gender = bodyData.gender;
      if (bodyData.dateOfBirth)  user.dateOfBirth = bodyData.dateOfBirth;
      if (bodyData.email)  user.email = bodyData.email;
      if (bodyData.password)  user.password = bcrypt.hashSync(bodyData.password, 10);
      if (bodyData.address)  user.address = bodyData.address;
      if (bodyData.street)  user.street = bodyData.street;
      if (bodyData.landmark)  user.landmark = bodyData.landmark;
      if (bodyData.city)  user.city = bodyData.city;
      if (bodyData.state)  user.state = bodyData.state;
      if (bodyData.pin)  user.pin = bodyData.pin;
      // if (bodyData.state)  user.state = bodyData.state;
      // if (bodyData.pinCode)  user.pinCode = bodyData.pinCode;
      else {
        return { success: false, body: `Record Not Found!`};
      }
      writeUserDataInJsonFile(existingUser);
      return { success: true, body: `User Data Updated Successfully!` };
    }
  };
  //delete single record services
  exports. deleteSingleRecordService = (id) => {
    const userId = id;
    const existUsers = readUserDataFromJsonFile();
    const filterUser = existUsers.filter((element) => element.id !== userId);
    if (existUsers.length === filterUser.length) {
      return {success: false, error: "user does not exist" };
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
