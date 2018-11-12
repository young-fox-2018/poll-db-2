const Controller = require('./controllers/Controller')
const argv = process.argv.slice(2)

let command = Number(argv[0])

switch (command) {
    case 1:
        Controller.query1()
        break;
    case 2:
        Controller.query2()
        break;
    case 3:
        Controller.query3()
        break;

    default:
        break;
}