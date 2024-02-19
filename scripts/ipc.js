const { spawn } = require("child_process");

function startPythonProcess(req) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn("python", ["./backend/backend.py"]);

        console.log("sending to python - ",req);
        const jsonString = JSON.stringify(req);
        pythonProcess.stdin.write(jsonString + "\n");
        console.log("sent");

        console.log("receiving");
        let receivedData;

        // Handle data received from Python
        pythonProcess.stdout.on("data", (data) => {
            receivedData = JSON.parse(data.toString());
        });

        // Handle errors
        pythonProcess.stderr.on("data", (data) => {
            console.error(`Python script error: ${data}`);
            reject(data.toString());
        });

        // Handle Python process exit
        pythonProcess.on("exit", (code) => {
            console.log(`Python script exited with code ${code}`);
            resolve(receivedData);
        });

        // Ensure to end the stdin stream to signal the end of input
        pythonProcess.stdin.end();
        // pythonProcess ? pythonProcess.kill() : null;
    });
}

module.exports = { startPythonProcess };
