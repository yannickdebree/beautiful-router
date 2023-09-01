import Sanitizer from "./sanitizer";

export default class HTMLSanitizer implements Sanitizer {
  clean(htmlToClean: string) {
    return htmlToClean.replace(/<script.*\<\/script>/, "");
  }
}
