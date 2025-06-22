export function valueCannotBeEmpty<T>(value: T | null | undefined): value is T {
  if (!value) return false;
  if (typeof value === "string") {
    return value.trim() !== "";
  }
  if (typeof value === "number") {
    return !isNaN(value);
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (typeof value === "object") {
    return Object.keys(value).length > 0;
  }

  return true;
}

export function valuesCannotBeEmpty<T>(
  ...values: (T | null | undefined)[]
): boolean {
  return values.every(valueCannotBeEmpty);
}
