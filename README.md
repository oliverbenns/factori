# Factory Whirl

A minimal, typed, factory pattern, allowing quick generation of data, useful for tests.

## Documentation

Simple docs for a simple library.

```typescript
import Factory from "factory-whirl";

interface Product {
	id: number;
	name: string;
}

// Create a factory
const productFactory = new Factory<Product>({
	id: 1,
	name: "Apple",
});

// Create a single object with overridden properties
// { id: 1, name: "Orange" }
productFactory.create({
	name: "Orange",
});

// Create a single object with an anon function that allows editing of the original.
// { id: 2, name: "Apple Juice" }
const result = productFactory.create((product) => ({
	id: product.id + 1,
	name: `${product.name} Juice`,
}));

// Create an array of objects
// [{ id: 1, name: "Apple" }, { id: 1, name: "Apple" }]
const results = productFactory.createList(2);

// Create an array of objects with overridden properties
// [{ id: 1, name: "Orange" }, { id: 1, name: "Orange" }]
const results = productFactory.createList(2, {
	name: "Orange",
});

// Create an array of objects with an anon function that allows editing of the original.
// This is useful for incremental fields, like ids/keys.
// [{ id: 0, name: "Orange Juice" }, { id: 1, name: "Orange Juice" }]
const results = productFactory.createList(2, (product, index) => ({
	id: index,
	name: `${product.name} Juice`,
}));
```

## Roadmap

I have no current plans to extend this. However a couple of ideas spring to mind:

- Adding option to deep copy. This would fix nested object references which would be shared across instances. Disabled by default for performance reasons.
- Adding incremental fields to auto-increment, e.g. `{ id: new Incrementor(i => i + 1) }`. This would allow easier incremental updates on all methods as the only way to do that currently is to create an array and use the index in the map function. However the objects do become less predictable this way, especially with concurrent operations.
