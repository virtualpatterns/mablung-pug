"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transform = void 0;

var _mablungWorker = require("@virtualpatterns/mablung-worker");

const Require = require;

class Transform extends _mablungWorker.ForkedProcess {
  constructor(parameter = {}, option = {}) {
    super(Require.resolve("../../command/transform.cjs"), parameter, option);
    this.writeTo('process/log/transform.log');
  }

}

exports.Transform = Transform;
//# sourceMappingURL=transform.cjs.map