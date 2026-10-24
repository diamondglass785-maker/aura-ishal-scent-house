import { describe, expect, it } from 'vitest';
import { portableMediaPath } from '../../scripts/netlify-media.mjs';
import aura from '../assets/uploads/aura-original.jpg.asset.json';
import ishal from '../assets/uploads/ishal-original.jpg.asset.json';
import mp4 from '../assets/uploads/brand-film.mp4.asset.json';
import webm from '../assets/uploads/brand-film.webm.asset.json';

describe('Portable Netlify media filenames', () => {
  it('maps both original product photos to exact portable filenames', () => {
    expect(portableMediaPath(aura)).toBe('/media/aura-original.jpg');
    expect(portableMediaPath(ishal)).toBe('/media/ishal-original.jpg');
  });
  it('preserves both original video formats', () => {
    expect(portableMediaPath(mp4)).toBe('/media/brand-film.mp4');
    expect(portableMediaPath(webm)).toBe('/media/brand-film.webm');
  });
  it('rejects filenames which escape the media folder', () => {
    expect(() => portableMediaPath({ original_filename: '../aura-original.jpg' })).toThrow('Invalid media filename');
  });
});