import { DAY, partRegex, wildcardRegex, allowedNum, predefined, tokens, tokensRegex } from './constants';

/**
 * Handles Cron strings and generates dates based on the cron string provided.
 * @see https://en.wikipedia.org/wiki/Cron
 */
export class Cron {

	public cron: string;
	public normalized: string;
	public minutes: number[];
	public hours: number[];
	public days: number[];
	public months: number[];
	public dows: number[];

	/**
	 * @param cron The cron pattern to use
	 */
	public constructor(cron: string) {
		this.cron = cron.toLowerCase();
		this.normalized = Cron._normalize(this.cron);
		[this.minutes, this.hours, this.days, this.months, this.dows] = Cron._parseString(this.normalized);
	}

	/**
	 * Get the next date that matches with the current pattern
	 * @param outset The Date instance to compare with
	 * @param origin Whether this next call is origin
	 */
	public next(outset: Date = new Date(), origin = true): Date {
		if (!this.days.includes(outset.getUTCDate()) || !this.months.includes(outset.getUTCMonth() + 1) || !this.dows.includes(outset.getUTCDay())) {
			return this.next(new Date(outset.getTime() + DAY), false);
		}
		if (!origin) return new Date(Date.UTC(outset.getUTCFullYear(), outset.getUTCMonth(), outset.getUTCDate(), this.hours[0], this.minutes[0]));

		const now = new Date(outset.getTime() + 60000);

		for (const hour of this.hours) {
			if (hour < now.getUTCHours()) continue;
			for (const minute of this.minutes) {
				if (hour === now.getUTCHours() && minute < now.getUTCMinutes()) continue;
				return new Date(Date.UTC(outset.getUTCFullYear(), outset.getUTCMonth(), outset.getUTCDate(), hour, minute));
			}
		}

		return this.next(new Date(outset.getTime() + DAY), false);
	}

	/**
	 * Normalize the pattern
	 * @param cron The pattern to normalize
	 */
	private static _normalize(cron: string): string {
		if (cron in predefined) return predefined[cron];
		const now = new Date();
		cron = cron.split(' ').map((val, i) => val.replace(wildcardRegex, (match) => {
			if (match === 'h') return (Math.floor(Math.random() * allowedNum[i][1]) + allowedNum[i][0]).toString();

			/* istanbul ignore else: unreachable code. */
			if (match === '?') {
				switch (i) {
					case 0: return now.getUTCMinutes().toString();
					case 1: return now.getUTCHours().toString();
					case 2: return now.getUTCDate().toString();
					case 3: return now.getUTCMonth().toString();
					case 4: return now.getUTCDay().toString();
				}
			}

			/* istanbul ignore next: unreachable code. */
			return match;
		})).join(' ');
		return cron.replace(tokensRegex, match => String(tokens[match]));
	}

	/**
	 * Parse the pattern
	 * @param cron The pattern to parse
	 */
	private static _parseString(cron: string): Array<number[]> {
		const parts = cron.split(' ');
		if (parts.length !== 5) throw new Error('Invalid Cron Provided');
		return parts.map(Cron._parsePart);
	}

	/**
	 * Parse the current part
	 * @param cronPart The part of the pattern to parse
	 * @param id The id that identifies the current part
	 */
	private static _parsePart(cronPart: string, id: number): number[] {
		if (cronPart.includes(',')) {
			const res = [];
			for (const part of cronPart.split(',')) res.push(...Cron._parsePart(part, id));
			return [...new Set(res)].sort((a, b) => a - b);
		}

		// eslint-disable-next-line prefer-const
		const [, wild, minStr, maxStr, step] = partRegex.exec(cronPart) as RegExpExecArray;
		let [min, max] = [parseInt(minStr), parseInt(maxStr)];

		// If '*', set min and max as the minimum and maximum allowed numbers:
		if (wild) [min, max] = allowedNum[id];
		// Else if a number was given, but not a maximum nor a step, return it
		// as only allowed value:
		else if (!max && !step) return [min];

		// Set min and max as the given numbers, defaulting max to the maximum
		// allowed, so min is never bigger than max:
		// This makes min and max be, in the following cases (considering minutes):
		// -> 1-2 | 1..2
		// -> 2-1 | 1..2
		// -> 1/7 | 1, 8, 15, 22, 29, 36, 43, 50, 57
		[min, max] = [min, max || allowedNum[id][1]].sort((a, b) => a - b);

		// Generate a range
		return Cron._range(min, max, parseInt(step) || 1);
	}

	/**
	 * Get an array of numbers with the selected range
	 * @param min The minimum value
	 * @param max The maximum value
	 * @param step The step value
	 */
	private static _range(min: number, max: number, step: number): number[] {
		return new Array(Math.floor((max - min) / step) + 1).fill(0).map((_val, i) => min + (i * step));
	}

}
