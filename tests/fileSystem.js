var dm = require("../packages/directoryManager");

// create a directory
dm.createDir("/home/juandiego/Desktop", "hola");

// copy contents from other directory to the one we created
dm.copyDir("/home/juandiego/Desktop/test", "/home/juandiego/Desktop/hola");

// Working 2017-10-8