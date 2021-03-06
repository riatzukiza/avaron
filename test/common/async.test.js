
import test from 'ava';

test('async test', async t => {
	const wait = (time) => new Promise(resolve => {
		setTimeout(() => resolve(), time);
	});
	await wait(1000);
	t.pass();
});
