import type { ViewModel } from './interfaces.js';

/** Owns the active view model and releases it before replacing its DOM. */
export class Renderer {
  private _viewModel?: ViewModel;

  constructor(private readonly _content: HTMLElement) {}

  render(html: string, ViewModelClass: new () => ViewModel) {
    this.dispose();
    this._content.innerHTML = html;
    this._viewModel = new ViewModelClass();

    try {
      this._viewModel.mount?.();
    } catch (error) {
      this.dispose();
      throw error;
    }
  }

  dispose() {
    const viewModel = this._viewModel;
    this._viewModel = undefined;
    viewModel?.unmount?.();
  }
}
