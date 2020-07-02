const { app , BrowserWindow, Tray }  = require('electron');

let win;
let tray;

app.on('ready', () => {
    win = new BrowserWindow({
        width:400,
        height:600,
        webPreferences : {
            nodeIntegration : true
        },
        frame:false,
        resizable:false,
        skipTaskbar:true
    });

    win.loadFile('index.html');
    tray = new Tray('music-icon.png');


    tray.on('click', () => {
        if(win.isVisible()){
            win.hide()
        }else{
            win.show()
        }
    })
});



