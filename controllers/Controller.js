const View = require('../views/View')
const Model = require('../models/Model')

class Controller {

    static query1() {
        Model.query1(function(err, data){
            if (err) {
                View.displayErr(err)
            } else {
                View.displayMsg(data)
            }
        })
    }

    static query2() {
        Model.query2(function(err, data){
            if (err) {
                View.displayErr(err)
            } else {
                View.displayMsg(data)
            }
        })
    }

    static query3() {
        Model.query3(function(err, data){
            if (err) {
                View.displayErr(err)
            } else {
                View.displayMsg(data)
            }
        })
    }
}

module.exports = Controller