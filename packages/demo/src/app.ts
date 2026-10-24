import { exampleRouting, navbarRouting } from './app-routing.js';
import type { Route, RouteGroup, ViewLoaders, ViewRoute } from './interfaces.js';
import mainHtml from './main.html?raw';
import { Renderer } from './renderer.js';

const pageLayoutGlobs = import.meta.glob<string>(['/src/getting-started.html', '/src/examples/*.html'], {
  query: '?raw',
  import: 'default',
});

export class App {
  private _renderer?: Renderer;
  private _content?: HTMLElement;
  private _routeLoadId = 0;
  private _disposed = false;
  private _listeners: { target: EventTarget; name: string; listener: EventListener }[] = [];
  private readonly _defaultRouteName = 'getting-started';

  constructor(
    private readonly _navbarRoutes: Route[] = navbarRouting,
    private readonly _exampleRoutes: RouteGroup[] = exampleRouting,
    private readonly _views: ViewLoaders = pageLayoutGlobs,
  ) {}

  async init() {
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = mainHtml;
    this._content = document.querySelector<HTMLElement>('.panel-wm-content')!;
    this._renderer = new Renderer(this._content);
    this._disposed = false;
    this.createRouteLinks();
    this.bind(window, 'popstate', () => {
      void this.loadRoute(this.getLocationRoute(), false);
    });
    this.bind(window, 'beforeunload', () => this.destroy());
    await this.loadRoute(this.getLocationRoute(), false);
  }

  async loadRoute(routeName: string, changeBrowserState = true) {
    if (this._disposed || !this._renderer || !this._content) {
      return;
    }

    const routes = [...this._navbarRoutes, ...this._exampleRoutes.flatMap(group => group.routes)];
    const foundRoute = routes.find(route => route.name === routeName && 'view' in route);
    const route = (foundRoute ?? routes.find(route => route.name === this._defaultRouteName && 'view' in route)) as ViewRoute | undefined;
    if (!route) {
      return;
    }

    const loadId = ++this._routeLoadId;
    this._renderer.dispose();
    this._content.textContent = 'Loading...';
    this._content.setAttribute('aria-busy', 'true');
    this._content.classList.remove('cloak');
    this.updateActiveLinks(route.name);
    document.title = `Excel-Builder-Vanilla · ${route.name}`;

    if (changeBrowserState && window.location.hash !== `#/${route.name}`) {
      const baseUrl = window.location.origin + window.location.pathname;
      window.history.pushState({}, route.name, `${baseUrl}#/${route.name}`);
    }

    try {
      const loadView = this._views[route.view];
      if (!loadView) {
        throw new Error(`Missing view for route: ${route.name}`);
      }
      const [viewModelModule, html] = await Promise.all([route.viewModel(), loadView()]);

      // Imports cannot be cancelled, so only the most recent navigation can render.
      if (this._disposed || loadId !== this._routeLoadId) {
        return;
      }
      this._renderer.render(html, viewModelModule.default);
    } catch (error) {
      if (!this._disposed && loadId === this._routeLoadId) {
        this._content.textContent = 'Unable to load this example. Please try again.';
        console.error(`Failed to load route: ${route.name}`, error);
      }
    } finally {
      if (!this._disposed && loadId === this._routeLoadId) {
        this._content.removeAttribute('aria-busy');
      }
    }
  }

  destroy() {
    if (this._disposed) {
      return;
    }
    this._disposed = true;
    ++this._routeLoadId;
    this._listeners.forEach(({ target, name, listener }) => {
      target.removeEventListener(name, listener);
    });
    this._listeners = [];
    this._renderer?.dispose();
    this._renderer = undefined;
    this._content?.removeAttribute('aria-busy');
    this._content = undefined;
  }

  private getLocationRoute() {
    return window.location.hash.replace(/^#\/?/, '') || this._defaultRouteName;
  }

  private createRouteLinks() {
    const navbar = document.querySelector('.navbar-nav')!;
    this._navbarRoutes.forEach(route => {
      navbar.appendChild(this.createRouteLink(route));
    });

    const examples = document.querySelector('.nav-pills')!;
    for (const group of this._exampleRoutes) {
      const heading = document.createElement('li');
      heading.className = 'm-1';
      const label = document.createElement('p');
      label.className = 'navbar-vertical-label mb-1';
      label.textContent = group.name;
      heading.appendChild(label);
      examples.appendChild(heading);
      group.routes.forEach(route => {
        examples.appendChild(this.createRouteLink(route));
      });
    }
  }

  private createRouteLink(route: Route) {
    const item = document.createElement('li');
    item.className = 'nav-item';
    const link = document.createElement('a');
    link.id = route.name;
    link.className = 'nav-link';
    link.textContent = route.title;
    item.appendChild(link);

    if ('href' in route) {
      link.href = route.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.href = `#/${route.name}`;
      this.bind(link, 'click', event => {
        const click = event as MouseEvent;
        if (click.ctrlKey || click.metaKey || click.shiftKey || click.altKey || click.button !== 0) {
          return;
        }
        event.preventDefault();
        void this.loadRoute(route.name);
      });
    }
    return item;
  }

  private updateActiveLinks(routeName: string) {
    document.querySelectorAll<HTMLAnchorElement>('.panel-wm-left a.nav-link,.navbar-nav a.nav-link').forEach(link => {
      const active =
        link.id === routeName ||
        (link.id === 'examples' && this._exampleRoutes.some(group => group.routes.some(route => route.name === routeName)));
      link.classList.toggle('active', active);
    });
    if (routeName === 'examples') {
      document.querySelector('.nav-pills a[href="#/example01"]')?.classList.add('active');
    }
  }

  private bind(target: EventTarget, name: string, listener: EventListener) {
    target.addEventListener(name, listener);
    this._listeners.push({ target, name, listener });
  }
}
