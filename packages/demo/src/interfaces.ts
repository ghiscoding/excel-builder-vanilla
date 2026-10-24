export interface ViewModel {
  mount?: () => void;
  unmount?: () => void;
}

export interface ViewRoute {
  name: string;
  title: string;
  view: string;
  viewModel: () => Promise<{ default: new () => ViewModel }>;
}

export interface ExternalRoute {
  name: string;
  title: string;
  href: string;
}

export type Route = ViewRoute | ExternalRoute;

export interface RouteGroup {
  name: string;
  routes: Route[];
}

export type ViewLoaders = Record<string, () => Promise<string>>;
