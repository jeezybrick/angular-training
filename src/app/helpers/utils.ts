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

export function getProfileFullName(value: { firstName: string; lastName: string; preferredName?: string | null }): string {
  if (!value) {
    return '';
  }
  if ('preferredName' in value && value.preferredName) {
    return value.preferredName;
  }

  return `${value.firstName} ${value.lastName}`;
}
