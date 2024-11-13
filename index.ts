/**
 * Remove all properties from T that are assignable to U
 */
export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

/**
 * Exclusive OR between two types
 */
export type TypeXOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

/**
 * JavaScript falsy types
 */
export type Falsy = undefined | null | false | 0 | '';

/**
 * JavaScript primitive types accepted as index signatures
 */
export type PrimitiveValidIndexSignature = string | number | symbol;

/**
 * JavaScript primitive non-falsy types
 */
export type Primitive = PrimitiveValidIndexSignature | boolean;

/**
 * JavaScript non-falsy types
 */
export type Complex = Primitive | Array<Primitive> | {
  [k: PrimitiveValidIndexSignature]: Complex
} | Date;

/**
 * JavaScript primitive types, including falsy values
 */
export type FalsyOrLiteral = Falsy | Primitive;

/**
 * An object made of string keys and non-falsy values. To add new types to values, use the `T` type parameter
 * @template T?=Complex
 */
export type Document<T = Complex> = Record<string, Complex | T>;

/**
 * A JSON, as a string or as a parsed object
 */
export type JsonOrString = Document | Document[] | string;

/**
 * A generic tree
 */
export type TreeItem<T> = T & { children: TreeItem<T>[] };

/**
 * A type that implements a constructor without arguments
 */
export interface EmptyConstructorOf<T> {
  new(): T;
}

/**
 * A type that is clonable: it can be instantiated with a partial object
 * @export
 * @class ClonableType
 * @template T
 */
export class ClonableType<T> {
  /**
   * Creates an instance of ClonableType with a partial object to be copied.
   * @param {Partial<T>} [obj]
   * @memberof ClonableType
   */
  constructor(obj?: Partial<T>) {
    if (obj) Object.assign(this, obj);
  }
}

/**
 * Check if a value is falsy or a string with only spaces, ignoring number 0
 * @returns boolean
 */
export const isFalsyOrSpaces = (i: FalsyOrLiteral) => {
  if (typeof i === 'number' && i === 0) return false;
  return ((typeof i === 'string' && i.trim() === '') || (!i));
};

/**
 * Clones an object, optionally removing a list of properties
 * @export
 * @template T
 * @template K
 * @param {T} obj The object to clone
 * @param {...K[]} props The properties to remove
 * @return {*}  {Omit<T, K>}
 */
export function withoutProps
  <T extends Document, K extends keyof T>(
  obj: T,
  ...props: K[]
): Omit<T, K> {
  const { ...rest } = obj;
  props.forEach(prop => {
    delete rest[prop];
  });
  return rest;
}

/**
 * Checks if two objects are equal using the `equals` method or strict equality
 */
export function equals(a: any, b: any): boolean {
  return (a === b) || (typeof a.equals === 'function' && a.equals(b));
}

/**
 * List all methods of an object and its prototypes
 */
export function getMethods(obj): string[] {
  const properties = new Set<PrimitiveValidIndexSignature>();
  let currentObj = obj;
  do {
    Object.getOwnPropertyNames(currentObj).map(item => properties.add(item));
  // eslint-disable-next-line no-cond-assign
  } while ((currentObj = Object.getPrototypeOf(currentObj)));
  return [...properties.keys()]
    .filter(item => typeof obj[item] === 'function')
    .map(i => i.toString());
}
