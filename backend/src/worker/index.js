const worker = require("./worker");

worker.start();
console.log(`Worker Ready? ${worker.isRunning}`);
