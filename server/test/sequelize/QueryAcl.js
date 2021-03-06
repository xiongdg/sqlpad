const assert = require('assert');
const TestUtils = require('../utils');

describe('QueryAcl', function() {
  const utils = new TestUtils();

  before(function() {
    return utils.init();
  });

  it('write defaults to false', async function() {
    const sdb = utils.sequelizeDb;
    const queryAcl = await sdb.QueryAcl.create({
      queryId: 'foo',
      userId: 'bar'
    });
    assert(queryAcl.id);
    assert.strictEqual(queryAcl.queryId, 'foo');
    assert.strictEqual(queryAcl.userId, 'bar');
    assert.strictEqual(queryAcl.write, false);
  });

  it('honors unique constraint on queryId & userId', async function() {
    await assert.rejects(async () => {
      await utils.models.queryAcl.create({
        queryId: 'q1',
        userId: 'u1'
      });
      await utils.models.queryAcl.create({
        queryId: 'q1',
        userId: 'u1'
      });
    });
  });
});
