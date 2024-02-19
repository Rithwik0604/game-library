// Usage
// startPythonProcess("steam")
//     .then((response) => {
//         console.log(response);
//         console.log(typeof response);
//         console.log(response.length)
//     })
//     .catch((error) => {
//         console.error(error);
//     });


const {startPythonProcess} = require("./scripts/ipc.js")

// const response = await startPythonProcess('hello');
// console.log(response);

startPythonProcess("hello")
    .then((response) => {
        console.log(response);
        console.log(typeof response);
        console.log(response.length)
    })
    .catch((error) => {
        console.error(error);
    });