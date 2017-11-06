var Repository = require('../models/repository').model;
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/lynx');

var repository = new Repository({
    remote: 'https://github.com/juandiegotor/holaWorld',
    name: 'HolaWorld',
    description: 'Dice Hola en C y se construye con un CMAKE',
    versions: [
        {
            version: {
                version: {
                    major: 1,
                    minor: 0,
                    patch: 0
                },
                path: '/home/juandiego/Documents/',
                tags: ["pepe", "inicial"],
                comment: "Primer Release"
            },
            latest: true
        },
        {
            version: {
                version: {
                    major: 1,
                    minor: 0,
                    patch: 1
                },
                path: '/home/juandiego/Documents/',
                tags: ["pepe", "inicial", "fix"],
                comment: "Cambio a un bug menor"
            },
            latest: false
        }
    ]
});

parent.save(function () {
   console.log("guargado!");
   mongoose.disconnect();
});