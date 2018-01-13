const assert = require('assert')
const TendermintRPCClient = require('./../src/tendermintrpc-client')

describe('JSONRPC', () => {
  const client = new TendermintRPCClient()

  describe('#over HTTP', () => {
    Object.getOwnPropertyNames(TendermintRPCClient.prototype)
      .filter((e) => e !== 'constructor')
      .forEach((t) => {
        it(`shoud request method ${t}`, async () => {
          const { data } = await client[t]()
          const { jsonrpc, id } = data
          assert.equal(jsonrpc, '2.0')
          assert.equal(id, 'dontcare')
        })
      })
  })
})
