const description = {
    demand: true,
    alias: '-d',
    desc: 'Description of the task'
}

const completed = {
    default: true,
    alias: '-c',
    desc: 'Mark if the task status is completed',
    type: 'boolean'
}

const filter = {
    default: 'all',
    alias: '-f',
    desc: 'Filter tasks by "completed" or "to do"'
}

const argv = require('yargs')
    .command('create', 'Create new task', {
        description
    })
    .command('read', 'Show taskList', {
        filter
    })
    .command('update', 'Update state of a task', {
        description,
        completed
    })
    .command('delete', 'Delete task', {
        description
    })
    .help()
    .argv;

module.exports = {
    argv
}