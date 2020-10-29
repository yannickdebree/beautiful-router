export function navigate(title: string, link: string): void {
  window.history.pushState({ title, link }, title, link);
}
