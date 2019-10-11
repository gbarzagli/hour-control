const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

// Window reference
let window;

const createWindow = () => {
    // Create window
    window = new BrowserWindow({
        width: 720,
        height: 425,
        webPreferences: {
            preload: path.join(app.getAppPath(), "/electron/preload.js")
            // devTools: false
        }
    });

    

    // Load UI
    window.loadURL(`http://localhost:4200`);
    // window.loadURL(`https://calendar-hour-control-45bcd.firebaseapp.com`);
    // window.loadURL(`file://${__dirname}/dist/control-hour/index.html`);
    // window.loadFile(`${__dirname}/dist/control-hour/index.html`);

    window.on("close", () => {
        window = null;
    });

    window.webContents.openDevTools();
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (window === null) {
        createWindow();
    }
    console.log(app.getAppPath());
});


// doExport = data => {
//     require('fs').writeFile("./export-test.json", JSON.stringify(data), function(err) {
//         if (err) {
//             return console.log(err);
//         }
    
//         console.log("The file was saved!");
//     });
// }


// ipcMain.on('export', (event, data) => {
//     console.log(data);
//     doExport(data);
// })