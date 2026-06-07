import { describe, expect, it } from 'vitest';
import { render } from './helper';
import { MyApp } from '../src/my-app';

describe('my-app', () => {
  it('renders the welcome message', async () => {
    const node = (await render('<my-app></my-app>', MyApp)).firstElementChild;

    expect(node?.textContent?.trim()).toBe('Hello World!');
  });
});
