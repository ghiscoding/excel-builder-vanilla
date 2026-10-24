import { describe, expect, it, vi } from 'vitest';

import { Renderer } from '../renderer.js';

describe('demo renderer lifecycle', () => {
  it('unmounts the old view while its DOM still exists and disposes the active model once', () => {
    const content = document.createElement('div');
    const renderer = new Renderer(content);
    const unmountFirst = vi.fn(() => expect(content.textContent).toBe('First'));
    const mountSecond = vi.fn(() => expect(content.textContent).toBe('Second'));
    const unmountSecond = vi.fn();
    renderer.render(
      '<p>First</p>',
      class {
        unmount = unmountFirst;
      },
    );
    renderer.render(
      '<p>Second</p>',
      class {
        mount = mountSecond;
        unmount = unmountSecond;
      },
    );
    expect(unmountFirst).toHaveBeenCalledOnce();
    expect(mountSecond).toHaveBeenCalledOnce();

    renderer.dispose();
    renderer.dispose();
    expect(unmountSecond).toHaveBeenCalledOnce();
  });

  it('disposes a partially mounted model when initialization fails', () => {
    const renderer = new Renderer(document.createElement('div'));
    const error = new Error('mount failed');
    const unmount = vi.fn();
    expect(() =>
      renderer.render(
        '<p>Broken</p>',
        class {
          mount() {
            throw error;
          }
          unmount = unmount;
        },
      ),
    ).toThrow(error);
    renderer.dispose();
    expect(unmount).toHaveBeenCalledOnce();
  });
});
