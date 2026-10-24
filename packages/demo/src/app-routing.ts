import type { Route, RouteGroup } from './interfaces.js';

export const navbarRouting: Route[] = [
  { name: 'getting-started', view: '/src/getting-started.html', viewModel: () => import('./getting-started.js'), title: 'Getting Started' },
  { name: 'examples', view: '/src/examples/example01.html', viewModel: () => import('./examples/example01.js'), title: 'Examples' },
  { name: 'documentation', href: 'https://ghiscoding.gitbook.io/excel-builder-vanilla/', title: '📘 Documentation' },
];

export const exampleRouting: RouteGroup[] = [
  {
    name: 'References',
    routes: [{ name: 'documentation', href: 'https://ghiscoding.gitbook.io/excel-builder-vanilla/', title: '📘 Documentation' }],
  },
  {
    name: 'Examples',
    routes: [
      {
        name: 'example01',
        view: '/src/examples/example01.html',
        viewModel: () => import('./examples/example01.js'),
        title: '01- Create Worksheet',
      },
      {
        name: 'example02',
        view: '/src/examples/example02.html',
        viewModel: () => import('./examples/example02.js'),
        title: '02- Sizing/Collapsing Columns',
      },
      {
        name: 'example03',
        view: '/src/examples/example03.html',
        viewModel: () => import('./examples/example03.js'),
        title: '03- Setting row information',
      },
      {
        name: 'example04',
        view: '/src/examples/example04.html',
        viewModel: () => import('./examples/example04.js'),
        title: '04- Fonts and Colors',
      },
      {
        name: 'example05',
        view: '/src/examples/example05.html',
        viewModel: () => import('./examples/example05.js'),
        title: '05- Number, Date, etc Formatting',
      },
      {
        name: 'example06',
        view: '/src/examples/example06.html',
        viewModel: () => import('./examples/example06.js'),
        title: '06- Alignment',
      },
      {
        name: 'example07',
        view: '/src/examples/example07.html',
        viewModel: () => import('./examples/example07.js'),
        title: '07- Backgroud Fillers',
      },
      {
        name: 'example08',
        view: '/src/examples/example08.html',
        viewModel: () => import('./examples/example08.js'),
        title: '08- Formulas',
      },
      { name: 'example09', view: '/src/examples/example09.html', viewModel: () => import('./examples/example09.js'), title: '09- Tables' },
      {
        name: 'example10',
        view: '/src/examples/example10.html',
        viewModel: () => import('./examples/example10.js'),
        title: '10- Theming Tables',
      },
      {
        name: 'example11',
        view: '/src/examples/example11.html',
        viewModel: () => import('./examples/example11.js'),
        title: '11- Theming Summaries',
      },
      {
        name: 'example12',
        view: '/src/examples/example12.html',
        viewModel: () => import('./examples/example12.js'),
        title: '12- Worksheet Headers/Footers',
      },
      {
        name: 'example13',
        view: '/src/examples/example13.html',
        viewModel: () => import('./examples/example13.js'),
        title: '13- Pictures with 2 anchors',
      },
      {
        name: 'example14',
        view: '/src/examples/example14.html',
        viewModel: () => import('./examples/example14.js'),
        title: '14- Pictures with different anchors',
      },
      {
        name: 'example15',
        view: '/src/examples/example15.html',
        viewModel: () => import('./examples/example15.js'),
        title: '15- Streaming Excel Export',
      },
      {
        name: 'example16',
        view: '/src/examples/example16.html',
        viewModel: () => import('./examples/example16.js'),
        title: '16- Streaming Features Demo',
      },
      {
        name: 'example17',
        view: '/src/examples/example17.html',
        viewModel: () => import('./examples/example17.js'),
        title: '17- Streaming Export with Images',
      },
      { name: 'example18', view: '/src/examples/example18.html', viewModel: () => import('./examples/example18.js'), title: '18- Charts' },
      {
        name: 'example19',
        view: '/src/examples/example19.html',
        viewModel: () => import('./examples/example19.js'),
        title: '19- Custom Functions (LAMBDA)',
      },
    ],
  },
];
