const argv = process.argv
const Controller = require('./Controllers/Controller')

switch (argv[2]) {
    case 'release1':
        Controller.release1()
        break;
    case 'release2':
        Controller.release2()
        break;
    case 'release3':
        Controller.release3()
        break;
}