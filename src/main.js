// アプリケーション作成用のモジュールを読み込み
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// メイン画面
let mainWindow;

function createWindow() {
	// メイン画面を作成
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
	});

	// メイン画面に表示するURLを指定する
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true,
	}));

	// デベロッパーツールの起動
	// mainWindow.webContents.openDevTools();

	// メインウィンドウが閉じたときの処理
	mainWindow.on('close', function() {
		mainWindow = null;
	});
}

// 初期化が完了したときの処理
app.on("ready", createWindow);

// すべてのウィンドウが閉じたときの処理
app.on('window-all-closed', function() {
	// macOS以外は、アプリケーションを終了
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// アクティブになったとき
app.on('activate', function() {
	// メインウィンドウが消えている場合は再度作成する
	if (mainWindow === null) {
		createWindow();
	}
})
