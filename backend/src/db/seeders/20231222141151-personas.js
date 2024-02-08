'use strict';
const db = require('../models');
const ProjectsDBApi = require('../api/projects');
const processFile = require('../../middlewares/upload');
const csv = require('csv-parser');
const stream = require('stream');

const ids = [
  '05283bb3-3bda-454e-b8c3-a876ad727722',
  '576d7944-5c91-4853-8912-6934d0787a73',
  '3b1cbac8-7afe-4103-8a31-4c0eabdaad9f',
  'eecf417c-7da1-416f-9354-0bbc7960382f',
  'f50f979a-b471-4f43-ad76-920e4f9dc2ec',
  '64207fd8-93ab-44d0-abd9-91b5840f43d1',
  '625ebb3a-0872-4291-92c4-a0ca416e37d1',
  '7720c7a2-b3d3-4ebc-a3cd-848fd3d7f1fd',
  '354c018c-228d-4783-8a59-cff659708d58',
  'f42f14f4-465e-45ca-82b4-65bedd549af5'
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('personas', [
      {  id: ids[0], Name: 'Adventure Traveler', Age: '25', Occupation: 'Freelancer', EducationLevel: 'Bachelor', IncomeRange: '1', createdAt: new Date(), updatedAt: new Date() },
      {  id: ids[1], Name: 'Luxury Vacationer',  Age: '35', Occupation: 'Executive', EducationLevel: 'Master', IncomeRange: '2', createdAt: new Date(), updatedAt: new Date() },
      {  id: ids[2], Name: "Service Manager",    Age: "45", Occupation: "Corporate Manager", EducationLevel: "MBA",  IncomeRange: "3",createdAt: new Date(), updatedAt: new Date() },
      {  id: ids[3], Name: "Customer Service Agent",Age: "22",Occupation: "Customer Service Agent",EducationLevel: "Bachelor's",IncomeRange: "4",createdAt: new Date(), updatedAt: new Date() },
      {  id: ids[4], Name: "Operations Manager", Age: "55",Occupation: "Operations Manager",EducationLevel: "Master's in Business Administration",IncomeRange: "5",createdAt: new Date(), updatedAt: new Date() },
      {  id: ids[5], Name: "College Student Manager",Age: "18",Occupation: "College Student",EducationLevel: "In Progress",IncomeRange: "6",createdAt: new Date(), updatedAt: new Date() },
      {  id: ids[6], Name: "Flight Attendant",   Age: "40",Occupation: "Flight Attendant",EducationLevel: "Associate Degree",IncomeRange: "3",createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('personas', null, {});
  }
  
};
