const web = require('stream/web');
globalThis.ReadableStream ??= web.ReadableStream;
globalThis.WritableStream ??= web.WritableStream;
globalThis.TransformStream ??= web.TransformStream;
