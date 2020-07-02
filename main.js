const { app , BrowserWindow, Tray, Menu, ipcMain, Notification }  = require('electron');

let win;
let tray;
let notification;

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
    win.hide();
    win.loadFile('index.html');
    tray = new Tray('music-icon.png');
    tray.setToolTip('Music App');

    tray.on('click', (event, bounds) => {
        let {x,y} = bounds;
        let {width, height} = win.getBounds();
        if(win.isVisible()){
            win.hide()
        }else{
            if(process.platform != "darwin"){
                y = y - height;
            }
            win.setBounds({
                x : x - width/2,
                y,
                width,
                height
            })
            win.show()
        }
    });


    tray.on('right-click', () => {
        let template = [{role : 'quit'}];
        const menu = Menu.buildFromTemplate(template);
        tray.popUpContextMenu(menu);
    });

    win.on('blur', () => {
        win.hide();
    });

});

ipcMain.on('newSong', (event, data) => {
        if(Notification.isSupported()){
            notification = new Notification({
                title : 'Now Playing',
                body : data,
                silent:true
            });
            notification.show();
        }
});


