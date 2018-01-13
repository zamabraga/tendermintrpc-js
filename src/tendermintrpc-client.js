const { EventEmitter } = require('events')
const axios = require('axios')

/**
 * make a http request
 * @param {*} url address to request
 * @param {*} params data send in request
 */
const makeRequest = (url, params) => {
  return axios({
    method: 'post',
    url: url,
    data: {
      method: 'status',
      jsonrpc: '2.0',
      params: params || {},
      id: 'dontcare'
    }
  })
}
module.exports = class TenderMintRPCClient extends EventEmitter {
  /**
   * Creates an instance of TenderMintRPCClient.
   * @param {any} {url} tendermint rpc server
   */
  constructor({ url } = {}) {
    super()
    this._url = url || 'http://localhost:46657'
  }

  status() {
    return makeRequest(this._url)
  }
}
