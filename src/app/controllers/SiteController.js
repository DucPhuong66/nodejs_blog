const Course = require("../models/Course");
const { mutipleMonngooseToObject } = require('../../ulti/mongoose')


class SiteController {
    // [GET] /
    index(req, res, next) {
            Course.find({})
                .then(courses => {                  
                    res.render('home', {
                        courses: mutipleMonngooseToObject(courses)
                    })
                })
                .catch(next)
        
      
    }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();

const siteController = require('./CourseController');
