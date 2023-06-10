'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Qualifications', [{
      user_qualification_id: 1,
      SSLC_School: "svm matric,school",
      SSLC_MARK: "485",
      SSLC_PassedOut: 2016,
      HSC_School: "ssv matric,school",
      HSC_MARK: "984",
      HSC_PassedOut: 2018,
      UG_college_name: "kln college of enggg",
      UG_Degree: "B.E",
      UG_per: 80,
      userId: 1

    }], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Qualifications', null, {});

  }
};
