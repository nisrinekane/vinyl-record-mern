// get the 'class methods' which we'll apply accroding to each end point
const RecordController = require('../controllers/Record.controller');

module.exports = function(app){
    app.post('/api/new', RecordController.createRecord);
    app.get('/api/', RecordController.getAllRecords);
    app.get('/api/records/:id', RecordController.getOneRecord);
    app.put('/api/records/edit/:id', RecordController.updateRecord); //added edit to the end of url
    app.delete('/api/record/:id', RecordController.deleteRecord);
}