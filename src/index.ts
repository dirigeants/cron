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
			if (match === 'h') return Math.floor(Math.random() * (allowedNum[i][1] + 1));
			if (match === '?') {
				switch (i) {
					case 0: return now.getUTCMinutes();
					case 1: return now.getUTCHours();
					case 2: return now.getUTCDate();
					case 3: return now.getUTCMonth();
					case 4: return now.getUTCDay();
				}
			}
			return match;
		})).join(' ');
		return cron.replace(tokensRegex, match => tokens[match]);
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
		const [, wild, minStr, maxStr, step] = partRegex.exec(cronPart);
		let [min, max] = [parseInt(minStr), parseInt(maxStr)];

		if (wild) [min, max] = allowedNum[id];
		else if (!max && !step) return [min];
		[min, max] = [min, max || allowedNum[id][1]].sort((a, b) => a - b);
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
