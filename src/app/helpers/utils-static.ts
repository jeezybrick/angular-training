// breaks tree-shaking
// https://medium.com/@OlegVaraksin/what-is-the-best-way-to-write-utilities-in-typescript-e3cae916fe30
// https://stackoverflow.com/questions/32790311/how-to-structure-utility-class
export default class Utils {
  static doSomething(val: string): string {
    return val;
  }

  static doSomethingElse(val: string): string {
    return val;
  }
}
