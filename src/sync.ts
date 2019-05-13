import { IKeyValueStoreSync } from "@keeveestore/keeveestore";

/**
 * @TODO
 *
 * get rid of ts-ignore. only string|number|symbol are allowed
 * but TS complains about K not being any of those.
 */
export class StoreSync<K, T> implements IKeyValueStoreSync<K, T> {
	// @ts-ignore
	private constructor(private store: { [key: K]: T }) {}

	public static new<K, T>(): StoreSync<K, T> {
		return new StoreSync<K, T>({});
	}

	public all(): [K, T][] {
		// @ts-ignore
		return Object.entries(this.store);
	}

	public keys(): K[] {
		// @ts-ignore
		return Object.keys(this.store);
	}

	public values(): T[] {
		return Object.values(this.store);
	}

	public get(key: K): T | undefined {
		// @ts-ignore
		return this.store[key];
	}

	public getMany(keys: K[]): (T | undefined)[] {
		return [...keys].map((key: K) => this.get(key));
	}

	public pull(key: K): T | undefined {
		const item: T | undefined = this.get(key);

		this.forget(key);

		return item;
	}

	public pullMany(keys: K[]): (T | undefined)[] {
		const items: (T | undefined)[] = this.getMany(keys);

		this.forgetMany(keys);

		return items;
	}

	public put(key: K, value: T): boolean {
		// @ts-ignore
		this.store[key] = value;

		// @ts-ignore
		return this.has(key);
	}

	public putMany(values: [K, T][]): boolean[] {
		return values.map((value: [K, T]) => this.put(value[0], value[1]));
	}

	public has(key: K): boolean {
		// @ts-ignore
		return this.store.hasOwnProperty(key);
	}

	public hasMany(keys: K[]): boolean[] {
		// @ts-ignore
		return [...keys].map((key: K) => this.has(key));
	}

	public missing(key: K): boolean {
		return !this.has(key);
	}

	public missingMany(keys: K[]): boolean[] {
		return [...keys].map((key: K) => this.missing(key));
	}

	public forget(key: K): boolean {
		if (!this.has(key)) {
			return false;
		}

		// @ts-ignore
		// tslint:disable-next-line: no-dynamic-delete
		delete this.store[key];

		return !this.has(key);
	}

	public forgetMany(keys: K[]): boolean[] {
		return [...keys].map((key: K) => this.forget(key));
	}

	public flush(): boolean {
		this.store = {};

		return this.count() === 0;
	}

	public count(): number {
		return this.keys().length;
	}

	public isEmpty(): boolean {
		return this.count() === 0;
	}

	public isNotEmpty(): boolean {
		return !this.isEmpty();
	}
}
