# Browser demo

Run `pnpm dev` from the repository root to develop the library and browser demo together. Build the demo with `pnpm build:demo` after building the library.

The Vanilla SPA keeps its existing `#/getting-started`, `#/examples`, and `#/example01` through `#/example19` URLs. Each route loads its view model, HTML, and example-specific assets when selected. Returning to a route creates a fresh view model; downloaded modules remain cached by the browser.

When navigation changes during a route load, only the latest selection can mount. The renderer calls the previous model's `unmount()` before replacing its DOM, and releases the active model and navigation listeners when the page unloads. Failed route imports display a retry message and leave navigation available.
