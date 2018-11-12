const {Setup} = require('../models/setup')
const Model = require('../models/model')
const View = require('../views/view')

class Controller {
    static setup() {
        Setup.init()
        View.setup()
    }

    static seedDataPoliticians() {
        Model.seedDataPoliticians(function (err) {
            if (err) View.displayError(err)
            else View.seedDataPoliticians()
        })
    }

    static seedDataVoters() {
        Model.seedDataVoters(function (err) {
            if (err) View.displayError(err)
            else View.seedDataVoters()
        })
    }

    static seedDataVotes() {
        Model.seedDataVotes(function (err) {
            if (err) View.displayError(err)
            else View.seedDataVotes()
        })
    }

    static gradeBelow(grade) {
        Model.gradeBelow(grade, function(err, data) {
            if (err) View.displayError(err)
            else View.displayData(data)
        })
    }

    static createViewVoters() {
        Model.createViewVoters(function(err){
            if (err) View.displayError(err)
            else View.createViewVoters()
        })
    }

    static createViewPoliticians() {
        Model.createViewPoliticians(function(err) {
            if (err) View.displayError(err)
            else View.createViewPoliticians()
        })
    }
    
    static bestThreePoliticians() {
        Model.bestThreePoliticians(function(err, data) {
            if (err) View.displayError(err)
            else View.displayData(data)
        })
    }

    static cheaters() {
        Model.cheaters(function(err, data) {
            if (err) View.displayError(err)
            else View.displayData(data)
        })
    }
}

module.exports = Controller