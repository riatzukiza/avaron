'use strict';

const { BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

module.exports = (options, argv) => {
	const actualOptions = Object.assign({ show: false, width: 800, height: 600 }, options.windowOptions);
	const window = new BrowserWindow(actualOptions);
	const fixture = options.fixture
		? path.resolve(process.cwd(), options.fixture)
		: path.resolve(__dirname, '../renderer/index.html');
	const windowURL = getURL(argv, fixture);
	const rendererDir = path.resolve(__dirname, '../renderer');
	const starter = options.fixture
		? path.resolve(process.cwd(), path.relative(path.dirname(fixture), rendererDir) + '/starter.js')
		: './starter.js';
	window.webContents.on('dom-ready', (e) => {
		window.webContents.executeJavaScript(`require("${starter}");`);
	});
	// window.webContents.openDevTools();
	window.loadURL(windowURL);
	return window;
};

function getURL(argv, fixture) {
	const unencodedHash = JSON.stringify(argv);
	const hash = encodeURIComponent(unencodedHash);
	return url.format({
		pathname: fixture,
		protocol: 'file',
		slashes: true,
		hash
	});
}
