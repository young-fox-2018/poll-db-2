class View {
    static displayError(input) {
        console.log(input)
    }

    static displayData(input) {
        console.log(input)
    }

    static Setup() {
        console.log('Initial table success')
    }
    
    static seedDataPoliticians() {
        console.log('seed data politicians success')
    }

    static seedDataVoters() {
        console.log('seed data voters success')
    }

    static seedDataVotes() {
        console.log('seed data votes success')
    }

    static createViewVoters() {
        console.log('View table "votersPoliticianId" successfully created')
    } 

    static createViewPoliticians() {
        console.log('View table "bestThreePoliticians" successfully created')
    } 
}

module.exports = View