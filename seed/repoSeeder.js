var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/lynx');
var Repository = require('../models/repository').model;
var Version = require('../models/version').model;

// create some versions
var versions1 = [
    new Version({
        major: 1,
        minor: 0,
        patch: 0,
        path: '/home/juandiego/Documents/',
        comment: "Release Inicial!"
    }),
    new Version({
        major: 1,
        minor: 0,
        patch: 1,
        path: '/home/juandiego/Documents/pp',
        comment: 'Se arreglo el bug tal'
    }),
    new Version({
        major: 1,
        minor: 2,
        patch: 0,
        path: '/home/juandiego/Documents/lpo',
        comment: 'Nuevo feature'
    })
];

var versions2 = [
    new Version({
        major: 0,
        minor: 1,
        patch: 0,
        path: '/home/juandiego/Desktop/',
        comment: "Test1"
    }),
    new Version({
        major: 1,
        minor: 0,
        patch: 0,
        path: '/home/juandiego/Documents/pp',
        comment: 'First Release, stable'
    }),
    new Version({
        major: 2,
        minor: 0,
        patch: 0,
        path: '/home/juandiego/Documents/lpo',
        comment: 'Upgraded for new ubuntu home, no GTK+'
    })
];

var repositories = [
    new Repository({
        remote: 'https://github.com/juandiegotor/holaWorld',
        gitHubVersion: versions1[1],
        name: 'HolaWorld',
        description: 'Dice Hola en C y se construye con un CMAKE',
        versions: versions1,
        tags: ["C", "CMAKE", "Saludo"]
    }),
    new Repository({
        remote: 'https://github.com/juandiegotor/pepe',
        name: 'EIA Manager',
        description: 'Manages and stores the test and docs from the university',
        versions: versions2,
        tags: ["NodeJS", "Electron", "Utilities"]
    })
];

// save the repos in the db
for (var i = 0; i < repositories.length; i++) {
    if (i === repositories.length-1) {
        repositories[i].save(function () {
            console.log("repo saved!");
            mongoose.disconnect(function () {
                console.log(i + " repos saved");
            });
        });
    } else {
        repositories[i].save(function () {
            console.log("repo saved!");
        });
    }
}