const fs = require("fs");
//get the user data from json file
exports. readUserDataFromJsonFile = () => {
    const jsonData = fs.readFileSync("userDatabase.json");
    return JSON.parse(jsonData);
  };
  //read the user data from json file
exports. writeUserDataInJsonFile = (data) => {
    console.log(data);
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync("userDatabase.json", stringifyData);
  };
  