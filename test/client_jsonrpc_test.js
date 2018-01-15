const assert = require('assert')
const TendermintRPCClient = require('./../src/tendermintrpc-client')

describe('JSONRPC', () => {
  const client = new TendermintRPCClient()

  describe('#over HTTP', () => {
    const methods = Object.getOwnPropertyNames(TendermintRPCClient.prototype).filter(
      (e) => e !== 'constructor' && !e.startsWith('_')
    )
    methods.forEach((t) => {
      it(`should request method ${t}`, async (done) => {
        try {
          const data = await client[t]()
          const { jsonrpc, id } = data
          assert.equal(jsonrpc, '2.0')
          assert.equal(id, 'dontcare')
        } catch ({ message }) {
          done(message)
        }
      })
    })
    methods.forEach((t) => {
      it(`should listener event ${t}`, (done) => {
        client.on(t, (data) => {
          const { jsonrpc, id } = data
          assert.equal(jsonrpc, '2.0')
          assert.equal(id, 'dontcare')
          done()
        })
        client.on('error', ({ message }) => {
          done(message)
        })
        client[t]()
      })
    })
  })
})
