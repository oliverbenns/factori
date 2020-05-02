import Factory from "../src/factori";

interface Product {
	id: number;
	name: string;
}

const product: Product = {
	id: 1,
	name: "Apple",
};

const productFactory = new Factory(product);

describe("Factory", () => {
	describe("create", () => {
		it("creates an object with default data", () => {
			const result = productFactory.create();

			expect(result).toEqual(product);
		});

		it("creates an object with overwritten data", () => {
			const result = productFactory.create({
				name: "Orange",
			});

			expect(result).toEqual({ id: 1, name: "Orange" });
		});

		it("creates an object with altered property", () => {
			const result = productFactory.create((product) => ({
				name: `${product.name} Juice`,
			}));

			expect(result.name).toBe("Apple Juice");
		});
	});

	describe("createList", () => {
		it("creates objects with default data", () => {
			const results = productFactory.createList(2);

			expect(results).toHaveLength(2);
			expect(results[0]).toEqual(product);
		});

		it("creates objects with overwritten data", () => {
			const results = productFactory.createList(2, {
				name: "Orange",
			});

			expect(results).toHaveLength(2);
			expect(results[0].name).toBe("Orange");
			expect(results[1].name).toBe("Orange");
		});

		it("creates objects with altered property based on index", () => {
			const results = productFactory.createList(2, (product, index) => ({
				id: index,
			}));

			expect(results).toHaveLength(2);
			expect(results[0].id).toBe(0);
			expect(results[1].id).toBe(1);
		});
	});
});
