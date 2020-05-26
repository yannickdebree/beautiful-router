export interface Sanitizer {
  clean(stringToClean: string): string;
}

export class HTMLSanitizer implements Sanitizer {
  public clean(htmlToClean: string): string {
    return htmlToClean.replace(/<script.*\<\/script>/, "");
  }
}
