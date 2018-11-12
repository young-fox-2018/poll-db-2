const Model = require('../Models/Model')
const View = require('../Views/view')


class Controller {
    static release1() {
        Model.release1(function (data) {
            View.showRelease(data)
        })
    }
    static release2() {
        Model.release2(function (data) {
            View.showRelease(data)
        })
    }
    static release3() {
        Model.release3(function (data) {
            View.showRelease(data)
        })
    }
}

module.exports = Controller