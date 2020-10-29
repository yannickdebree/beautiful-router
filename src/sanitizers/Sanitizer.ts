export interface Sanitizer {
  clean(stringToClean: string): string;
}