export class Navigation {
  public static navigate(title: string, link): void {
    window.history.pushState({}, title, link);
  }
}
