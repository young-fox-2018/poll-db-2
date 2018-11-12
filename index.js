const argv = process.argv.slice(2)
const Controller = require('./controllers/controller')

switch (argv[0]) {
    case 'setup':
        Controller.setup()
        break

    case 'seedPoliticians':
        Controller.seedDataPoliticians()
        break

    case 'seedVoters':
        Controller.seedDataVoters()
        break

    case 'seedVotes':
        Controller.seedDataVotes()
        break

    case 'gradeBelow':
        Controller.gradeBelow(argv[1]) // grade benchmark
        break

    case 'viewVoters':
        Controller.createViewVoters()
        break

    case 'viewPoliticians':
        Controller.createViewPoliticians()
        break
    
    case 'bestThreePoliticians':
        Controller.bestThreePoliticians()
        break
    case 'cheaters':
        Controller.cheaters()
        break
}