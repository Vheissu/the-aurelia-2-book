import { describe, expect, it } from 'vitest';
import { MyApp } from '../src/my-app';

describe('my-app routes', () => {
  it('defines chapter routes', () => {
    expect(MyApp.routes.length).toBeGreaterThan(0);
    expect(MyApp.routes.some((route) => route.id === 'home')).toBe(true);
  });
});
