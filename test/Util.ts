import ava from 'ava';
import { Cron } from '../dist';

/* eslint-disable max-len */

ava('pre-defined @hourly', (test): void => {
	test.plan(6);

	const specimine = new Cron('@hourly');

	test.is(specimine.normalized, '0 * * * *');
	test.deepEqual(specimine.minutes, [0]);
	test.deepEqual(specimine.hours, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
	test.deepEqual(specimine.days, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
	test.deepEqual(specimine.months, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
	test.deepEqual(specimine.dows, [0, 1, 2, 3, 4, 5, 6]);
});

ava('pre-defined @daily', (test): void => {
	test.plan(6);

	const specimine = new Cron('@daily');

	test.is(specimine.normalized, '0 0 * * *');
	test.deepEqual(specimine.minutes, [0]);
	test.deepEqual(specimine.hours, [0]);
	test.deepEqual(specimine.days, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
	test.deepEqual(specimine.months, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
	test.deepEqual(specimine.dows, [0, 1, 2, 3, 4, 5, 6]);
});

ava('pre-defined @weekly', (test): void => {
	test.plan(6);

	const specimine = new Cron('@weekly');

	test.is(specimine.normalized, '0 0 * * 0');
	test.deepEqual(specimine.minutes, [0]);
	test.deepEqual(specimine.hours, [0]);
	test.deepEqual(specimine.days, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
	test.deepEqual(specimine.months, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
	test.deepEqual(specimine.dows, [0]);
});

ava('pre-defined @monthly', (test): void => {
	test.plan(6);

	const specimine = new Cron('@monthly');

	test.is(specimine.normalized, '0 0 1 * *');
	test.deepEqual(specimine.minutes, [0]);
	test.deepEqual(specimine.hours, [0]);
	test.deepEqual(specimine.days, [1]);
	test.deepEqual(specimine.months, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
	test.deepEqual(specimine.dows, [0, 1, 2, 3, 4, 5, 6]);
});

ava('pre-defined @yearly', (test): void => {
	test.plan(6);

	const specimine = new Cron('@yearly');

	test.is(specimine.normalized, '0 0 1 1 *');
	test.deepEqual(specimine.minutes, [0]);
	test.deepEqual(specimine.hours, [0]);
	test.deepEqual(specimine.days, [1]);
	test.deepEqual(specimine.months, [1]);
	test.deepEqual(specimine.dows, [0, 1, 2, 3, 4, 5, 6]);
});

ava('pre-defined @annually', (test): void => {
	test.plan(6);

	const specimine = new Cron('@annually');

	test.is(specimine.normalized, '0 0 1 1 *');
	test.deepEqual(specimine.minutes, [0]);
	test.deepEqual(specimine.hours, [0]);
	test.deepEqual(specimine.days, [1]);
	test.deepEqual(specimine.months, [1]);
	test.deepEqual(specimine.dows, [0, 1, 2, 3, 4, 5, 6]);
});

ava('every minute', (test): void => {
	test.plan(6);

	const specimine = new Cron('* * * * *');

	test.is(specimine.normalized, '* * * * *');
	test.deepEqual(specimine.minutes, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]);
	test.deepEqual(specimine.hours, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
	test.deepEqual(specimine.days, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
	test.deepEqual(specimine.months, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
	test.deepEqual(specimine.dows, [0, 1, 2, 3, 4, 5, 6]);
});

ava('every other minute', (test): void => {
	test.plan(6);

	const specimine = new Cron('*/2 * * * *');

	test.is(specimine.normalized, '*/2 * * * *');
	test.deepEqual(specimine.minutes, [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58]);
	test.deepEqual(specimine.hours, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
	test.deepEqual(specimine.days, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
	test.deepEqual(specimine.months, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
	test.deepEqual(specimine.dows, [0, 1, 2, 3, 4, 5, 6]);
});

ava('every other hour', (test): void => {
	test.plan(6);

	const specimine = new Cron('* */2 * * *');

	test.is(specimine.normalized, '* */2 * * *');
	test.deepEqual(specimine.minutes, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]);
	test.deepEqual(specimine.hours, [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]);
	test.deepEqual(specimine.days, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
	test.deepEqual(specimine.months, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
	test.deepEqual(specimine.dows, [0, 1, 2, 3, 4, 5, 6]);
});

ava('every other day', (test): void => {
	test.plan(6);

	const specimine = new Cron('* * */2 * *');

	test.is(specimine.normalized, '* * */2 * *');
	test.deepEqual(specimine.minutes, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]);
	test.deepEqual(specimine.hours, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
	test.deepEqual(specimine.days, [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31]);
	test.deepEqual(specimine.months, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
	test.deepEqual(specimine.dows, [0, 1, 2, 3, 4, 5, 6]);
});

ava('every other month', (test): void => {
	test.plan(6);

	const specimine = new Cron('* * * */2 *');

	test.is(specimine.normalized, '* * * */2 *');
	test.deepEqual(specimine.minutes, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]);
	test.deepEqual(specimine.hours, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
	test.deepEqual(specimine.days, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
	test.deepEqual(specimine.months, [1, 3, 5, 7, 9, 11]);
	test.deepEqual(specimine.dows, [0, 1, 2, 3, 4, 5, 6]);
});

ava('every other day of week', (test): void => {
	test.plan(6);

	const specimine = new Cron('* * * * */2');

	test.is(specimine.normalized, '* * * * */2');
	test.deepEqual(specimine.minutes, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]);
	test.deepEqual(specimine.hours, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
	test.deepEqual(specimine.days, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
	test.deepEqual(specimine.months, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
	test.deepEqual(specimine.dows, [0, 2, 4, 6]);
});

ava('every monday through friday token at midnight', (test): void => {
	test.plan(6);

	const specimine = new Cron('0 0 * * mon-fri');

	test.is(specimine.normalized, '0 0 * * 1-5');
	test.deepEqual(specimine.minutes, [0]);
	test.deepEqual(specimine.hours, [0]);
	test.deepEqual(specimine.days, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
	test.deepEqual(specimine.months, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
	test.deepEqual(specimine.dows, [1, 2, 3, 4, 5]);
});

ava('every friday in july at midnight', (test): void => {
	test.plan(6);

	const specimine = new Cron('0 0 * jul fri');

	test.is(specimine.normalized, '0 0 * 7 5');
	test.deepEqual(specimine.minutes, [0]);
	test.deepEqual(specimine.hours, [0]);
	test.deepEqual(specimine.days, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]);
	test.deepEqual(specimine.months, [7]);
	test.deepEqual(specimine.dows, [5]);
});

ava('this instant', (test): void => {
	test.plan(6);

	const now = new Date();
	const [min, hour, day, month, dow] = [now.getUTCMinutes(), now.getUTCHours(), now.getUTCDate(), now.getUTCMonth(), now.getUTCDay()];
	const specimine = new Cron('? ? ? ? ?');

	test.is(specimine.normalized, `${min} ${hour} ${day} ${month} ${dow}`);
	test.deepEqual(specimine.minutes, [min]);
	test.deepEqual(specimine.hours, [hour]);
	test.deepEqual(specimine.days, [day]);
	test.deepEqual(specimine.months, [month]);
	test.deepEqual(specimine.dows, [dow]);
});

/* eslint-enable max-len */
