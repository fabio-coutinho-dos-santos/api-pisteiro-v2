export class ShortHashService {
  constructor() {}

  static getHash(text: string) {
    var hash = 5381,
      index = text.length;
    while (index) {
      hash = (hash * 33) ^ text.charCodeAt(--index);
    }
    return (hash >>> 0).toString(16);
  }
}
