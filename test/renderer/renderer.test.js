
import test from 'ava';
import React from 'react';
import { readFileSync } from 'fs';
import { render } from 'react-dom';
import { screenshot, isAvaron } from '../../';

test('should capture react component screenshot', async t => {
	render(<div>Hello, world..!?</div>, document.querySelector('.main'));
	const path = 'screenshots/should_capture_react_component_screenshot.png';
	await screenshot(path);
	try {
		const png = readFileSync(path);
		t.is(!!png, true);
	} catch (e) {
		console.error(e);
		t.fail();
	}
});

