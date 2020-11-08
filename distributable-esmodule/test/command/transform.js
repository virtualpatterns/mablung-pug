import { createRequire as _createRequire } from "module";import { ForkedProcess } from '@virtualpatterns/mablung-worker';

const Require = _createRequire(import.meta.url);

class Transform extends ForkedProcess {

  constructor(parameter = {}, option = {}) {
    super(Require.resolve('../../command/transform.js'), parameter, option);
    this.writeTo('process/log/transform.log');
  }}



export { Transform };
//# sourceMappingURL=transform.js.map