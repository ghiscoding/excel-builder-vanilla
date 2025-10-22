import { describe, expect, it } from 'vitest';

import { htmlEscape } from '../escape.js';

describe('htmlEscape', () => {
  it('should escape special HTML characters', () => {
    expect(htmlEscape('&')).toBe('&amp;');
    expect(htmlEscape('<')).toBe('&lt;');
    expect(htmlEscape('>')).toBe('&gt;');
    expect(htmlEscape('"')).toBe('&quot;');
    expect(htmlEscape("'")).toBe('&#39;');
  });

  it('should escape multiple special characters in a string', () => {
    expect(htmlEscape('fred, barney, & pebbles')).toBe('fred, barney, &amp; pebbles');
    expect(htmlEscape('<script>alert("XSS");</script>')).toBe('&lt;script&gt;alert(&quot;XSS&quot;);&lt;/script&gt;');
  });

  it('should convert non-string inputs to strings', () => {
    expect(htmlEscape(123 as any)).toBe('123');
    expect(htmlEscape(null as any)).toBe('null');
    expect(htmlEscape(undefined as any)).toBe('undefined');
    expect(htmlEscape(true as any)).toBe('true');
  });

  it('should not modify strings without special characters', () => {
    expect(htmlEscape('normal text')).toBe('normal text');
    expect(htmlEscape('')).toBe('');
  });

  it('should handle mixed special and normal characters', () => {
    expect(htmlEscape('Tom & Jerry < cartoon > "quote" \'test\'')).toBe(
      'Tom &amp; Jerry &lt; cartoon &gt; &quot;quote&quot; &#39;test&#39;',
    );
  });

  it('should work with repeated special characters', () => {
    expect(htmlEscape('&&<<>>""\'\'')).toBe('&amp;&amp;&lt;&lt;&gt;&gt;&quot;&quot;&#39;&#39;');
  });
});
