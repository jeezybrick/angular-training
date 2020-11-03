export function doSomething(val: string): string {
  return val;
}

export function doSomethingElse(val: string): string {
  return val;
}

export function isAbsoluteUrl(url: string): boolean {
  const absolutePattern = /^https?:\/\//i;
  return absolutePattern.test(url);
}

export function coerceBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== 'false';
}
