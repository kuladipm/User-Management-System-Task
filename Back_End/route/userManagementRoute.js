
const express = require('express')
const userManagementRoute = express.Router()
const { postUserDataInJsonFile, getAllUserData, updateUserData, deleteSingleRecord, getPaginationData} = require('../controller/userManagementController')
//router.use(express.json())
/* Create - POST method */
userManagementRoute.post('/', postUserDataInJsonFile)
/* Read - GET method for specific username data */
userManagementRoute.get('/:email', getAllUserData)
/* Read - GET method  for all data*/
userManagementRoute.get('/', getAllUserData)
/* Read - GET method  for pagination*/
userManagementRoute.get('/data/paginate', getPaginationData)
/* Update - Patch method */
userManagementRoute.patch('/:id', updateUserData)
/* Delete  - Delete method */
userManagementRoute.delete('/:id', deleteSingleRecord)
module.exports = userManagementRoute
