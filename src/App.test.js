import { describe, expect, it } from 'vitest';
import { normalizeRecipeSteps, getYoutubeVideoId } from './App.jsx';

describe('recipe step helpers', () => {
  it('normalizes step objects with explicit start/end values', () => {
    const steps = [
      { text: 'step 1', start: 0, end: 15 },
      { text: 'step 2', start: 16, end: 40 }
    ];

    expect(normalizeRecipeSteps(steps)).toEqual([
      { text: 'step 1', start: 0, end: 15 },
      { text: 'step 2', start: 16, end: 40 }
    ]);
  });

  it('extracts video ids from embed and watch urls', () => {
    expect(getYoutubeVideoId('https://www.youtube.com/embed/abc123XYZ')).toBe('abc123XYZ');
    expect(getYoutubeVideoId('https://www.youtube.com/watch?v=abc123XYZ')).toBe('abc123XYZ');
  });
});
