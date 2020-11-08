import { createRequire as _createRequire } from "module";import FileSystem from 'fs-extra';
import JSON5 from 'json5';

const Require = _createRequire(import.meta.url);

const Package = JSON5.parse(FileSystem.readFileSync(Require.resolve('../../package.json'), { 'encoding': 'utf-8' }));

export { Package };
//# sourceMappingURL=package.js.map