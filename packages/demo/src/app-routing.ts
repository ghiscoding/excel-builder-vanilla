import Example01 from './examples/example01.js';
import Example02 from './examples/example02.js';
import Example03 from './examples/example03.js';
import Example04 from './examples/example04.js';
import Example05 from './examples/example05.js';
import Example06 from './examples/example06.js';
import Example07 from './examples/example07.js';
import Example08 from './examples/example08.js';
import Example09 from './examples/example09.js';
import Example10 from './examples/example10.js';
import Example11 from './examples/example11.js';
import Example12 from './examples/example12.js';
import GettingStarted from './getting-started.js';

export const navbarRouting = [
  { name: 'getting-started', view: '/src/getting-started.html', viewModel: GettingStarted, title: 'Getting Started' },
  { name: 'examples', view: '/src/examples/example01.html', viewModel: Example01, title: 'Examples' },
  { name: 'documentation', href: 'https://ghiscoding.gitbook.io/excel-builder-vanilla/', title: '📘 Documentation' },
];

export const exampleRouting = [
  {
    name: 'References',
    routes: [{ name: 'documentation', href: 'https://ghiscoding.gitbook.io/excel-builder-vanilla/', title: '📘 Documentation' }],
  },
  {
    name: 'Examples',
    routes: [
      { name: 'example01', view: '/src/examples/example01.html', viewModel: Example01, title: '01- Create Worksheet' },
      { name: 'example02', view: '/src/examples/example02.html', viewModel: Example02, title: '02- Sizing/Collapsing Columns' },
      { name: 'example03', view: '/src/examples/example03.html', viewModel: Example03, title: '03- Setting row information' },
      { name: 'example04', view: '/src/examples/example04.html', viewModel: Example04, title: '04- Fonts and Colors' },
      { name: 'example05', view: '/src/examples/example05.html', viewModel: Example05, title: '05- Number, Date, etc Formatting' },
      { name: 'example06', view: '/src/examples/example06.html', viewModel: Example06, title: '06- Alignment' },
      { name: 'example07', view: '/src/examples/example07.html', viewModel: Example07, title: '07- Backgroud Fillers' },
      { name: 'example08', view: '/src/examples/example08.html', viewModel: Example08, title: '08- Formulas' },
      { name: 'example09', view: '/src/examples/example09.html', viewModel: Example09, title: '09- Tables' },
      { name: 'example10', view: '/src/examples/example10.html', viewModel: Example10, title: '10- Theming Tables' },
      { name: 'example11', view: '/src/examples/example11.html', viewModel: Example11, title: '11- Theming Summaries' },
      { name: 'example12', view: '/src/examples/example12.html', viewModel: Example12, title: '12- Worksheet Headers/Footers' },
    ],
  },
];
