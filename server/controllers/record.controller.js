const { Record } = require('../models/record.model');
const recordRoutes = require('../routes/record.routes');

    // create a record
module.exports.createRecord = (request, response) => {
    const { name, album, description, sales, isOwned, image, genres, review } = request.body;
    Record.create({
        name,
        album,
        description,
        sales,
        isOwned,
        image,
        genres,
        review
    })
        .then(record => response.json(record))
        .catch(err => response.status(400).json(err));
}

// list all records
module.exports.getAllRecords = (request, response) => {
    // Record.find({}, null, {sort: "name"})
    Record.find()
        .then(records => response.json(records.sort((a, b)=> a.name.localeCompare(b.name))))
        // .then(records => response.json(records))
        .catch(err => response.status(400).json(err));
}


// find/show one record
module.exports.getOneRecord = (request, response) => {
    Record.findOne({_id:request.params.id})
        .then(record => response.json(record))
        .catch(err => response.status(400).json(err));
}

// update one record
module.exports.updateRecord = (request, response) => {
    Record.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedRecord => response.json(updatedRecord))
        .catch(err => response.status(400).json(err));
}

// delete one record
module.exports.deleteRecord = (request, response) => {
    Record.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.status(400).json(err));
}
