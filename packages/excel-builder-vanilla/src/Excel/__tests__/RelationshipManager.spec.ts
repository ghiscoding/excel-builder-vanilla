import { describe, expect, test } from 'vitest';

import { RelationshipManager } from '../RelationshipManager.js';

describe('RelationshipManager', () => {
  test('toXML with targetMode', () => {
    const rm = new RelationshipManager();
    rm.relations = { id1: { id: 'rId1', schema: 'schema', object: { target: 'target', targetMode: 'External' } } } as any;
    expect(() => rm.toXML()).not.toThrow();
  });
});
