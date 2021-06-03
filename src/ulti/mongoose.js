module.exports = {
    mutipleMonngooseToObject: function(mongooses){
        return mongooses.map(mongoose => mongoose.toObject())
    },
    mongosseToObject: function(mongoose){
        return mongoose ? mongoose.toObject(): mongoose;
    }
}