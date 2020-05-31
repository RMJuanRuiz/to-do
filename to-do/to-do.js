const fs = require('fs');

let toDoList = [];

const create = (description) => {
    loadToDoList();

    let index = toDoList.findIndex(task => task.description === description);

    if (index >= 0) {
        return 'Error! There is already a task created with that description';
    }

    let toDo = {
        description,
        completed: false
    }

    toDoList.push(toDo);

    saveToDoList();
    return toDo;
}

const getTaskList = (filter) => {
    loadToDoList();
    filter = filter.toLowerCase();
    finalList = [];

    if (filter === 'completed') {
        finalList = toDoList.filter(task => {
            return task.completed === true;
        });
    } else {
        if (filter === 'to do') {
            finalList = toDoList.filter(task => {
                return task.completed === false;
            });
        } else {
            finalList = toDoList.sort((a, b) => {
                return b.completed - a.completed;
            });
        }
    }

    return finalList;
}

const updateTask = (description, completed) => {
    loadToDoList();

    let index = toDoList.findIndex(task => task.description === description);

    if (index >= 0) {
        toDoList[index].completed = completed;
        saveToDoList()
        return true;
    } else {
        return false;
    }

}


const deleteTask = (description) => {
    loadToDoList();

    let newList = toDoList.filter(task => {
        return task.description !== description;
    });

    if (newList.length !== toDoList.length) {
        toDoList = newList;
        saveToDoList()
        return true;
    } else {
        return false;
    }
}

const saveToDoList = () => {
    let data = JSON.stringify(toDoList);

    fs.writeFile('data/data.json', data, (err) => {
        if (err) throw new Error('Error, something went wrong!', err);
    });
}

const loadToDoList = () => {
    try {
        toDoList = require('../data/data.json');
    } catch (error) {
        toDoList = [];
    }
}

module.exports = {
    create,
    getTaskList,
    updateTask,
    deleteTask
}