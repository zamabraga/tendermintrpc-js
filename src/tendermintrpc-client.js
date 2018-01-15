const { EventEmitter } = require('events')
const axios = require('axios')

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
    return this._makeRequest({ method: 'status' })
  }

  /**
   * make a http request
   * @param {*} method tendermint method name
   * @param {*} params data send in request
   */
  _makeRequest({ method, params } = {}) {
    return axios({
      method: 'post',
      url: this._url,
      data: {
        method,
        jsonrpc: '2.0',
        params,
        id: 'dontcare'
      }
    })
      .then(({ data }) => {
        this.emit(method, data)
        return data
      })
      .catch((error) => {
        this.emit('error', error)
        return error
      })
  }
}
