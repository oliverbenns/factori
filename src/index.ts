type Creator<T> = (defaultData: T) => Partial<T>;
type CreatorOfMany<T> = (defaultData: T, index: number) => Partial<T>;

class Factory<T extends object> {
	private readonly defaultData: T;

	constructor(data: T) {
		this.defaultData = data;
	}

	private createItem(data: Partial<T> = {}): T {
		// @NOTE: This limits us to not having nested objects.
		// Nested objects will be shared amongst creations.
		return { ...this.defaultData, ...data };
	}

	create(x?: Partial<T> | Creator<T>): T {
		const data = typeof x === "function" ? x(this.defaultData) : x;

		return this.createItem(data);
	}

	createList(count: number, x?: Partial<T> | CreatorOfMany<T>): T[] {
		const items = Array(count);

		for (let i = 0; i < count; i++) {
			const data = typeof x === "function" ? x(this.defaultData, i) : x;

			items[i] = this.createItem(data);
		}

		return items;
	}
}

export default Factory;
