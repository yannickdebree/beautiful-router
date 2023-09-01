import Sanitizer from "./sanitizer";

export default class HTMLSanitizer implements Sanitizer {
  clean(htmlToClean: string): string {
    return htmlToClean.replace(/<script.*\<\/script>/, "");
  }
}
