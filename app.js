const argv = require('./config/yargs').argv;
const colors = require('colors');
const toDo = require('./to-do/to-do');

let command = argv._[0];

switch (command) {
    case 'create':
        let task = toDo.create(argv.description);

        if (task.description) {
            console.log('Task: '.green + `${ task.description } was created!`);
        } else {
            console.log(task.red);
        }

        break;

    case 'read':
        let taskList = toDo.getTaskList(argv.filter);

        if (taskList.length === 0) {
            console.log('No tasks created! Try with create command'.red);
            return;
        }

        console.log('---------/-To Do list-/---------'.green);
        for (let task of taskList) {
            console.log('Description:', task.description);
            console.log('Completed:', task.completed);

            if (!(task.description === taskList[taskList.length - 1].description)) {
                console.log('------------'.green);
            }
        }
        console.log('---------/-End To Do list-/---------'.green);

        break;

    case 'update':
        let result = toDo.updateTask(argv.description, argv.completed);
        if (result) {
            console.log('Task was successfully updated!'.green);
        } else {
            console.log('Error! There is not a task created with that description'.red);
        }
        break;

    case 'delete':
        let deletedTask = toDo.deleteTask(argv.description);
        if (deletedTask) {
            console.log('Task was successfully deleted'.green);
        } else {
            console.log('Error! There is not a task created with that description'.red);
        }

        break;

    default:
        console.log('Unrecognized command! Try some command like "create", "read", "update" or "delete"'.red);
}