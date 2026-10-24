import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { App } from '../app.js';
import type { ViewModel, ViewRoute } from '../interfaces.js';

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

describe('demo SPA routing', () => {
  let app: App;
  const homeMount = vi.fn();
  const homeUnmount = vi.fn();
  const firstMount = vi.fn();
  const firstUnmount = vi.fn();
  const secondMount = vi.fn();
  let home: ViewRoute;
  let first: ViewRoute;
  let second: ViewRoute;

  beforeEach(() => {
    vi.resetAllMocks();
    document.body.innerHTML = '<div id="app"></div>';
    window.history.replaceState({}, '', '/#/getting-started');
    home = {
      name: 'getting-started',
      title: 'Home',
      view: '/home.html',
      viewModel: vi.fn(async () => ({
        default: class {
          mount = homeMount;
          unmount = homeUnmount;
        },
      })),
    };
    first = {
      name: 'example01',
      title: 'First',
      view: '/first.html',
      viewModel: vi.fn(async () => ({
        default: class {
          mount = firstMount;
          unmount = firstUnmount;
        },
      })),
    };
    second = {
      name: 'example02',
      title: 'Second',
      view: '/second.html',
      viewModel: vi.fn(async () => ({
        default: class {
          mount = secondMount;
        },
      })),
    };
    app = new App(
      [home, { name: 'documentation', title: 'Docs', href: 'https://example.com/docs' }],
      [{ name: 'Examples', routes: [first, second] }],
      {
        '/home.html': async () => '<p>Home view</p>',
        '/first.html': async () => '<button>First view</button>',
        '/second.html': async () => '<button>Second view</button>',
      },
    );
  });

  afterEach(() => {
    app.destroy();
    vi.restoreAllMocks();
  });

  it('loads only the selected route and disposes its model before replacing its DOM', async () => {
    homeUnmount.mockImplementation(() => expect(document.querySelector('.panel-wm-content')!.textContent).toBe('Home view'));
    await app.init();
    expect(homeMount).toHaveBeenCalledOnce();
    expect(first.viewModel).not.toHaveBeenCalled();
    expect(second.viewModel).not.toHaveBeenCalled();

    await app.loadRoute(first.name);
    expect(homeUnmount).toHaveBeenCalledOnce();
    expect(firstMount).toHaveBeenCalledOnce();
    expect(window.location.hash).toBe('#/example01');
    expect(document.querySelector('#example01')!.classList.contains('active')).toBe(true);

    await app.loadRoute(second.name);
    expect(firstUnmount).toHaveBeenCalledOnce();
    expect(secondMount).toHaveBeenCalledOnce();
  });

  it('never mounts a stale import that finishes after a newer route', async () => {
    await app.init();
    const slow = deferred<{ default: new () => ViewModel }>();
    first.viewModel = vi.fn(() => slow.promise);
    const pending = app.loadRoute(first.name);
    await app.loadRoute(second.name);
    slow.resolve({
      default: class {
        mount = firstMount;
      },
    });
    await pending;

    expect(firstMount).not.toHaveBeenCalled();
    expect(secondMount).toHaveBeenCalledOnce();
    expect(document.querySelector('.panel-wm-content')!.textContent).toBe('Second view');
    expect(document.title).toContain('example02');
    expect(window.location.hash).toBe('#/example02');
  });

  it('handles load errors and can navigate successfully afterward', async () => {
    await app.init();
    const error = new Error('Unable to fetch module');
    first.viewModel = vi.fn(async () => {
      throw error;
    });
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    await app.loadRoute(first.name);
    expect(document.querySelector('.panel-wm-content')!.textContent).toContain('Unable to load');
    expect(document.querySelector('.panel-wm-content')!.hasAttribute('aria-busy')).toBe(false);
    expect(log).toHaveBeenCalledWith('Failed to load route: example01', error);

    await app.loadRoute(second.name);
    expect(secondMount).toHaveBeenCalledOnce();
    expect(document.querySelector('.panel-wm-content')!.textContent).toBe('Second view');
  });

  it('invalidates pending imports and unbinds navigation when disposed', async () => {
    await app.init();
    const slow = deferred<{ default: new () => ViewModel }>();
    first.viewModel = vi.fn(() => slow.promise);
    const pending = app.loadRoute(first.name);
    app.destroy();
    app.destroy();
    slow.resolve({
      default: class {
        mount = firstMount;
      },
    });
    await pending;
    document.querySelector('#example02')!.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    window.dispatchEvent(new PopStateEvent('popstate'));

    expect(firstMount).not.toHaveBeenCalled();
    expect(second.viewModel).not.toHaveBeenCalled();
    expect(homeUnmount).toHaveBeenCalledOnce();
  });

  it('supports browser history and falls back from an unknown route', async () => {
    await app.init();
    await app.loadRoute(first.name);
    window.history.replaceState({}, '', '/#/example02');
    window.dispatchEvent(new PopStateEvent('popstate'));
    await vi.waitFor(() => expect(secondMount).toHaveBeenCalledOnce());
    expect(firstUnmount).toHaveBeenCalledOnce();

    await app.loadRoute('missing-route');
    expect(document.querySelector('.panel-wm-content')!.textContent).toBe('Home view');
    expect(window.location.hash).toBe('#/getting-started');
    expect(document.querySelector<HTMLAnchorElement>('#documentation')!.href).toBe('https://example.com/docs');
  });
});
