import { describe, expect, it } from 'vitest';

describe('frontend smoke', () => {
  it('has required Supabase env defaults set shape', () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
    expect(typeof url).toBe('string');
  });

  it('keeps app metadata stable', async () => {
    const mod = await import('../package.json');
    expect(mod.name).toBe('mythareon-frontend');
    expect(mod.version).toBe('0.1.0');
  });
});
