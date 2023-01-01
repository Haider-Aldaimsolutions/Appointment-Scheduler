const {Schema , model} = require('mongoose');

const CompanyDetailSchema = new Schema({
  
});

const CompanyDetails = model('company_details',CompanyDetailSchema);

module.exports = CompanyDetails;