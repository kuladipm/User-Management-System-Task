
const express = require('express')
const userManagementRoute = express.Router()
const { postUserDataInJsonFile, getAllUserData, updateUserData, deleteSingleRecord, getSingleUserDataByUserId,deleteAllRecords } = require('../controller/userManagementController')
//router.use(express.json())
/* Create - POST method */
userManagementRoute.post('/', postUserDataInJsonFile)
/* Read - GET method for specific username data */
userManagementRoute.get('/:id', getSingleUserDataByUserId)
/* Read - GET method  for all data*/
userManagementRoute.get('/', getAllUserData)
/* Update - Patch method */
userManagementRoute.patch('/:id', updateUserData)
/* Delete  - Delete method */
userManagementRoute.delete('/:id', deleteSingleRecord)
/* Delete All data - Delete method */
userManagementRoute.delete('/', deleteAllRecords)
module.exports = userManagementRoute
