import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';

import { exampleRouting, navbarRouting } from './app-routing.js';
import mainHtml from './main.html?raw';
import './style.scss';

const pageLayoutGlobs = import.meta.glob('/src/./**/*.html', { query: '?raw', eager: true, import: 'default' });

interface ViewRouter {
  name: string;
  view: string;
  viewModel: any;
  title: string;
}

interface ViewModel {
  mount?: () => void;
  unmount?: () => void;
}

class Main {
  loading = true;
  currentModel?: ViewModel;
  currentRouter?: ViewRouter;
  defaultRouteName = 'getting-started';
  stateBangChar = '#/';
  baseUrl = window.location.origin + window.location.pathname;
  viewModelObj: any = {};

  async init() {
    const location = window.location;
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = mainHtml;

    let route = location.hash.replace(this.stateBangChar, '');
    if (!route || route === '/' || route === '#') {
      route = this.defaultRouteName;
    }

    // create all routes and always load first route Example01
    this.createRouteLinks();
    this.loadRoute(route);

    // on page load make route active, when changing route afterward that will be covered by each nav click events
    Array.from(document.querySelectorAll('.panel-wm-left a.nav-link,.navbar-nav a.nav-link')).forEach(link => {
      if (link.id && route.includes(link.id)) {
        link.classList.add('active');
      }
    });

    // re-render on browser history navigation change
    window.onpopstate = () => {
      const winLoc = window.location;
      const prevRoute = winLoc.hash.replace(this.stateBangChar, '');

      // change active link to previous route
      this.removeAllActiveLinks();
      const navItemElm = document.querySelector(`#${prevRoute}`);
      if (navItemElm) {
        navItemElm.scrollIntoView();
        navItemElm.classList.add('active');
      }
      this.loadRoute(prevRoute || this.defaultRouteName, false);
    };
  }

  createRouteLinks() {
    for (const navRoute of navbarRouting) {
      // <li class="nav-item"><a class="nav-link" id="home">Home</a></li>
      const liElm = document.createElement('li');
      liElm.className = 'nav-item';
      const aElm = document.createElement('a');
      aElm.id = navRoute.name;
      aElm.className = 'nav-link';
      aElm.textContent = navRoute.title;
      liElm.appendChild(aElm);
      aElm.addEventListener('click', this.clickEventListener.bind(this));
      document.querySelector('.navbar-nav')?.appendChild(liElm);
    }

    for (const groupRoute of exampleRouting) {
      const groupLiElm = document.createElement('li');
      groupLiElm.className = 'm-1';
      const pElm = document.createElement('p');
      pElm.className = 'navbar-vertical-label mb-1';
      pElm.textContent = groupRoute.name;
      groupLiElm.appendChild(pElm);
      document.querySelector('.nav-pills')?.appendChild(groupLiElm);

      for (const singleRoute of groupRoute.routes) {
        // <li class="nav-item"><a class="nav-link" id="example01">Single Select</a></li>
        const liElm = document.createElement('li');
        liElm.className = 'nav-item';
        const aElm = document.createElement('a');
        aElm.id = singleRoute.name;
        aElm.className = 'nav-link';
        aElm.textContent = singleRoute.title;
        aElm.addEventListener('click', this.clickEventListener.bind(this));

        liElm.appendChild(aElm);
        document.querySelector('.nav-pills')?.appendChild(liElm);
      }
    }
  }

  async loadRoute(routeName: string, changeBrowserState = true) {
    const contentElm = document.querySelector('.panel-wm-content') as HTMLElement;
    contentElm.textContent = '';
    contentElm.classList.add('cloak');
    let foundRouter = navbarRouting.find(r => r.name === routeName);

    if (foundRouter?.name === 'examples') {
      const exampleElm = document.querySelector('.nav-pills .nav-item a.nav-link:not([href])');
      exampleElm?.classList.add('active');
    } else {
      for (const groupRoute of exampleRouting) {
        const found = (groupRoute.routes as ViewRouter[]).find(r => r.name === routeName);
        if (found) {
          foundRouter = found;
        }
      }
    }

    if (this.currentModel) {
      this.unmountCurrentVM(this.currentModel, this.currentRouter);
    }
    if (foundRouter?.view) {
      this.currentRouter = foundRouter;
      // const html = await import(/*@vite-ignore*/ `${foundRouter.view}?raw`).default;
      document.querySelector('.panel-wm-content')!.innerHTML = pageLayoutGlobs[foundRouter.view] as string;
      const vm = new foundRouter.viewModel() as ViewModel;
      this.currentModel = vm;
      (window as any)[foundRouter.name] = vm.mount?.();

      // before leaving the page/SPA, we'll unmount everything
      window.onbeforeunload = () => {
        contentElm.classList.add('cloak');
        vm.unmount?.();
        this.removeAllActiveLinks(true);
        this.unmountAll();
        if (foundRouter?.name) {
          delete (window as any)[foundRouter.name];
        }
      };
    }

    if (changeBrowserState) {
      window.history.pushState({}, routeName, `${this.baseUrl}${this.stateBangChar}${routeName}`);
    }
    document.title = `Excel-Builder-Vanilla · ${routeName}`;
    contentElm.classList.remove('cloak');
  }

  async clickEventListener(e: Event) {
    // change active link to new route
    const targetElm = e.target as HTMLElement;
    const foundRouter = navbarRouting.find(r => r.name === targetElm.id);
    if (foundRouter?.href) {
      window.open(foundRouter.href, '_blank');
      return;
    }

    // remove any active links
    this.removeAllActiveLinks();

    targetElm.classList.toggle('active');

    this.loadRoute(targetElm.id);
  }

  removeAllActiveLinks(unbindListeners = false) {
    document.querySelectorAll('.panel-wm-left a.nav-link,.navbar-nav a.nav-link').forEach(link => {
      link.classList.remove('active');
      if (unbindListeners) {
        link.removeEventListener('click', this.clickEventListener.bind(this) as EventListener);
      }
    });
  }

  unmountCurrentVM(vm: ViewModel, vr?: ViewRouter) {
    vm.unmount?.();
    if (vr) {
      delete (window as any)[vr.name];
    }
  }

  unmountAll() {
    for (const vmKey of Object.keys(this.viewModelObj)) {
      const viewModel = this.viewModelObj[vmKey];
      if (typeof viewModel?.unmount === 'function') {
        viewModel?.unmount();

        // also clear all of its variable references to avoid detached elements
        for (const ref of Object.keys(viewModel)) {
          viewModel[ref] = null;
        }
      }
      // nullify the object and then delete them to make sure they will be removed by the garbage collector
      (<any>window)[vmKey] = null;
      this.viewModelObj[vmKey] = null;
      delete (<any>window)[vmKey];
      delete this.viewModelObj[vmKey];
    }
  }
}

// execute main init
const main = new Main();
main.init();
