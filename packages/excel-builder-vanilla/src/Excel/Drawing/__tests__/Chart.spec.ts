import { describe, expect, it } from 'vitest';

import { Chart } from '../Chart.js';

describe('Chart', () => {
  it('can be instantiated', () => {
    const chart = new Chart();
    expect(chart).toBeInstanceOf(Chart);
  });
});
