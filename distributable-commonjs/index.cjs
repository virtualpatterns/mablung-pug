"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _transform = require("./library/transform.cjs");

Object.keys(_transform).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _transform[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _transform[key];
    }
  });
});

var _utility = require("./library/utility.cjs");

Object.keys(_utility).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _utility[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _utility[key];
    }
  });
});

var _unrecognizedMessageTransformError = require("./library/error/unrecognized-message-transform-error.cjs");

Object.keys(_unrecognizedMessageTransformError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _unrecognizedMessageTransformError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _unrecognizedMessageTransformError[key];
    }
  });
});

var _unsupportedAttributeTransformError = require("./library/error/unsupported-attribute-transform-error.cjs");

Object.keys(_unsupportedAttributeTransformError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _unsupportedAttributeTransformError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _unsupportedAttributeTransformError[key];
    }
  });
});

var _unsupportedCodeTransformError = require("./library/error/unsupported-code-transform-error.cjs");

Object.keys(_unsupportedCodeTransformError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _unsupportedCodeTransformError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _unsupportedCodeTransformError[key];
    }
  });
});

var _unsupportedCommentTransformError = require("./library/error/unsupported-comment-transform-error.cjs");

Object.keys(_unsupportedCommentTransformError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _unsupportedCommentTransformError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _unsupportedCommentTransformError[key];
    }
  });
});

var _unsupportedDoctypeTransformError = require("./library/error/unsupported-doctype-transform-error.cjs");

Object.keys(_unsupportedDoctypeTransformError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _unsupportedDoctypeTransformError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _unsupportedDoctypeTransformError[key];
    }
  });
});

var _unsupportedTagTransformError = require("./library/error/unsupported-tag-transform-error.cjs");

Object.keys(_unsupportedTagTransformError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _unsupportedTagTransformError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _unsupportedTagTransformError[key];
    }
  });
});
//# sourceMappingURL=index.cjs.map