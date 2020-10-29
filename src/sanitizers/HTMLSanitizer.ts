import { Sanitizer } from "./Sanitizer";

export class HTMLSanitizer implements Sanitizer {
  clean(htmlToClean: string) {
    return htmlToClean.replace(/<script.*\<\/script>/, "");
  }
}
