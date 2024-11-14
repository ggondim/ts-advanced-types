# TypeScript Advanced Types

Advanced types and utility functions for TypeScript.

## Usage

```
$ npm install --save ts-advanced-types
```

See [index.ts](index.ts) for full reference.

## Utility types

- `Without<T, U>` Remove all properties from T that are assignable to U
- `TypeXOR<T, U>` XOR of two types

## Basic types

- `Falsy` JavaScript falsy types
- `PrimitiveValidIndexSignature` JavaScript primitive types accepted as index signatures
- `Primitive` JavaScript primitive non-falsy types
- `Complex` JavaScript non-falsy types
- `FalsyOrLiteral` JavaScript primitive types, including falsy values
- `Document<T = Complex>` An object made of string keys and non-falsy values. To add new types to values, use the `T` type parameter.
- `JsonOrString` A JSON, as a string or as a parsed object or array

## Advanced types/classes

- `TreeItem<T>` A generic tree
- `EmptyConstructorOf<T>` A type that implements a constructor without arguments
- `ClonableType<T>` A type that is clonable: it can be instantiated with a partial object

## Utility functions

- `isFalsyOrSpaces(value)` Check if a value is falsy or a string with only spaces, ignoring number 0
- `withoutProps(obj, ...props)` Clones an object, optionally removing a list of properties
- `equals(a, b)` Checks if two objects are equal using the `equals` method or strict equality
- `getMethods(obj)` List all methods of an object and its prototypes