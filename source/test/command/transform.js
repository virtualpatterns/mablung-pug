import { ForkedProcess } from '@virtualpatterns/mablung-worker'

const Require = __require

class Transform extends ForkedProcess {

  constructor(parameter = {}, option = {}) {
    super(Require.resolve('../../command/transform.js'), parameter, option)
    this.writeTo('process/log/transform.log')
  }
  
}

export { Transform }