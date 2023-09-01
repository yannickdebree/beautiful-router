export default interface Sanitizer {
  clean(stringToClean: string): string;
}