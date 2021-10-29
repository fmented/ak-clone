var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// .svelte-kit/vercel/entry.js
__export(exports, {
  default: () => entry_default
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require("http"));
var import_https = __toModule(require("https"));
var import_zlib = __toModule(require("zlib"));
var import_stream = __toModule(require("stream"));
var import_util = __toModule(require("util"));
var import_crypto = __toModule(require("crypto"));
var import_url = __toModule(require("url"));
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var dataUriToBuffer$1 = src;
var ponyfill_es2018 = { exports: {} };
(function(module2, exports) {
  (function(global2, factory) {
    factory(exports);
  })(commonjsGlobal, function(exports2) {
    const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
    function noop2() {
      return void 0;
    }
    function getGlobals() {
      if (typeof self !== "undefined") {
        return self;
      } else if (typeof window !== "undefined") {
        return window;
      } else if (typeof commonjsGlobal !== "undefined") {
        return commonjsGlobal;
      }
      return void 0;
    }
    const globals = getGlobals();
    function typeIsObject(x) {
      return typeof x === "object" && x !== null || typeof x === "function";
    }
    const rethrowAssertionErrorRejection = noop2;
    const originalPromise = Promise;
    const originalPromiseThen = Promise.prototype.then;
    const originalPromiseResolve = Promise.resolve.bind(originalPromise);
    const originalPromiseReject = Promise.reject.bind(originalPromise);
    function newPromise(executor) {
      return new originalPromise(executor);
    }
    function promiseResolvedWith(value) {
      return originalPromiseResolve(value);
    }
    function promiseRejectedWith(reason) {
      return originalPromiseReject(reason);
    }
    function PerformPromiseThen(promise, onFulfilled, onRejected) {
      return originalPromiseThen.call(promise, onFulfilled, onRejected);
    }
    function uponPromise(promise, onFulfilled, onRejected) {
      PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
    }
    function uponFulfillment(promise, onFulfilled) {
      uponPromise(promise, onFulfilled);
    }
    function uponRejection(promise, onRejected) {
      uponPromise(promise, void 0, onRejected);
    }
    function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
      return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
    }
    function setPromiseIsHandledToTrue(promise) {
      PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
    }
    const queueMicrotask = (() => {
      const globalQueueMicrotask = globals && globals.queueMicrotask;
      if (typeof globalQueueMicrotask === "function") {
        return globalQueueMicrotask;
      }
      const resolvedPromise = promiseResolvedWith(void 0);
      return (fn) => PerformPromiseThen(resolvedPromise, fn);
    })();
    function reflectCall(F, V, args) {
      if (typeof F !== "function") {
        throw new TypeError("Argument is not a function");
      }
      return Function.prototype.apply.call(F, V, args);
    }
    function promiseCall(F, V, args) {
      try {
        return promiseResolvedWith(reflectCall(F, V, args));
      } catch (value) {
        return promiseRejectedWith(value);
      }
    }
    const QUEUE_MAX_ARRAY_SIZE = 16384;
    class SimpleQueue {
      constructor() {
        this._cursor = 0;
        this._size = 0;
        this._front = {
          _elements: [],
          _next: void 0
        };
        this._back = this._front;
        this._cursor = 0;
        this._size = 0;
      }
      get length() {
        return this._size;
      }
      push(element) {
        const oldBack = this._back;
        let newBack = oldBack;
        if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
          newBack = {
            _elements: [],
            _next: void 0
          };
        }
        oldBack._elements.push(element);
        if (newBack !== oldBack) {
          this._back = newBack;
          oldBack._next = newBack;
        }
        ++this._size;
      }
      shift() {
        const oldFront = this._front;
        let newFront = oldFront;
        const oldCursor = this._cursor;
        let newCursor = oldCursor + 1;
        const elements = oldFront._elements;
        const element = elements[oldCursor];
        if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
          newFront = oldFront._next;
          newCursor = 0;
        }
        --this._size;
        this._cursor = newCursor;
        if (oldFront !== newFront) {
          this._front = newFront;
        }
        elements[oldCursor] = void 0;
        return element;
      }
      forEach(callback) {
        let i = this._cursor;
        let node = this._front;
        let elements = node._elements;
        while (i !== elements.length || node._next !== void 0) {
          if (i === elements.length) {
            node = node._next;
            elements = node._elements;
            i = 0;
            if (elements.length === 0) {
              break;
            }
          }
          callback(elements[i]);
          ++i;
        }
      }
      peek() {
        const front = this._front;
        const cursor = this._cursor;
        return front._elements[cursor];
      }
    }
    function ReadableStreamReaderGenericInitialize(reader, stream) {
      reader._ownerReadableStream = stream;
      stream._reader = reader;
      if (stream._state === "readable") {
        defaultReaderClosedPromiseInitialize(reader);
      } else if (stream._state === "closed") {
        defaultReaderClosedPromiseInitializeAsResolved(reader);
      } else {
        defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
      }
    }
    function ReadableStreamReaderGenericCancel(reader, reason) {
      const stream = reader._ownerReadableStream;
      return ReadableStreamCancel(stream, reason);
    }
    function ReadableStreamReaderGenericRelease(reader) {
      if (reader._ownerReadableStream._state === "readable") {
        defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
      } else {
        defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
      }
      reader._ownerReadableStream._reader = void 0;
      reader._ownerReadableStream = void 0;
    }
    function readerLockException(name) {
      return new TypeError("Cannot " + name + " a stream using a released reader");
    }
    function defaultReaderClosedPromiseInitialize(reader) {
      reader._closedPromise = newPromise((resolve2, reject) => {
        reader._closedPromise_resolve = resolve2;
        reader._closedPromise_reject = reject;
      });
    }
    function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
      defaultReaderClosedPromiseInitialize(reader);
      defaultReaderClosedPromiseReject(reader, reason);
    }
    function defaultReaderClosedPromiseInitializeAsResolved(reader) {
      defaultReaderClosedPromiseInitialize(reader);
      defaultReaderClosedPromiseResolve(reader);
    }
    function defaultReaderClosedPromiseReject(reader, reason) {
      if (reader._closedPromise_reject === void 0) {
        return;
      }
      setPromiseIsHandledToTrue(reader._closedPromise);
      reader._closedPromise_reject(reason);
      reader._closedPromise_resolve = void 0;
      reader._closedPromise_reject = void 0;
    }
    function defaultReaderClosedPromiseResetToRejected(reader, reason) {
      defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
    }
    function defaultReaderClosedPromiseResolve(reader) {
      if (reader._closedPromise_resolve === void 0) {
        return;
      }
      reader._closedPromise_resolve(void 0);
      reader._closedPromise_resolve = void 0;
      reader._closedPromise_reject = void 0;
    }
    const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
    const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
    const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
    const PullSteps = SymbolPolyfill("[[PullSteps]]");
    const NumberIsFinite = Number.isFinite || function(x) {
      return typeof x === "number" && isFinite(x);
    };
    const MathTrunc = Math.trunc || function(v) {
      return v < 0 ? Math.ceil(v) : Math.floor(v);
    };
    function isDictionary(x) {
      return typeof x === "object" || typeof x === "function";
    }
    function assertDictionary(obj, context) {
      if (obj !== void 0 && !isDictionary(obj)) {
        throw new TypeError(`${context} is not an object.`);
      }
    }
    function assertFunction(x, context) {
      if (typeof x !== "function") {
        throw new TypeError(`${context} is not a function.`);
      }
    }
    function isObject(x) {
      return typeof x === "object" && x !== null || typeof x === "function";
    }
    function assertObject(x, context) {
      if (!isObject(x)) {
        throw new TypeError(`${context} is not an object.`);
      }
    }
    function assertRequiredArgument(x, position, context) {
      if (x === void 0) {
        throw new TypeError(`Parameter ${position} is required in '${context}'.`);
      }
    }
    function assertRequiredField(x, field, context) {
      if (x === void 0) {
        throw new TypeError(`${field} is required in '${context}'.`);
      }
    }
    function convertUnrestrictedDouble(value) {
      return Number(value);
    }
    function censorNegativeZero(x) {
      return x === 0 ? 0 : x;
    }
    function integerPart(x) {
      return censorNegativeZero(MathTrunc(x));
    }
    function convertUnsignedLongLongWithEnforceRange(value, context) {
      const lowerBound = 0;
      const upperBound = Number.MAX_SAFE_INTEGER;
      let x = Number(value);
      x = censorNegativeZero(x);
      if (!NumberIsFinite(x)) {
        throw new TypeError(`${context} is not a finite number`);
      }
      x = integerPart(x);
      if (x < lowerBound || x > upperBound) {
        throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
      }
      if (!NumberIsFinite(x) || x === 0) {
        return 0;
      }
      return x;
    }
    function assertReadableStream(x, context) {
      if (!IsReadableStream(x)) {
        throw new TypeError(`${context} is not a ReadableStream.`);
      }
    }
    function AcquireReadableStreamDefaultReader(stream) {
      return new ReadableStreamDefaultReader(stream);
    }
    function ReadableStreamAddReadRequest(stream, readRequest) {
      stream._reader._readRequests.push(readRequest);
    }
    function ReadableStreamFulfillReadRequest(stream, chunk, done) {
      const reader = stream._reader;
      const readRequest = reader._readRequests.shift();
      if (done) {
        readRequest._closeSteps();
      } else {
        readRequest._chunkSteps(chunk);
      }
    }
    function ReadableStreamGetNumReadRequests(stream) {
      return stream._reader._readRequests.length;
    }
    function ReadableStreamHasDefaultReader(stream) {
      const reader = stream._reader;
      if (reader === void 0) {
        return false;
      }
      if (!IsReadableStreamDefaultReader(reader)) {
        return false;
      }
      return true;
    }
    class ReadableStreamDefaultReader {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
        assertReadableStream(stream, "First parameter");
        if (IsReadableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive reading by another reader");
        }
        ReadableStreamReaderGenericInitialize(this, stream);
        this._readRequests = new SimpleQueue();
      }
      get closed() {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      cancel(reason = void 0) {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("cancel"));
        }
        return ReadableStreamReaderGenericCancel(this, reason);
      }
      read() {
        if (!IsReadableStreamDefaultReader(this)) {
          return promiseRejectedWith(defaultReaderBrandCheckException("read"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("read from"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve2, reject) => {
          resolvePromise = resolve2;
          rejectPromise = reject;
        });
        const readRequest = {
          _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
          _closeSteps: () => resolvePromise({ value: void 0, done: true }),
          _errorSteps: (e) => rejectPromise(e)
        };
        ReadableStreamDefaultReaderRead(this, readRequest);
        return promise;
      }
      releaseLock() {
        if (!IsReadableStreamDefaultReader(this)) {
          throw defaultReaderBrandCheckException("releaseLock");
        }
        if (this._ownerReadableStream === void 0) {
          return;
        }
        if (this._readRequests.length > 0) {
          throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
        }
        ReadableStreamReaderGenericRelease(this);
      }
    }
    Object.defineProperties(ReadableStreamDefaultReader.prototype, {
      cancel: { enumerable: true },
      read: { enumerable: true },
      releaseLock: { enumerable: true },
      closed: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamDefaultReader",
        configurable: true
      });
    }
    function IsReadableStreamDefaultReader(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_readRequests")) {
        return false;
      }
      return x instanceof ReadableStreamDefaultReader;
    }
    function ReadableStreamDefaultReaderRead(reader, readRequest) {
      const stream = reader._ownerReadableStream;
      stream._disturbed = true;
      if (stream._state === "closed") {
        readRequest._closeSteps();
      } else if (stream._state === "errored") {
        readRequest._errorSteps(stream._storedError);
      } else {
        stream._readableStreamController[PullSteps](readRequest);
      }
    }
    function defaultReaderBrandCheckException(name) {
      return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
    }
    const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
    }).prototype);
    class ReadableStreamAsyncIteratorImpl {
      constructor(reader, preventCancel) {
        this._ongoingPromise = void 0;
        this._isFinished = false;
        this._reader = reader;
        this._preventCancel = preventCancel;
      }
      next() {
        const nextSteps = () => this._nextSteps();
        this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
        return this._ongoingPromise;
      }
      return(value) {
        const returnSteps = () => this._returnSteps(value);
        return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
      }
      _nextSteps() {
        if (this._isFinished) {
          return Promise.resolve({ value: void 0, done: true });
        }
        const reader = this._reader;
        if (reader._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("iterate"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve2, reject) => {
          resolvePromise = resolve2;
          rejectPromise = reject;
        });
        const readRequest = {
          _chunkSteps: (chunk) => {
            this._ongoingPromise = void 0;
            queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
          },
          _closeSteps: () => {
            this._ongoingPromise = void 0;
            this._isFinished = true;
            ReadableStreamReaderGenericRelease(reader);
            resolvePromise({ value: void 0, done: true });
          },
          _errorSteps: (reason) => {
            this._ongoingPromise = void 0;
            this._isFinished = true;
            ReadableStreamReaderGenericRelease(reader);
            rejectPromise(reason);
          }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
        return promise;
      }
      _returnSteps(value) {
        if (this._isFinished) {
          return Promise.resolve({ value, done: true });
        }
        this._isFinished = true;
        const reader = this._reader;
        if (reader._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("finish iterating"));
        }
        if (!this._preventCancel) {
          const result = ReadableStreamReaderGenericCancel(reader, value);
          ReadableStreamReaderGenericRelease(reader);
          return transformPromiseWith(result, () => ({ value, done: true }));
        }
        ReadableStreamReaderGenericRelease(reader);
        return promiseResolvedWith({ value, done: true });
      }
    }
    const ReadableStreamAsyncIteratorPrototype = {
      next() {
        if (!IsReadableStreamAsyncIterator(this)) {
          return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
        }
        return this._asyncIteratorImpl.next();
      },
      return(value) {
        if (!IsReadableStreamAsyncIterator(this)) {
          return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
        }
        return this._asyncIteratorImpl.return(value);
      }
    };
    if (AsyncIteratorPrototype !== void 0) {
      Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
    }
    function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
      const reader = AcquireReadableStreamDefaultReader(stream);
      const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
      const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
      iterator._asyncIteratorImpl = impl;
      return iterator;
    }
    function IsReadableStreamAsyncIterator(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_asyncIteratorImpl")) {
        return false;
      }
      try {
        return x._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
      } catch (_a) {
        return false;
      }
    }
    function streamAsyncIteratorBrandCheckException(name) {
      return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
    }
    const NumberIsNaN = Number.isNaN || function(x) {
      return x !== x;
    };
    function CreateArrayFromList(elements) {
      return elements.slice();
    }
    function CopyDataBlockBytes(dest, destOffset, src2, srcOffset, n) {
      new Uint8Array(dest).set(new Uint8Array(src2, srcOffset, n), destOffset);
    }
    function TransferArrayBuffer(O) {
      return O;
    }
    function IsDetachedBuffer(O) {
      return false;
    }
    function ArrayBufferSlice(buffer, begin, end) {
      if (buffer.slice) {
        return buffer.slice(begin, end);
      }
      const length = end - begin;
      const slice = new ArrayBuffer(length);
      CopyDataBlockBytes(slice, 0, buffer, begin, length);
      return slice;
    }
    function IsNonNegativeNumber(v) {
      if (typeof v !== "number") {
        return false;
      }
      if (NumberIsNaN(v)) {
        return false;
      }
      if (v < 0) {
        return false;
      }
      return true;
    }
    function CloneAsUint8Array(O) {
      const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
      return new Uint8Array(buffer);
    }
    function DequeueValue(container) {
      const pair = container._queue.shift();
      container._queueTotalSize -= pair.size;
      if (container._queueTotalSize < 0) {
        container._queueTotalSize = 0;
      }
      return pair.value;
    }
    function EnqueueValueWithSize(container, value, size) {
      if (!IsNonNegativeNumber(size) || size === Infinity) {
        throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
      }
      container._queue.push({ value, size });
      container._queueTotalSize += size;
    }
    function PeekQueueValue(container) {
      const pair = container._queue.peek();
      return pair.value;
    }
    function ResetQueue(container) {
      container._queue = new SimpleQueue();
      container._queueTotalSize = 0;
    }
    class ReadableStreamBYOBRequest {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get view() {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("view");
        }
        return this._view;
      }
      respond(bytesWritten) {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("respond");
        }
        assertRequiredArgument(bytesWritten, 1, "respond");
        bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
        if (this._associatedReadableByteStreamController === void 0) {
          throw new TypeError("This BYOB request has been invalidated");
        }
        if (IsDetachedBuffer(this._view.buffer))
          ;
        ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
      }
      respondWithNewView(view) {
        if (!IsReadableStreamBYOBRequest(this)) {
          throw byobRequestBrandCheckException("respondWithNewView");
        }
        assertRequiredArgument(view, 1, "respondWithNewView");
        if (!ArrayBuffer.isView(view)) {
          throw new TypeError("You can only respond with array buffer views");
        }
        if (this._associatedReadableByteStreamController === void 0) {
          throw new TypeError("This BYOB request has been invalidated");
        }
        if (IsDetachedBuffer(view.buffer))
          ;
        ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
      }
    }
    Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
      respond: { enumerable: true },
      respondWithNewView: { enumerable: true },
      view: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamBYOBRequest",
        configurable: true
      });
    }
    class ReadableByteStreamController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get byobRequest() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("byobRequest");
        }
        return ReadableByteStreamControllerGetBYOBRequest(this);
      }
      get desiredSize() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("desiredSize");
        }
        return ReadableByteStreamControllerGetDesiredSize(this);
      }
      close() {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("close");
        }
        if (this._closeRequested) {
          throw new TypeError("The stream has already been closed; do not close it again!");
        }
        const state = this._controlledReadableByteStream._state;
        if (state !== "readable") {
          throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
        }
        ReadableByteStreamControllerClose(this);
      }
      enqueue(chunk) {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("enqueue");
        }
        assertRequiredArgument(chunk, 1, "enqueue");
        if (!ArrayBuffer.isView(chunk)) {
          throw new TypeError("chunk must be an array buffer view");
        }
        if (chunk.byteLength === 0) {
          throw new TypeError("chunk must have non-zero byteLength");
        }
        if (chunk.buffer.byteLength === 0) {
          throw new TypeError(`chunk's buffer must have non-zero byteLength`);
        }
        if (this._closeRequested) {
          throw new TypeError("stream is closed or draining");
        }
        const state = this._controlledReadableByteStream._state;
        if (state !== "readable") {
          throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
        }
        ReadableByteStreamControllerEnqueue(this, chunk);
      }
      error(e = void 0) {
        if (!IsReadableByteStreamController(this)) {
          throw byteStreamControllerBrandCheckException("error");
        }
        ReadableByteStreamControllerError(this, e);
      }
      [CancelSteps](reason) {
        ReadableByteStreamControllerClearPendingPullIntos(this);
        ResetQueue(this);
        const result = this._cancelAlgorithm(reason);
        ReadableByteStreamControllerClearAlgorithms(this);
        return result;
      }
      [PullSteps](readRequest) {
        const stream = this._controlledReadableByteStream;
        if (this._queueTotalSize > 0) {
          const entry = this._queue.shift();
          this._queueTotalSize -= entry.byteLength;
          ReadableByteStreamControllerHandleQueueDrain(this);
          const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
          readRequest._chunkSteps(view);
          return;
        }
        const autoAllocateChunkSize = this._autoAllocateChunkSize;
        if (autoAllocateChunkSize !== void 0) {
          let buffer;
          try {
            buffer = new ArrayBuffer(autoAllocateChunkSize);
          } catch (bufferE) {
            readRequest._errorSteps(bufferE);
            return;
          }
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: autoAllocateChunkSize,
            byteOffset: 0,
            byteLength: autoAllocateChunkSize,
            bytesFilled: 0,
            elementSize: 1,
            viewConstructor: Uint8Array,
            readerType: "default"
          };
          this._pendingPullIntos.push(pullIntoDescriptor);
        }
        ReadableStreamAddReadRequest(stream, readRequest);
        ReadableByteStreamControllerCallPullIfNeeded(this);
      }
    }
    Object.defineProperties(ReadableByteStreamController.prototype, {
      close: { enumerable: true },
      enqueue: { enumerable: true },
      error: { enumerable: true },
      byobRequest: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableByteStreamController",
        configurable: true
      });
    }
    function IsReadableByteStreamController(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_controlledReadableByteStream")) {
        return false;
      }
      return x instanceof ReadableByteStreamController;
    }
    function IsReadableStreamBYOBRequest(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_associatedReadableByteStreamController")) {
        return false;
      }
      return x instanceof ReadableStreamBYOBRequest;
    }
    function ReadableByteStreamControllerCallPullIfNeeded(controller) {
      const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
      if (!shouldPull) {
        return;
      }
      if (controller._pulling) {
        controller._pullAgain = true;
        return;
      }
      controller._pulling = true;
      const pullPromise = controller._pullAlgorithm();
      uponPromise(pullPromise, () => {
        controller._pulling = false;
        if (controller._pullAgain) {
          controller._pullAgain = false;
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
      }, (e) => {
        ReadableByteStreamControllerError(controller, e);
      });
    }
    function ReadableByteStreamControllerClearPendingPullIntos(controller) {
      ReadableByteStreamControllerInvalidateBYOBRequest(controller);
      controller._pendingPullIntos = new SimpleQueue();
    }
    function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
      let done = false;
      if (stream._state === "closed") {
        done = true;
      }
      const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
      if (pullIntoDescriptor.readerType === "default") {
        ReadableStreamFulfillReadRequest(stream, filledView, done);
      } else {
        ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
      }
    }
    function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
      const bytesFilled = pullIntoDescriptor.bytesFilled;
      const elementSize = pullIntoDescriptor.elementSize;
      return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
    }
    function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
      controller._queue.push({ buffer, byteOffset, byteLength });
      controller._queueTotalSize += byteLength;
    }
    function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
      const elementSize = pullIntoDescriptor.elementSize;
      const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
      const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
      const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
      const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
      let totalBytesToCopyRemaining = maxBytesToCopy;
      let ready = false;
      if (maxAlignedBytes > currentAlignedBytes) {
        totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
        ready = true;
      }
      const queue = controller._queue;
      while (totalBytesToCopyRemaining > 0) {
        const headOfQueue = queue.peek();
        const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
        const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
        CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
        if (headOfQueue.byteLength === bytesToCopy) {
          queue.shift();
        } else {
          headOfQueue.byteOffset += bytesToCopy;
          headOfQueue.byteLength -= bytesToCopy;
        }
        controller._queueTotalSize -= bytesToCopy;
        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
        totalBytesToCopyRemaining -= bytesToCopy;
      }
      return ready;
    }
    function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
      pullIntoDescriptor.bytesFilled += size;
    }
    function ReadableByteStreamControllerHandleQueueDrain(controller) {
      if (controller._queueTotalSize === 0 && controller._closeRequested) {
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamClose(controller._controlledReadableByteStream);
      } else {
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
    }
    function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
      if (controller._byobRequest === null) {
        return;
      }
      controller._byobRequest._associatedReadableByteStreamController = void 0;
      controller._byobRequest._view = null;
      controller._byobRequest = null;
    }
    function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
      while (controller._pendingPullIntos.length > 0) {
        if (controller._queueTotalSize === 0) {
          return;
        }
        const pullIntoDescriptor = controller._pendingPullIntos.peek();
        if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
        }
      }
    }
    function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
      const stream = controller._controlledReadableByteStream;
      let elementSize = 1;
      if (view.constructor !== DataView) {
        elementSize = view.constructor.BYTES_PER_ELEMENT;
      }
      const ctor = view.constructor;
      const buffer = TransferArrayBuffer(view.buffer);
      const pullIntoDescriptor = {
        buffer,
        bufferByteLength: buffer.byteLength,
        byteOffset: view.byteOffset,
        byteLength: view.byteLength,
        bytesFilled: 0,
        elementSize,
        viewConstructor: ctor,
        readerType: "byob"
      };
      if (controller._pendingPullIntos.length > 0) {
        controller._pendingPullIntos.push(pullIntoDescriptor);
        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
        return;
      }
      if (stream._state === "closed") {
        const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
        readIntoRequest._closeSteps(emptyView);
        return;
      }
      if (controller._queueTotalSize > 0) {
        if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          ReadableByteStreamControllerHandleQueueDrain(controller);
          readIntoRequest._chunkSteps(filledView);
          return;
        }
        if (controller._closeRequested) {
          const e = new TypeError("Insufficient bytes to fill elements in the given buffer");
          ReadableByteStreamControllerError(controller, e);
          readIntoRequest._errorSteps(e);
          return;
        }
      }
      controller._pendingPullIntos.push(pullIntoDescriptor);
      ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
      const stream = controller._controlledReadableByteStream;
      if (ReadableStreamHasBYOBReader(stream)) {
        while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
          const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
          ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
        }
      }
    }
    function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
      ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
      if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
        return;
      }
      ReadableByteStreamControllerShiftPendingPullInto(controller);
      const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
      if (remainderSize > 0) {
        const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
        const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
      }
      pullIntoDescriptor.bytesFilled -= remainderSize;
      ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
      ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
    }
    function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
      const firstDescriptor = controller._pendingPullIntos.peek();
      ReadableByteStreamControllerInvalidateBYOBRequest(controller);
      const state = controller._controlledReadableByteStream._state;
      if (state === "closed") {
        ReadableByteStreamControllerRespondInClosedState(controller);
      } else {
        ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
      }
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerShiftPendingPullInto(controller) {
      const descriptor = controller._pendingPullIntos.shift();
      return descriptor;
    }
    function ReadableByteStreamControllerShouldCallPull(controller) {
      const stream = controller._controlledReadableByteStream;
      if (stream._state !== "readable") {
        return false;
      }
      if (controller._closeRequested) {
        return false;
      }
      if (!controller._started) {
        return false;
      }
      if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        return true;
      }
      if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
        return true;
      }
      const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
      if (desiredSize > 0) {
        return true;
      }
      return false;
    }
    function ReadableByteStreamControllerClearAlgorithms(controller) {
      controller._pullAlgorithm = void 0;
      controller._cancelAlgorithm = void 0;
    }
    function ReadableByteStreamControllerClose(controller) {
      const stream = controller._controlledReadableByteStream;
      if (controller._closeRequested || stream._state !== "readable") {
        return;
      }
      if (controller._queueTotalSize > 0) {
        controller._closeRequested = true;
        return;
      }
      if (controller._pendingPullIntos.length > 0) {
        const firstPendingPullInto = controller._pendingPullIntos.peek();
        if (firstPendingPullInto.bytesFilled > 0) {
          const e = new TypeError("Insufficient bytes to fill elements in the given buffer");
          ReadableByteStreamControllerError(controller, e);
          throw e;
        }
      }
      ReadableByteStreamControllerClearAlgorithms(controller);
      ReadableStreamClose(stream);
    }
    function ReadableByteStreamControllerEnqueue(controller, chunk) {
      const stream = controller._controlledReadableByteStream;
      if (controller._closeRequested || stream._state !== "readable") {
        return;
      }
      const buffer = chunk.buffer;
      const byteOffset = chunk.byteOffset;
      const byteLength = chunk.byteLength;
      const transferredBuffer = TransferArrayBuffer(buffer);
      if (controller._pendingPullIntos.length > 0) {
        const firstPendingPullInto = controller._pendingPullIntos.peek();
        if (IsDetachedBuffer(firstPendingPullInto.buffer))
          ;
        firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
      }
      ReadableByteStreamControllerInvalidateBYOBRequest(controller);
      if (ReadableStreamHasDefaultReader(stream)) {
        if (ReadableStreamGetNumReadRequests(stream) === 0) {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        } else {
          const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
          ReadableStreamFulfillReadRequest(stream, transferredView, false);
        }
      } else if (ReadableStreamHasBYOBReader(stream)) {
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
      } else {
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
      }
      ReadableByteStreamControllerCallPullIfNeeded(controller);
    }
    function ReadableByteStreamControllerError(controller, e) {
      const stream = controller._controlledReadableByteStream;
      if (stream._state !== "readable") {
        return;
      }
      ReadableByteStreamControllerClearPendingPullIntos(controller);
      ResetQueue(controller);
      ReadableByteStreamControllerClearAlgorithms(controller);
      ReadableStreamError(stream, e);
    }
    function ReadableByteStreamControllerGetBYOBRequest(controller) {
      if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
        const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
        SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
        controller._byobRequest = byobRequest;
      }
      return controller._byobRequest;
    }
    function ReadableByteStreamControllerGetDesiredSize(controller) {
      const state = controller._controlledReadableByteStream._state;
      if (state === "errored") {
        return null;
      }
      if (state === "closed") {
        return 0;
      }
      return controller._strategyHWM - controller._queueTotalSize;
    }
    function ReadableByteStreamControllerRespond(controller, bytesWritten) {
      const firstDescriptor = controller._pendingPullIntos.peek();
      const state = controller._controlledReadableByteStream._state;
      if (state === "closed") {
        if (bytesWritten !== 0) {
          throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
        }
      } else {
        if (bytesWritten === 0) {
          throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
        }
        if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
          throw new RangeError("bytesWritten out of range");
        }
      }
      firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
      ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
    }
    function ReadableByteStreamControllerRespondWithNewView(controller, view) {
      const firstDescriptor = controller._pendingPullIntos.peek();
      const state = controller._controlledReadableByteStream._state;
      if (state === "closed") {
        if (view.byteLength !== 0) {
          throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
        }
      } else {
        if (view.byteLength === 0) {
          throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
        }
      }
      if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
        throw new RangeError("The region specified by view does not match byobRequest");
      }
      if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
        throw new RangeError("The buffer of view has different capacity than byobRequest");
      }
      if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
        throw new RangeError("The region specified by view is larger than byobRequest");
      }
      firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
      ReadableByteStreamControllerRespondInternal(controller, view.byteLength);
    }
    function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
      controller._controlledReadableByteStream = stream;
      controller._pullAgain = false;
      controller._pulling = false;
      controller._byobRequest = null;
      controller._queue = controller._queueTotalSize = void 0;
      ResetQueue(controller);
      controller._closeRequested = false;
      controller._started = false;
      controller._strategyHWM = highWaterMark;
      controller._pullAlgorithm = pullAlgorithm;
      controller._cancelAlgorithm = cancelAlgorithm;
      controller._autoAllocateChunkSize = autoAllocateChunkSize;
      controller._pendingPullIntos = new SimpleQueue();
      stream._readableStreamController = controller;
      const startResult = startAlgorithm();
      uponPromise(promiseResolvedWith(startResult), () => {
        controller._started = true;
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }, (r) => {
        ReadableByteStreamControllerError(controller, r);
      });
    }
    function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
      const controller = Object.create(ReadableByteStreamController.prototype);
      let startAlgorithm = () => void 0;
      let pullAlgorithm = () => promiseResolvedWith(void 0);
      let cancelAlgorithm = () => promiseResolvedWith(void 0);
      if (underlyingByteSource.start !== void 0) {
        startAlgorithm = () => underlyingByteSource.start(controller);
      }
      if (underlyingByteSource.pull !== void 0) {
        pullAlgorithm = () => underlyingByteSource.pull(controller);
      }
      if (underlyingByteSource.cancel !== void 0) {
        cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
      }
      const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
      if (autoAllocateChunkSize === 0) {
        throw new TypeError("autoAllocateChunkSize must be greater than 0");
      }
      SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
    }
    function SetUpReadableStreamBYOBRequest(request, controller, view) {
      request._associatedReadableByteStreamController = controller;
      request._view = view;
    }
    function byobRequestBrandCheckException(name) {
      return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
    }
    function byteStreamControllerBrandCheckException(name) {
      return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
    }
    function AcquireReadableStreamBYOBReader(stream) {
      return new ReadableStreamBYOBReader(stream);
    }
    function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
      stream._reader._readIntoRequests.push(readIntoRequest);
    }
    function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
      const reader = stream._reader;
      const readIntoRequest = reader._readIntoRequests.shift();
      if (done) {
        readIntoRequest._closeSteps(chunk);
      } else {
        readIntoRequest._chunkSteps(chunk);
      }
    }
    function ReadableStreamGetNumReadIntoRequests(stream) {
      return stream._reader._readIntoRequests.length;
    }
    function ReadableStreamHasBYOBReader(stream) {
      const reader = stream._reader;
      if (reader === void 0) {
        return false;
      }
      if (!IsReadableStreamBYOBReader(reader)) {
        return false;
      }
      return true;
    }
    class ReadableStreamBYOBReader {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
        assertReadableStream(stream, "First parameter");
        if (IsReadableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive reading by another reader");
        }
        if (!IsReadableByteStreamController(stream._readableStreamController)) {
          throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
        }
        ReadableStreamReaderGenericInitialize(this, stream);
        this._readIntoRequests = new SimpleQueue();
      }
      get closed() {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      cancel(reason = void 0) {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
        }
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("cancel"));
        }
        return ReadableStreamReaderGenericCancel(this, reason);
      }
      read(view) {
        if (!IsReadableStreamBYOBReader(this)) {
          return promiseRejectedWith(byobReaderBrandCheckException("read"));
        }
        if (!ArrayBuffer.isView(view)) {
          return promiseRejectedWith(new TypeError("view must be an array buffer view"));
        }
        if (view.byteLength === 0) {
          return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
        }
        if (view.buffer.byteLength === 0) {
          return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
        }
        if (IsDetachedBuffer(view.buffer))
          ;
        if (this._ownerReadableStream === void 0) {
          return promiseRejectedWith(readerLockException("read from"));
        }
        let resolvePromise;
        let rejectPromise;
        const promise = newPromise((resolve2, reject) => {
          resolvePromise = resolve2;
          rejectPromise = reject;
        });
        const readIntoRequest = {
          _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
          _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
          _errorSteps: (e) => rejectPromise(e)
        };
        ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
        return promise;
      }
      releaseLock() {
        if (!IsReadableStreamBYOBReader(this)) {
          throw byobReaderBrandCheckException("releaseLock");
        }
        if (this._ownerReadableStream === void 0) {
          return;
        }
        if (this._readIntoRequests.length > 0) {
          throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
        }
        ReadableStreamReaderGenericRelease(this);
      }
    }
    Object.defineProperties(ReadableStreamBYOBReader.prototype, {
      cancel: { enumerable: true },
      read: { enumerable: true },
      releaseLock: { enumerable: true },
      closed: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamBYOBReader",
        configurable: true
      });
    }
    function IsReadableStreamBYOBReader(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_readIntoRequests")) {
        return false;
      }
      return x instanceof ReadableStreamBYOBReader;
    }
    function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
      const stream = reader._ownerReadableStream;
      stream._disturbed = true;
      if (stream._state === "errored") {
        readIntoRequest._errorSteps(stream._storedError);
      } else {
        ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
      }
    }
    function byobReaderBrandCheckException(name) {
      return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
    }
    function ExtractHighWaterMark(strategy, defaultHWM) {
      const { highWaterMark } = strategy;
      if (highWaterMark === void 0) {
        return defaultHWM;
      }
      if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
        throw new RangeError("Invalid highWaterMark");
      }
      return highWaterMark;
    }
    function ExtractSizeAlgorithm(strategy) {
      const { size } = strategy;
      if (!size) {
        return () => 1;
      }
      return size;
    }
    function convertQueuingStrategy(init2, context) {
      assertDictionary(init2, context);
      const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
      const size = init2 === null || init2 === void 0 ? void 0 : init2.size;
      return {
        highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
        size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
      };
    }
    function convertQueuingStrategySize(fn, context) {
      assertFunction(fn, context);
      return (chunk) => convertUnrestrictedDouble(fn(chunk));
    }
    function convertUnderlyingSink(original, context) {
      assertDictionary(original, context);
      const abort = original === null || original === void 0 ? void 0 : original.abort;
      const close = original === null || original === void 0 ? void 0 : original.close;
      const start = original === null || original === void 0 ? void 0 : original.start;
      const type = original === null || original === void 0 ? void 0 : original.type;
      const write = original === null || original === void 0 ? void 0 : original.write;
      return {
        abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
        close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
        start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
        write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
        type
      };
    }
    function convertUnderlyingSinkAbortCallback(fn, original, context) {
      assertFunction(fn, context);
      return (reason) => promiseCall(fn, original, [reason]);
    }
    function convertUnderlyingSinkCloseCallback(fn, original, context) {
      assertFunction(fn, context);
      return () => promiseCall(fn, original, []);
    }
    function convertUnderlyingSinkStartCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertUnderlyingSinkWriteCallback(fn, original, context) {
      assertFunction(fn, context);
      return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
    }
    function assertWritableStream(x, context) {
      if (!IsWritableStream(x)) {
        throw new TypeError(`${context} is not a WritableStream.`);
      }
    }
    function isAbortSignal2(value) {
      if (typeof value !== "object" || value === null) {
        return false;
      }
      try {
        return typeof value.aborted === "boolean";
      } catch (_a) {
        return false;
      }
    }
    const supportsAbortController = typeof AbortController === "function";
    function createAbortController() {
      if (supportsAbortController) {
        return new AbortController();
      }
      return void 0;
    }
    class WritableStream {
      constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
        if (rawUnderlyingSink === void 0) {
          rawUnderlyingSink = null;
        } else {
          assertObject(rawUnderlyingSink, "First parameter");
        }
        const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
        const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
        InitializeWritableStream(this);
        const type = underlyingSink.type;
        if (type !== void 0) {
          throw new RangeError("Invalid type is specified");
        }
        const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
        const highWaterMark = ExtractHighWaterMark(strategy, 1);
        SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
      }
      get locked() {
        if (!IsWritableStream(this)) {
          throw streamBrandCheckException$2("locked");
        }
        return IsWritableStreamLocked(this);
      }
      abort(reason = void 0) {
        if (!IsWritableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$2("abort"));
        }
        if (IsWritableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
        }
        return WritableStreamAbort(this, reason);
      }
      close() {
        if (!IsWritableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$2("close"));
        }
        if (IsWritableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
        }
        if (WritableStreamCloseQueuedOrInFlight(this)) {
          return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
        }
        return WritableStreamClose(this);
      }
      getWriter() {
        if (!IsWritableStream(this)) {
          throw streamBrandCheckException$2("getWriter");
        }
        return AcquireWritableStreamDefaultWriter(this);
      }
    }
    Object.defineProperties(WritableStream.prototype, {
      abort: { enumerable: true },
      close: { enumerable: true },
      getWriter: { enumerable: true },
      locked: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStream",
        configurable: true
      });
    }
    function AcquireWritableStreamDefaultWriter(stream) {
      return new WritableStreamDefaultWriter(stream);
    }
    function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
      const stream = Object.create(WritableStream.prototype);
      InitializeWritableStream(stream);
      const controller = Object.create(WritableStreamDefaultController.prototype);
      SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
      return stream;
    }
    function InitializeWritableStream(stream) {
      stream._state = "writable";
      stream._storedError = void 0;
      stream._writer = void 0;
      stream._writableStreamController = void 0;
      stream._writeRequests = new SimpleQueue();
      stream._inFlightWriteRequest = void 0;
      stream._closeRequest = void 0;
      stream._inFlightCloseRequest = void 0;
      stream._pendingAbortRequest = void 0;
      stream._backpressure = false;
    }
    function IsWritableStream(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_writableStreamController")) {
        return false;
      }
      return x instanceof WritableStream;
    }
    function IsWritableStreamLocked(stream) {
      if (stream._writer === void 0) {
        return false;
      }
      return true;
    }
    function WritableStreamAbort(stream, reason) {
      var _a;
      if (stream._state === "closed" || stream._state === "errored") {
        return promiseResolvedWith(void 0);
      }
      stream._writableStreamController._abortReason = reason;
      (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
      const state = stream._state;
      if (state === "closed" || state === "errored") {
        return promiseResolvedWith(void 0);
      }
      if (stream._pendingAbortRequest !== void 0) {
        return stream._pendingAbortRequest._promise;
      }
      let wasAlreadyErroring = false;
      if (state === "erroring") {
        wasAlreadyErroring = true;
        reason = void 0;
      }
      const promise = newPromise((resolve2, reject) => {
        stream._pendingAbortRequest = {
          _promise: void 0,
          _resolve: resolve2,
          _reject: reject,
          _reason: reason,
          _wasAlreadyErroring: wasAlreadyErroring
        };
      });
      stream._pendingAbortRequest._promise = promise;
      if (!wasAlreadyErroring) {
        WritableStreamStartErroring(stream, reason);
      }
      return promise;
    }
    function WritableStreamClose(stream) {
      const state = stream._state;
      if (state === "closed" || state === "errored") {
        return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
      }
      const promise = newPromise((resolve2, reject) => {
        const closeRequest = {
          _resolve: resolve2,
          _reject: reject
        };
        stream._closeRequest = closeRequest;
      });
      const writer = stream._writer;
      if (writer !== void 0 && stream._backpressure && state === "writable") {
        defaultWriterReadyPromiseResolve(writer);
      }
      WritableStreamDefaultControllerClose(stream._writableStreamController);
      return promise;
    }
    function WritableStreamAddWriteRequest(stream) {
      const promise = newPromise((resolve2, reject) => {
        const writeRequest = {
          _resolve: resolve2,
          _reject: reject
        };
        stream._writeRequests.push(writeRequest);
      });
      return promise;
    }
    function WritableStreamDealWithRejection(stream, error2) {
      const state = stream._state;
      if (state === "writable") {
        WritableStreamStartErroring(stream, error2);
        return;
      }
      WritableStreamFinishErroring(stream);
    }
    function WritableStreamStartErroring(stream, reason) {
      const controller = stream._writableStreamController;
      stream._state = "erroring";
      stream._storedError = reason;
      const writer = stream._writer;
      if (writer !== void 0) {
        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
      }
      if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
        WritableStreamFinishErroring(stream);
      }
    }
    function WritableStreamFinishErroring(stream) {
      stream._state = "errored";
      stream._writableStreamController[ErrorSteps]();
      const storedError = stream._storedError;
      stream._writeRequests.forEach((writeRequest) => {
        writeRequest._reject(storedError);
      });
      stream._writeRequests = new SimpleQueue();
      if (stream._pendingAbortRequest === void 0) {
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        return;
      }
      const abortRequest = stream._pendingAbortRequest;
      stream._pendingAbortRequest = void 0;
      if (abortRequest._wasAlreadyErroring) {
        abortRequest._reject(storedError);
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        return;
      }
      const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
      uponPromise(promise, () => {
        abortRequest._resolve();
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
      }, (reason) => {
        abortRequest._reject(reason);
        WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
      });
    }
    function WritableStreamFinishInFlightWrite(stream) {
      stream._inFlightWriteRequest._resolve(void 0);
      stream._inFlightWriteRequest = void 0;
    }
    function WritableStreamFinishInFlightWriteWithError(stream, error2) {
      stream._inFlightWriteRequest._reject(error2);
      stream._inFlightWriteRequest = void 0;
      WritableStreamDealWithRejection(stream, error2);
    }
    function WritableStreamFinishInFlightClose(stream) {
      stream._inFlightCloseRequest._resolve(void 0);
      stream._inFlightCloseRequest = void 0;
      const state = stream._state;
      if (state === "erroring") {
        stream._storedError = void 0;
        if (stream._pendingAbortRequest !== void 0) {
          stream._pendingAbortRequest._resolve();
          stream._pendingAbortRequest = void 0;
        }
      }
      stream._state = "closed";
      const writer = stream._writer;
      if (writer !== void 0) {
        defaultWriterClosedPromiseResolve(writer);
      }
    }
    function WritableStreamFinishInFlightCloseWithError(stream, error2) {
      stream._inFlightCloseRequest._reject(error2);
      stream._inFlightCloseRequest = void 0;
      if (stream._pendingAbortRequest !== void 0) {
        stream._pendingAbortRequest._reject(error2);
        stream._pendingAbortRequest = void 0;
      }
      WritableStreamDealWithRejection(stream, error2);
    }
    function WritableStreamCloseQueuedOrInFlight(stream) {
      if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
        return false;
      }
      return true;
    }
    function WritableStreamHasOperationMarkedInFlight(stream) {
      if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
        return false;
      }
      return true;
    }
    function WritableStreamMarkCloseRequestInFlight(stream) {
      stream._inFlightCloseRequest = stream._closeRequest;
      stream._closeRequest = void 0;
    }
    function WritableStreamMarkFirstWriteRequestInFlight(stream) {
      stream._inFlightWriteRequest = stream._writeRequests.shift();
    }
    function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
      if (stream._closeRequest !== void 0) {
        stream._closeRequest._reject(stream._storedError);
        stream._closeRequest = void 0;
      }
      const writer = stream._writer;
      if (writer !== void 0) {
        defaultWriterClosedPromiseReject(writer, stream._storedError);
      }
    }
    function WritableStreamUpdateBackpressure(stream, backpressure) {
      const writer = stream._writer;
      if (writer !== void 0 && backpressure !== stream._backpressure) {
        if (backpressure) {
          defaultWriterReadyPromiseReset(writer);
        } else {
          defaultWriterReadyPromiseResolve(writer);
        }
      }
      stream._backpressure = backpressure;
    }
    class WritableStreamDefaultWriter {
      constructor(stream) {
        assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
        assertWritableStream(stream, "First parameter");
        if (IsWritableStreamLocked(stream)) {
          throw new TypeError("This stream has already been locked for exclusive writing by another writer");
        }
        this._ownerWritableStream = stream;
        stream._writer = this;
        const state = stream._state;
        if (state === "writable") {
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
            defaultWriterReadyPromiseInitialize(this);
          } else {
            defaultWriterReadyPromiseInitializeAsResolved(this);
          }
          defaultWriterClosedPromiseInitialize(this);
        } else if (state === "erroring") {
          defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
          defaultWriterClosedPromiseInitialize(this);
        } else if (state === "closed") {
          defaultWriterReadyPromiseInitializeAsResolved(this);
          defaultWriterClosedPromiseInitializeAsResolved(this);
        } else {
          const storedError = stream._storedError;
          defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
          defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
        }
      }
      get closed() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
        }
        return this._closedPromise;
      }
      get desiredSize() {
        if (!IsWritableStreamDefaultWriter(this)) {
          throw defaultWriterBrandCheckException("desiredSize");
        }
        if (this._ownerWritableStream === void 0) {
          throw defaultWriterLockException("desiredSize");
        }
        return WritableStreamDefaultWriterGetDesiredSize(this);
      }
      get ready() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
        }
        return this._readyPromise;
      }
      abort(reason = void 0) {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
        }
        if (this._ownerWritableStream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("abort"));
        }
        return WritableStreamDefaultWriterAbort(this, reason);
      }
      close() {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("close"));
        }
        const stream = this._ownerWritableStream;
        if (stream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("close"));
        }
        if (WritableStreamCloseQueuedOrInFlight(stream)) {
          return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
        }
        return WritableStreamDefaultWriterClose(this);
      }
      releaseLock() {
        if (!IsWritableStreamDefaultWriter(this)) {
          throw defaultWriterBrandCheckException("releaseLock");
        }
        const stream = this._ownerWritableStream;
        if (stream === void 0) {
          return;
        }
        WritableStreamDefaultWriterRelease(this);
      }
      write(chunk = void 0) {
        if (!IsWritableStreamDefaultWriter(this)) {
          return promiseRejectedWith(defaultWriterBrandCheckException("write"));
        }
        if (this._ownerWritableStream === void 0) {
          return promiseRejectedWith(defaultWriterLockException("write to"));
        }
        return WritableStreamDefaultWriterWrite(this, chunk);
      }
    }
    Object.defineProperties(WritableStreamDefaultWriter.prototype, {
      abort: { enumerable: true },
      close: { enumerable: true },
      releaseLock: { enumerable: true },
      write: { enumerable: true },
      closed: { enumerable: true },
      desiredSize: { enumerable: true },
      ready: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStreamDefaultWriter",
        configurable: true
      });
    }
    function IsWritableStreamDefaultWriter(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_ownerWritableStream")) {
        return false;
      }
      return x instanceof WritableStreamDefaultWriter;
    }
    function WritableStreamDefaultWriterAbort(writer, reason) {
      const stream = writer._ownerWritableStream;
      return WritableStreamAbort(stream, reason);
    }
    function WritableStreamDefaultWriterClose(writer) {
      const stream = writer._ownerWritableStream;
      return WritableStreamClose(stream);
    }
    function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
      const stream = writer._ownerWritableStream;
      const state = stream._state;
      if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
        return promiseResolvedWith(void 0);
      }
      if (state === "errored") {
        return promiseRejectedWith(stream._storedError);
      }
      return WritableStreamDefaultWriterClose(writer);
    }
    function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
      if (writer._closedPromiseState === "pending") {
        defaultWriterClosedPromiseReject(writer, error2);
      } else {
        defaultWriterClosedPromiseResetToRejected(writer, error2);
      }
    }
    function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
      if (writer._readyPromiseState === "pending") {
        defaultWriterReadyPromiseReject(writer, error2);
      } else {
        defaultWriterReadyPromiseResetToRejected(writer, error2);
      }
    }
    function WritableStreamDefaultWriterGetDesiredSize(writer) {
      const stream = writer._ownerWritableStream;
      const state = stream._state;
      if (state === "errored" || state === "erroring") {
        return null;
      }
      if (state === "closed") {
        return 0;
      }
      return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
    }
    function WritableStreamDefaultWriterRelease(writer) {
      const stream = writer._ownerWritableStream;
      const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
      WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
      WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
      stream._writer = void 0;
      writer._ownerWritableStream = void 0;
    }
    function WritableStreamDefaultWriterWrite(writer, chunk) {
      const stream = writer._ownerWritableStream;
      const controller = stream._writableStreamController;
      const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
      if (stream !== writer._ownerWritableStream) {
        return promiseRejectedWith(defaultWriterLockException("write to"));
      }
      const state = stream._state;
      if (state === "errored") {
        return promiseRejectedWith(stream._storedError);
      }
      if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
        return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
      }
      if (state === "erroring") {
        return promiseRejectedWith(stream._storedError);
      }
      const promise = WritableStreamAddWriteRequest(stream);
      WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
      return promise;
    }
    const closeSentinel = {};
    class WritableStreamDefaultController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get abortReason() {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("abortReason");
        }
        return this._abortReason;
      }
      get signal() {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("signal");
        }
        if (this._abortController === void 0) {
          throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
        }
        return this._abortController.signal;
      }
      error(e = void 0) {
        if (!IsWritableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$2("error");
        }
        const state = this._controlledWritableStream._state;
        if (state !== "writable") {
          return;
        }
        WritableStreamDefaultControllerError(this, e);
      }
      [AbortSteps](reason) {
        const result = this._abortAlgorithm(reason);
        WritableStreamDefaultControllerClearAlgorithms(this);
        return result;
      }
      [ErrorSteps]() {
        ResetQueue(this);
      }
    }
    Object.defineProperties(WritableStreamDefaultController.prototype, {
      error: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "WritableStreamDefaultController",
        configurable: true
      });
    }
    function IsWritableStreamDefaultController(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_controlledWritableStream")) {
        return false;
      }
      return x instanceof WritableStreamDefaultController;
    }
    function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
      controller._controlledWritableStream = stream;
      stream._writableStreamController = controller;
      controller._queue = void 0;
      controller._queueTotalSize = void 0;
      ResetQueue(controller);
      controller._abortReason = void 0;
      controller._abortController = createAbortController();
      controller._started = false;
      controller._strategySizeAlgorithm = sizeAlgorithm;
      controller._strategyHWM = highWaterMark;
      controller._writeAlgorithm = writeAlgorithm;
      controller._closeAlgorithm = closeAlgorithm;
      controller._abortAlgorithm = abortAlgorithm;
      const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
      WritableStreamUpdateBackpressure(stream, backpressure);
      const startResult = startAlgorithm();
      const startPromise = promiseResolvedWith(startResult);
      uponPromise(startPromise, () => {
        controller._started = true;
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }, (r) => {
        controller._started = true;
        WritableStreamDealWithRejection(stream, r);
      });
    }
    function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
      const controller = Object.create(WritableStreamDefaultController.prototype);
      let startAlgorithm = () => void 0;
      let writeAlgorithm = () => promiseResolvedWith(void 0);
      let closeAlgorithm = () => promiseResolvedWith(void 0);
      let abortAlgorithm = () => promiseResolvedWith(void 0);
      if (underlyingSink.start !== void 0) {
        startAlgorithm = () => underlyingSink.start(controller);
      }
      if (underlyingSink.write !== void 0) {
        writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
      }
      if (underlyingSink.close !== void 0) {
        closeAlgorithm = () => underlyingSink.close();
      }
      if (underlyingSink.abort !== void 0) {
        abortAlgorithm = (reason) => underlyingSink.abort(reason);
      }
      SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
    }
    function WritableStreamDefaultControllerClearAlgorithms(controller) {
      controller._writeAlgorithm = void 0;
      controller._closeAlgorithm = void 0;
      controller._abortAlgorithm = void 0;
      controller._strategySizeAlgorithm = void 0;
    }
    function WritableStreamDefaultControllerClose(controller) {
      EnqueueValueWithSize(controller, closeSentinel, 0);
      WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
    }
    function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
      try {
        return controller._strategySizeAlgorithm(chunk);
      } catch (chunkSizeE) {
        WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
        return 1;
      }
    }
    function WritableStreamDefaultControllerGetDesiredSize(controller) {
      return controller._strategyHWM - controller._queueTotalSize;
    }
    function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
      try {
        EnqueueValueWithSize(controller, chunk, chunkSize);
      } catch (enqueueE) {
        WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
        return;
      }
      const stream = controller._controlledWritableStream;
      if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
        const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
        WritableStreamUpdateBackpressure(stream, backpressure);
      }
      WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
    }
    function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
      const stream = controller._controlledWritableStream;
      if (!controller._started) {
        return;
      }
      if (stream._inFlightWriteRequest !== void 0) {
        return;
      }
      const state = stream._state;
      if (state === "erroring") {
        WritableStreamFinishErroring(stream);
        return;
      }
      if (controller._queue.length === 0) {
        return;
      }
      const value = PeekQueueValue(controller);
      if (value === closeSentinel) {
        WritableStreamDefaultControllerProcessClose(controller);
      } else {
        WritableStreamDefaultControllerProcessWrite(controller, value);
      }
    }
    function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
      if (controller._controlledWritableStream._state === "writable") {
        WritableStreamDefaultControllerError(controller, error2);
      }
    }
    function WritableStreamDefaultControllerProcessClose(controller) {
      const stream = controller._controlledWritableStream;
      WritableStreamMarkCloseRequestInFlight(stream);
      DequeueValue(controller);
      const sinkClosePromise = controller._closeAlgorithm();
      WritableStreamDefaultControllerClearAlgorithms(controller);
      uponPromise(sinkClosePromise, () => {
        WritableStreamFinishInFlightClose(stream);
      }, (reason) => {
        WritableStreamFinishInFlightCloseWithError(stream, reason);
      });
    }
    function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
      const stream = controller._controlledWritableStream;
      WritableStreamMarkFirstWriteRequestInFlight(stream);
      const sinkWritePromise = controller._writeAlgorithm(chunk);
      uponPromise(sinkWritePromise, () => {
        WritableStreamFinishInFlightWrite(stream);
        const state = stream._state;
        DequeueValue(controller);
        if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }, (reason) => {
        if (stream._state === "writable") {
          WritableStreamDefaultControllerClearAlgorithms(controller);
        }
        WritableStreamFinishInFlightWriteWithError(stream, reason);
      });
    }
    function WritableStreamDefaultControllerGetBackpressure(controller) {
      const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
      return desiredSize <= 0;
    }
    function WritableStreamDefaultControllerError(controller, error2) {
      const stream = controller._controlledWritableStream;
      WritableStreamDefaultControllerClearAlgorithms(controller);
      WritableStreamStartErroring(stream, error2);
    }
    function streamBrandCheckException$2(name) {
      return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
    }
    function defaultControllerBrandCheckException$2(name) {
      return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
    }
    function defaultWriterBrandCheckException(name) {
      return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
    }
    function defaultWriterLockException(name) {
      return new TypeError("Cannot " + name + " a stream using a released writer");
    }
    function defaultWriterClosedPromiseInitialize(writer) {
      writer._closedPromise = newPromise((resolve2, reject) => {
        writer._closedPromise_resolve = resolve2;
        writer._closedPromise_reject = reject;
        writer._closedPromiseState = "pending";
      });
    }
    function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
      defaultWriterClosedPromiseInitialize(writer);
      defaultWriterClosedPromiseReject(writer, reason);
    }
    function defaultWriterClosedPromiseInitializeAsResolved(writer) {
      defaultWriterClosedPromiseInitialize(writer);
      defaultWriterClosedPromiseResolve(writer);
    }
    function defaultWriterClosedPromiseReject(writer, reason) {
      if (writer._closedPromise_reject === void 0) {
        return;
      }
      setPromiseIsHandledToTrue(writer._closedPromise);
      writer._closedPromise_reject(reason);
      writer._closedPromise_resolve = void 0;
      writer._closedPromise_reject = void 0;
      writer._closedPromiseState = "rejected";
    }
    function defaultWriterClosedPromiseResetToRejected(writer, reason) {
      defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
    }
    function defaultWriterClosedPromiseResolve(writer) {
      if (writer._closedPromise_resolve === void 0) {
        return;
      }
      writer._closedPromise_resolve(void 0);
      writer._closedPromise_resolve = void 0;
      writer._closedPromise_reject = void 0;
      writer._closedPromiseState = "resolved";
    }
    function defaultWriterReadyPromiseInitialize(writer) {
      writer._readyPromise = newPromise((resolve2, reject) => {
        writer._readyPromise_resolve = resolve2;
        writer._readyPromise_reject = reject;
      });
      writer._readyPromiseState = "pending";
    }
    function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
      defaultWriterReadyPromiseInitialize(writer);
      defaultWriterReadyPromiseReject(writer, reason);
    }
    function defaultWriterReadyPromiseInitializeAsResolved(writer) {
      defaultWriterReadyPromiseInitialize(writer);
      defaultWriterReadyPromiseResolve(writer);
    }
    function defaultWriterReadyPromiseReject(writer, reason) {
      if (writer._readyPromise_reject === void 0) {
        return;
      }
      setPromiseIsHandledToTrue(writer._readyPromise);
      writer._readyPromise_reject(reason);
      writer._readyPromise_resolve = void 0;
      writer._readyPromise_reject = void 0;
      writer._readyPromiseState = "rejected";
    }
    function defaultWriterReadyPromiseReset(writer) {
      defaultWriterReadyPromiseInitialize(writer);
    }
    function defaultWriterReadyPromiseResetToRejected(writer, reason) {
      defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
    }
    function defaultWriterReadyPromiseResolve(writer) {
      if (writer._readyPromise_resolve === void 0) {
        return;
      }
      writer._readyPromise_resolve(void 0);
      writer._readyPromise_resolve = void 0;
      writer._readyPromise_reject = void 0;
      writer._readyPromiseState = "fulfilled";
    }
    const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
    function isDOMExceptionConstructor(ctor) {
      if (!(typeof ctor === "function" || typeof ctor === "object")) {
        return false;
      }
      try {
        new ctor();
        return true;
      } catch (_a) {
        return false;
      }
    }
    function createDOMExceptionPolyfill() {
      const ctor = function DOMException2(message, name) {
        this.message = message || "";
        this.name = name || "Error";
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
      };
      ctor.prototype = Object.create(Error.prototype);
      Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
      return ctor;
    }
    const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
    function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
      const reader = AcquireReadableStreamDefaultReader(source);
      const writer = AcquireWritableStreamDefaultWriter(dest);
      source._disturbed = true;
      let shuttingDown = false;
      let currentWrite = promiseResolvedWith(void 0);
      return newPromise((resolve2, reject) => {
        let abortAlgorithm;
        if (signal !== void 0) {
          abortAlgorithm = () => {
            const error2 = new DOMException$1("Aborted", "AbortError");
            const actions = [];
            if (!preventAbort) {
              actions.push(() => {
                if (dest._state === "writable") {
                  return WritableStreamAbort(dest, error2);
                }
                return promiseResolvedWith(void 0);
              });
            }
            if (!preventCancel) {
              actions.push(() => {
                if (source._state === "readable") {
                  return ReadableStreamCancel(source, error2);
                }
                return promiseResolvedWith(void 0);
              });
            }
            shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
          };
          if (signal.aborted) {
            abortAlgorithm();
            return;
          }
          signal.addEventListener("abort", abortAlgorithm);
        }
        function pipeLoop() {
          return newPromise((resolveLoop, rejectLoop) => {
            function next(done) {
              if (done) {
                resolveLoop();
              } else {
                PerformPromiseThen(pipeStep(), next, rejectLoop);
              }
            }
            next(false);
          });
        }
        function pipeStep() {
          if (shuttingDown) {
            return promiseResolvedWith(true);
          }
          return PerformPromiseThen(writer._readyPromise, () => {
            return newPromise((resolveRead, rejectRead) => {
              ReadableStreamDefaultReaderRead(reader, {
                _chunkSteps: (chunk) => {
                  currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop2);
                  resolveRead(false);
                },
                _closeSteps: () => resolveRead(true),
                _errorSteps: rejectRead
              });
            });
          });
        }
        isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
          if (!preventAbort) {
            shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
          } else {
            shutdown(true, storedError);
          }
        });
        isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
          if (!preventCancel) {
            shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
          } else {
            shutdown(true, storedError);
          }
        });
        isOrBecomesClosed(source, reader._closedPromise, () => {
          if (!preventClose) {
            shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
          } else {
            shutdown();
          }
        });
        if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
          const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
          if (!preventCancel) {
            shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
          } else {
            shutdown(true, destClosed);
          }
        }
        setPromiseIsHandledToTrue(pipeLoop());
        function waitForWritesToFinish() {
          const oldCurrentWrite = currentWrite;
          return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
        }
        function isOrBecomesErrored(stream, promise, action) {
          if (stream._state === "errored") {
            action(stream._storedError);
          } else {
            uponRejection(promise, action);
          }
        }
        function isOrBecomesClosed(stream, promise, action) {
          if (stream._state === "closed") {
            action();
          } else {
            uponFulfillment(promise, action);
          }
        }
        function shutdownWithAction(action, originalIsError, originalError) {
          if (shuttingDown) {
            return;
          }
          shuttingDown = true;
          if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
            uponFulfillment(waitForWritesToFinish(), doTheRest);
          } else {
            doTheRest();
          }
          function doTheRest() {
            uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
          }
        }
        function shutdown(isError, error2) {
          if (shuttingDown) {
            return;
          }
          shuttingDown = true;
          if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
            uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
          } else {
            finalize(isError, error2);
          }
        }
        function finalize(isError, error2) {
          WritableStreamDefaultWriterRelease(writer);
          ReadableStreamReaderGenericRelease(reader);
          if (signal !== void 0) {
            signal.removeEventListener("abort", abortAlgorithm);
          }
          if (isError) {
            reject(error2);
          } else {
            resolve2(void 0);
          }
        }
      });
    }
    class ReadableStreamDefaultController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get desiredSize() {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("desiredSize");
        }
        return ReadableStreamDefaultControllerGetDesiredSize(this);
      }
      close() {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("close");
        }
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
          throw new TypeError("The stream is not in a state that permits close");
        }
        ReadableStreamDefaultControllerClose(this);
      }
      enqueue(chunk = void 0) {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("enqueue");
        }
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
          throw new TypeError("The stream is not in a state that permits enqueue");
        }
        return ReadableStreamDefaultControllerEnqueue(this, chunk);
      }
      error(e = void 0) {
        if (!IsReadableStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException$1("error");
        }
        ReadableStreamDefaultControllerError(this, e);
      }
      [CancelSteps](reason) {
        ResetQueue(this);
        const result = this._cancelAlgorithm(reason);
        ReadableStreamDefaultControllerClearAlgorithms(this);
        return result;
      }
      [PullSteps](readRequest) {
        const stream = this._controlledReadableStream;
        if (this._queue.length > 0) {
          const chunk = DequeueValue(this);
          if (this._closeRequested && this._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(this);
            ReadableStreamClose(stream);
          } else {
            ReadableStreamDefaultControllerCallPullIfNeeded(this);
          }
          readRequest._chunkSteps(chunk);
        } else {
          ReadableStreamAddReadRequest(stream, readRequest);
          ReadableStreamDefaultControllerCallPullIfNeeded(this);
        }
      }
    }
    Object.defineProperties(ReadableStreamDefaultController.prototype, {
      close: { enumerable: true },
      enqueue: { enumerable: true },
      error: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStreamDefaultController",
        configurable: true
      });
    }
    function IsReadableStreamDefaultController(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_controlledReadableStream")) {
        return false;
      }
      return x instanceof ReadableStreamDefaultController;
    }
    function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
      const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
      if (!shouldPull) {
        return;
      }
      if (controller._pulling) {
        controller._pullAgain = true;
        return;
      }
      controller._pulling = true;
      const pullPromise = controller._pullAlgorithm();
      uponPromise(pullPromise, () => {
        controller._pulling = false;
        if (controller._pullAgain) {
          controller._pullAgain = false;
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
      }, (e) => {
        ReadableStreamDefaultControllerError(controller, e);
      });
    }
    function ReadableStreamDefaultControllerShouldCallPull(controller) {
      const stream = controller._controlledReadableStream;
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return false;
      }
      if (!controller._started) {
        return false;
      }
      if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        return true;
      }
      const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
      if (desiredSize > 0) {
        return true;
      }
      return false;
    }
    function ReadableStreamDefaultControllerClearAlgorithms(controller) {
      controller._pullAlgorithm = void 0;
      controller._cancelAlgorithm = void 0;
      controller._strategySizeAlgorithm = void 0;
    }
    function ReadableStreamDefaultControllerClose(controller) {
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return;
      }
      const stream = controller._controlledReadableStream;
      controller._closeRequested = true;
      if (controller._queue.length === 0) {
        ReadableStreamDefaultControllerClearAlgorithms(controller);
        ReadableStreamClose(stream);
      }
    }
    function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
        return;
      }
      const stream = controller._controlledReadableStream;
      if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
        ReadableStreamFulfillReadRequest(stream, chunk, false);
      } else {
        let chunkSize;
        try {
          chunkSize = controller._strategySizeAlgorithm(chunk);
        } catch (chunkSizeE) {
          ReadableStreamDefaultControllerError(controller, chunkSizeE);
          throw chunkSizeE;
        }
        try {
          EnqueueValueWithSize(controller, chunk, chunkSize);
        } catch (enqueueE) {
          ReadableStreamDefaultControllerError(controller, enqueueE);
          throw enqueueE;
        }
      }
      ReadableStreamDefaultControllerCallPullIfNeeded(controller);
    }
    function ReadableStreamDefaultControllerError(controller, e) {
      const stream = controller._controlledReadableStream;
      if (stream._state !== "readable") {
        return;
      }
      ResetQueue(controller);
      ReadableStreamDefaultControllerClearAlgorithms(controller);
      ReadableStreamError(stream, e);
    }
    function ReadableStreamDefaultControllerGetDesiredSize(controller) {
      const state = controller._controlledReadableStream._state;
      if (state === "errored") {
        return null;
      }
      if (state === "closed") {
        return 0;
      }
      return controller._strategyHWM - controller._queueTotalSize;
    }
    function ReadableStreamDefaultControllerHasBackpressure(controller) {
      if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
        return false;
      }
      return true;
    }
    function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
      const state = controller._controlledReadableStream._state;
      if (!controller._closeRequested && state === "readable") {
        return true;
      }
      return false;
    }
    function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
      controller._controlledReadableStream = stream;
      controller._queue = void 0;
      controller._queueTotalSize = void 0;
      ResetQueue(controller);
      controller._started = false;
      controller._closeRequested = false;
      controller._pullAgain = false;
      controller._pulling = false;
      controller._strategySizeAlgorithm = sizeAlgorithm;
      controller._strategyHWM = highWaterMark;
      controller._pullAlgorithm = pullAlgorithm;
      controller._cancelAlgorithm = cancelAlgorithm;
      stream._readableStreamController = controller;
      const startResult = startAlgorithm();
      uponPromise(promiseResolvedWith(startResult), () => {
        controller._started = true;
        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
      }, (r) => {
        ReadableStreamDefaultControllerError(controller, r);
      });
    }
    function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
      const controller = Object.create(ReadableStreamDefaultController.prototype);
      let startAlgorithm = () => void 0;
      let pullAlgorithm = () => promiseResolvedWith(void 0);
      let cancelAlgorithm = () => promiseResolvedWith(void 0);
      if (underlyingSource.start !== void 0) {
        startAlgorithm = () => underlyingSource.start(controller);
      }
      if (underlyingSource.pull !== void 0) {
        pullAlgorithm = () => underlyingSource.pull(controller);
      }
      if (underlyingSource.cancel !== void 0) {
        cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
      }
      SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
    }
    function defaultControllerBrandCheckException$1(name) {
      return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
    }
    function ReadableStreamTee(stream, cloneForBranch2) {
      if (IsReadableByteStreamController(stream._readableStreamController)) {
        return ReadableByteStreamTee(stream);
      }
      return ReadableStreamDefaultTee(stream);
    }
    function ReadableStreamDefaultTee(stream, cloneForBranch2) {
      const reader = AcquireReadableStreamDefaultReader(stream);
      let reading = false;
      let canceled1 = false;
      let canceled2 = false;
      let reason1;
      let reason2;
      let branch1;
      let branch2;
      let resolveCancelPromise;
      const cancelPromise = newPromise((resolve2) => {
        resolveCancelPromise = resolve2;
      });
      function pullAlgorithm() {
        if (reading) {
          return promiseResolvedWith(void 0);
        }
        reading = true;
        const readRequest = {
          _chunkSteps: (chunk) => {
            queueMicrotask(() => {
              reading = false;
              const chunk1 = chunk;
              const chunk2 = chunk;
              if (!canceled1) {
                ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
              }
              if (!canceled2) {
                ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
              }
            });
          },
          _closeSteps: () => {
            reading = false;
            if (!canceled1) {
              ReadableStreamDefaultControllerClose(branch1._readableStreamController);
            }
            if (!canceled2) {
              ReadableStreamDefaultControllerClose(branch2._readableStreamController);
            }
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          },
          _errorSteps: () => {
            reading = false;
          }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
        return promiseResolvedWith(void 0);
      }
      function cancel1Algorithm(reason) {
        canceled1 = true;
        reason1 = reason;
        if (canceled2) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function cancel2Algorithm(reason) {
        canceled2 = true;
        reason2 = reason;
        if (canceled1) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function startAlgorithm() {
      }
      branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
      branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
      uponRejection(reader._closedPromise, (r) => {
        ReadableStreamDefaultControllerError(branch1._readableStreamController, r);
        ReadableStreamDefaultControllerError(branch2._readableStreamController, r);
        if (!canceled1 || !canceled2) {
          resolveCancelPromise(void 0);
        }
      });
      return [branch1, branch2];
    }
    function ReadableByteStreamTee(stream) {
      let reader = AcquireReadableStreamDefaultReader(stream);
      let reading = false;
      let canceled1 = false;
      let canceled2 = false;
      let reason1;
      let reason2;
      let branch1;
      let branch2;
      let resolveCancelPromise;
      const cancelPromise = newPromise((resolve2) => {
        resolveCancelPromise = resolve2;
      });
      function forwardReaderError(thisReader) {
        uponRejection(thisReader._closedPromise, (r) => {
          if (thisReader !== reader) {
            return;
          }
          ReadableByteStreamControllerError(branch1._readableStreamController, r);
          ReadableByteStreamControllerError(branch2._readableStreamController, r);
          if (!canceled1 || !canceled2) {
            resolveCancelPromise(void 0);
          }
        });
      }
      function pullWithDefaultReader() {
        if (IsReadableStreamBYOBReader(reader)) {
          ReadableStreamReaderGenericRelease(reader);
          reader = AcquireReadableStreamDefaultReader(stream);
          forwardReaderError(reader);
        }
        const readRequest = {
          _chunkSteps: (chunk) => {
            queueMicrotask(() => {
              reading = false;
              const chunk1 = chunk;
              let chunk2 = chunk;
              if (!canceled1 && !canceled2) {
                try {
                  chunk2 = CloneAsUint8Array(chunk);
                } catch (cloneE) {
                  ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                  ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                  resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                  return;
                }
              }
              if (!canceled1) {
                ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
              }
              if (!canceled2) {
                ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
              }
            });
          },
          _closeSteps: () => {
            reading = false;
            if (!canceled1) {
              ReadableByteStreamControllerClose(branch1._readableStreamController);
            }
            if (!canceled2) {
              ReadableByteStreamControllerClose(branch2._readableStreamController);
            }
            if (branch1._readableStreamController._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
            }
            if (branch2._readableStreamController._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
            }
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          },
          _errorSteps: () => {
            reading = false;
          }
        };
        ReadableStreamDefaultReaderRead(reader, readRequest);
      }
      function pullWithBYOBReader(view, forBranch2) {
        if (IsReadableStreamDefaultReader(reader)) {
          ReadableStreamReaderGenericRelease(reader);
          reader = AcquireReadableStreamBYOBReader(stream);
          forwardReaderError(reader);
        }
        const byobBranch = forBranch2 ? branch2 : branch1;
        const otherBranch = forBranch2 ? branch1 : branch2;
        const readIntoRequest = {
          _chunkSteps: (chunk) => {
            queueMicrotask(() => {
              reading = false;
              const byobCanceled = forBranch2 ? canceled2 : canceled1;
              const otherCanceled = forBranch2 ? canceled1 : canceled2;
              if (!otherCanceled) {
                let clonedChunk;
                try {
                  clonedChunk = CloneAsUint8Array(chunk);
                } catch (cloneE) {
                  ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                  ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                  resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                  return;
                }
                if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
              } else if (!byobCanceled) {
                ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
              }
            });
          },
          _closeSteps: (chunk) => {
            reading = false;
            const byobCanceled = forBranch2 ? canceled2 : canceled1;
            const otherCanceled = forBranch2 ? canceled1 : canceled2;
            if (!byobCanceled) {
              ReadableByteStreamControllerClose(byobBranch._readableStreamController);
            }
            if (!otherCanceled) {
              ReadableByteStreamControllerClose(otherBranch._readableStreamController);
            }
            if (chunk !== void 0) {
              if (!byobCanceled) {
                ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
              }
              if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
              }
            }
            if (!byobCanceled || !otherCanceled) {
              resolveCancelPromise(void 0);
            }
          },
          _errorSteps: () => {
            reading = false;
          }
        };
        ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
      }
      function pull1Algorithm() {
        if (reading) {
          return promiseResolvedWith(void 0);
        }
        reading = true;
        const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
        if (byobRequest === null) {
          pullWithDefaultReader();
        } else {
          pullWithBYOBReader(byobRequest._view, false);
        }
        return promiseResolvedWith(void 0);
      }
      function pull2Algorithm() {
        if (reading) {
          return promiseResolvedWith(void 0);
        }
        reading = true;
        const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
        if (byobRequest === null) {
          pullWithDefaultReader();
        } else {
          pullWithBYOBReader(byobRequest._view, true);
        }
        return promiseResolvedWith(void 0);
      }
      function cancel1Algorithm(reason) {
        canceled1 = true;
        reason1 = reason;
        if (canceled2) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function cancel2Algorithm(reason) {
        canceled2 = true;
        reason2 = reason;
        if (canceled1) {
          const compositeReason = CreateArrayFromList([reason1, reason2]);
          const cancelResult = ReadableStreamCancel(stream, compositeReason);
          resolveCancelPromise(cancelResult);
        }
        return cancelPromise;
      }
      function startAlgorithm() {
        return;
      }
      branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
      branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
      forwardReaderError(reader);
      return [branch1, branch2];
    }
    function convertUnderlyingDefaultOrByteSource(source, context) {
      assertDictionary(source, context);
      const original = source;
      const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
      const cancel = original === null || original === void 0 ? void 0 : original.cancel;
      const pull = original === null || original === void 0 ? void 0 : original.pull;
      const start = original === null || original === void 0 ? void 0 : original.start;
      const type = original === null || original === void 0 ? void 0 : original.type;
      return {
        autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
        cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
        pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
        start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
        type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
      };
    }
    function convertUnderlyingSourceCancelCallback(fn, original, context) {
      assertFunction(fn, context);
      return (reason) => promiseCall(fn, original, [reason]);
    }
    function convertUnderlyingSourcePullCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => promiseCall(fn, original, [controller]);
    }
    function convertUnderlyingSourceStartCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertReadableStreamType(type, context) {
      type = `${type}`;
      if (type !== "bytes") {
        throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
      }
      return type;
    }
    function convertReaderOptions(options2, context) {
      assertDictionary(options2, context);
      const mode = options2 === null || options2 === void 0 ? void 0 : options2.mode;
      return {
        mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
      };
    }
    function convertReadableStreamReaderMode(mode, context) {
      mode = `${mode}`;
      if (mode !== "byob") {
        throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
      }
      return mode;
    }
    function convertIteratorOptions(options2, context) {
      assertDictionary(options2, context);
      const preventCancel = options2 === null || options2 === void 0 ? void 0 : options2.preventCancel;
      return { preventCancel: Boolean(preventCancel) };
    }
    function convertPipeOptions(options2, context) {
      assertDictionary(options2, context);
      const preventAbort = options2 === null || options2 === void 0 ? void 0 : options2.preventAbort;
      const preventCancel = options2 === null || options2 === void 0 ? void 0 : options2.preventCancel;
      const preventClose = options2 === null || options2 === void 0 ? void 0 : options2.preventClose;
      const signal = options2 === null || options2 === void 0 ? void 0 : options2.signal;
      if (signal !== void 0) {
        assertAbortSignal(signal, `${context} has member 'signal' that`);
      }
      return {
        preventAbort: Boolean(preventAbort),
        preventCancel: Boolean(preventCancel),
        preventClose: Boolean(preventClose),
        signal
      };
    }
    function assertAbortSignal(signal, context) {
      if (!isAbortSignal2(signal)) {
        throw new TypeError(`${context} is not an AbortSignal.`);
      }
    }
    function convertReadableWritablePair(pair, context) {
      assertDictionary(pair, context);
      const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
      assertRequiredField(readable, "readable", "ReadableWritablePair");
      assertReadableStream(readable, `${context} has member 'readable' that`);
      const writable2 = pair === null || pair === void 0 ? void 0 : pair.writable;
      assertRequiredField(writable2, "writable", "ReadableWritablePair");
      assertWritableStream(writable2, `${context} has member 'writable' that`);
      return { readable, writable: writable2 };
    }
    class ReadableStream2 {
      constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
        if (rawUnderlyingSource === void 0) {
          rawUnderlyingSource = null;
        } else {
          assertObject(rawUnderlyingSource, "First parameter");
        }
        const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
        const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
        InitializeReadableStream(this);
        if (underlyingSource.type === "bytes") {
          if (strategy.size !== void 0) {
            throw new RangeError("The strategy for a byte stream cannot have a size function");
          }
          const highWaterMark = ExtractHighWaterMark(strategy, 0);
          SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
        } else {
          const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
          const highWaterMark = ExtractHighWaterMark(strategy, 1);
          SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
        }
      }
      get locked() {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("locked");
        }
        return IsReadableStreamLocked(this);
      }
      cancel(reason = void 0) {
        if (!IsReadableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$1("cancel"));
        }
        if (IsReadableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
        }
        return ReadableStreamCancel(this, reason);
      }
      getReader(rawOptions = void 0) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("getReader");
        }
        const options2 = convertReaderOptions(rawOptions, "First parameter");
        if (options2.mode === void 0) {
          return AcquireReadableStreamDefaultReader(this);
        }
        return AcquireReadableStreamBYOBReader(this);
      }
      pipeThrough(rawTransform, rawOptions = {}) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("pipeThrough");
        }
        assertRequiredArgument(rawTransform, 1, "pipeThrough");
        const transform = convertReadableWritablePair(rawTransform, "First parameter");
        const options2 = convertPipeOptions(rawOptions, "Second parameter");
        if (IsReadableStreamLocked(this)) {
          throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
        }
        if (IsWritableStreamLocked(transform.writable)) {
          throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
        }
        const promise = ReadableStreamPipeTo(this, transform.writable, options2.preventClose, options2.preventAbort, options2.preventCancel, options2.signal);
        setPromiseIsHandledToTrue(promise);
        return transform.readable;
      }
      pipeTo(destination, rawOptions = {}) {
        if (!IsReadableStream(this)) {
          return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
        }
        if (destination === void 0) {
          return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
        }
        if (!IsWritableStream(destination)) {
          return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
        }
        let options2;
        try {
          options2 = convertPipeOptions(rawOptions, "Second parameter");
        } catch (e) {
          return promiseRejectedWith(e);
        }
        if (IsReadableStreamLocked(this)) {
          return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
        }
        if (IsWritableStreamLocked(destination)) {
          return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
        }
        return ReadableStreamPipeTo(this, destination, options2.preventClose, options2.preventAbort, options2.preventCancel, options2.signal);
      }
      tee() {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("tee");
        }
        const branches = ReadableStreamTee(this);
        return CreateArrayFromList(branches);
      }
      values(rawOptions = void 0) {
        if (!IsReadableStream(this)) {
          throw streamBrandCheckException$1("values");
        }
        const options2 = convertIteratorOptions(rawOptions, "First parameter");
        return AcquireReadableStreamAsyncIterator(this, options2.preventCancel);
      }
    }
    Object.defineProperties(ReadableStream2.prototype, {
      cancel: { enumerable: true },
      getReader: { enumerable: true },
      pipeThrough: { enumerable: true },
      pipeTo: { enumerable: true },
      tee: { enumerable: true },
      values: { enumerable: true },
      locked: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
        value: "ReadableStream",
        configurable: true
      });
    }
    if (typeof SymbolPolyfill.asyncIterator === "symbol") {
      Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
        value: ReadableStream2.prototype.values,
        writable: true,
        configurable: true
      });
    }
    function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
      const stream = Object.create(ReadableStream2.prototype);
      InitializeReadableStream(stream);
      const controller = Object.create(ReadableStreamDefaultController.prototype);
      SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
      return stream;
    }
    function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
      const stream = Object.create(ReadableStream2.prototype);
      InitializeReadableStream(stream);
      const controller = Object.create(ReadableByteStreamController.prototype);
      SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
      return stream;
    }
    function InitializeReadableStream(stream) {
      stream._state = "readable";
      stream._reader = void 0;
      stream._storedError = void 0;
      stream._disturbed = false;
    }
    function IsReadableStream(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_readableStreamController")) {
        return false;
      }
      return x instanceof ReadableStream2;
    }
    function IsReadableStreamLocked(stream) {
      if (stream._reader === void 0) {
        return false;
      }
      return true;
    }
    function ReadableStreamCancel(stream, reason) {
      stream._disturbed = true;
      if (stream._state === "closed") {
        return promiseResolvedWith(void 0);
      }
      if (stream._state === "errored") {
        return promiseRejectedWith(stream._storedError);
      }
      ReadableStreamClose(stream);
      const reader = stream._reader;
      if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
        reader._readIntoRequests.forEach((readIntoRequest) => {
          readIntoRequest._closeSteps(void 0);
        });
        reader._readIntoRequests = new SimpleQueue();
      }
      const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
      return transformPromiseWith(sourceCancelPromise, noop2);
    }
    function ReadableStreamClose(stream) {
      stream._state = "closed";
      const reader = stream._reader;
      if (reader === void 0) {
        return;
      }
      defaultReaderClosedPromiseResolve(reader);
      if (IsReadableStreamDefaultReader(reader)) {
        reader._readRequests.forEach((readRequest) => {
          readRequest._closeSteps();
        });
        reader._readRequests = new SimpleQueue();
      }
    }
    function ReadableStreamError(stream, e) {
      stream._state = "errored";
      stream._storedError = e;
      const reader = stream._reader;
      if (reader === void 0) {
        return;
      }
      defaultReaderClosedPromiseReject(reader, e);
      if (IsReadableStreamDefaultReader(reader)) {
        reader._readRequests.forEach((readRequest) => {
          readRequest._errorSteps(e);
        });
        reader._readRequests = new SimpleQueue();
      } else {
        reader._readIntoRequests.forEach((readIntoRequest) => {
          readIntoRequest._errorSteps(e);
        });
        reader._readIntoRequests = new SimpleQueue();
      }
    }
    function streamBrandCheckException$1(name) {
      return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
    }
    function convertQueuingStrategyInit(init2, context) {
      assertDictionary(init2, context);
      const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
      assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
      return {
        highWaterMark: convertUnrestrictedDouble(highWaterMark)
      };
    }
    const byteLengthSizeFunction = (chunk) => {
      return chunk.byteLength;
    };
    Object.defineProperty(byteLengthSizeFunction, "name", {
      value: "size",
      configurable: true
    });
    class ByteLengthQueuingStrategy {
      constructor(options2) {
        assertRequiredArgument(options2, 1, "ByteLengthQueuingStrategy");
        options2 = convertQueuingStrategyInit(options2, "First parameter");
        this._byteLengthQueuingStrategyHighWaterMark = options2.highWaterMark;
      }
      get highWaterMark() {
        if (!IsByteLengthQueuingStrategy(this)) {
          throw byteLengthBrandCheckException("highWaterMark");
        }
        return this._byteLengthQueuingStrategyHighWaterMark;
      }
      get size() {
        if (!IsByteLengthQueuingStrategy(this)) {
          throw byteLengthBrandCheckException("size");
        }
        return byteLengthSizeFunction;
      }
    }
    Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
      highWaterMark: { enumerable: true },
      size: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
        value: "ByteLengthQueuingStrategy",
        configurable: true
      });
    }
    function byteLengthBrandCheckException(name) {
      return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
    }
    function IsByteLengthQueuingStrategy(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_byteLengthQueuingStrategyHighWaterMark")) {
        return false;
      }
      return x instanceof ByteLengthQueuingStrategy;
    }
    const countSizeFunction = () => {
      return 1;
    };
    Object.defineProperty(countSizeFunction, "name", {
      value: "size",
      configurable: true
    });
    class CountQueuingStrategy {
      constructor(options2) {
        assertRequiredArgument(options2, 1, "CountQueuingStrategy");
        options2 = convertQueuingStrategyInit(options2, "First parameter");
        this._countQueuingStrategyHighWaterMark = options2.highWaterMark;
      }
      get highWaterMark() {
        if (!IsCountQueuingStrategy(this)) {
          throw countBrandCheckException("highWaterMark");
        }
        return this._countQueuingStrategyHighWaterMark;
      }
      get size() {
        if (!IsCountQueuingStrategy(this)) {
          throw countBrandCheckException("size");
        }
        return countSizeFunction;
      }
    }
    Object.defineProperties(CountQueuingStrategy.prototype, {
      highWaterMark: { enumerable: true },
      size: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
        value: "CountQueuingStrategy",
        configurable: true
      });
    }
    function countBrandCheckException(name) {
      return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
    }
    function IsCountQueuingStrategy(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_countQueuingStrategyHighWaterMark")) {
        return false;
      }
      return x instanceof CountQueuingStrategy;
    }
    function convertTransformer(original, context) {
      assertDictionary(original, context);
      const flush = original === null || original === void 0 ? void 0 : original.flush;
      const readableType = original === null || original === void 0 ? void 0 : original.readableType;
      const start = original === null || original === void 0 ? void 0 : original.start;
      const transform = original === null || original === void 0 ? void 0 : original.transform;
      const writableType = original === null || original === void 0 ? void 0 : original.writableType;
      return {
        flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
        readableType,
        start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
        transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
        writableType
      };
    }
    function convertTransformerFlushCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => promiseCall(fn, original, [controller]);
    }
    function convertTransformerStartCallback(fn, original, context) {
      assertFunction(fn, context);
      return (controller) => reflectCall(fn, original, [controller]);
    }
    function convertTransformerTransformCallback(fn, original, context) {
      assertFunction(fn, context);
      return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
    }
    class TransformStream {
      constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
        if (rawTransformer === void 0) {
          rawTransformer = null;
        }
        const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
        const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
        const transformer = convertTransformer(rawTransformer, "First parameter");
        if (transformer.readableType !== void 0) {
          throw new RangeError("Invalid readableType specified");
        }
        if (transformer.writableType !== void 0) {
          throw new RangeError("Invalid writableType specified");
        }
        const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
        const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
        const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
        const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
        let startPromise_resolve;
        const startPromise = newPromise((resolve2) => {
          startPromise_resolve = resolve2;
        });
        InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
        if (transformer.start !== void 0) {
          startPromise_resolve(transformer.start(this._transformStreamController));
        } else {
          startPromise_resolve(void 0);
        }
      }
      get readable() {
        if (!IsTransformStream(this)) {
          throw streamBrandCheckException("readable");
        }
        return this._readable;
      }
      get writable() {
        if (!IsTransformStream(this)) {
          throw streamBrandCheckException("writable");
        }
        return this._writable;
      }
    }
    Object.defineProperties(TransformStream.prototype, {
      readable: { enumerable: true },
      writable: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
        value: "TransformStream",
        configurable: true
      });
    }
    function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
      function startAlgorithm() {
        return startPromise;
      }
      function writeAlgorithm(chunk) {
        return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
      }
      function abortAlgorithm(reason) {
        return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
      }
      function closeAlgorithm() {
        return TransformStreamDefaultSinkCloseAlgorithm(stream);
      }
      stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
      function pullAlgorithm() {
        return TransformStreamDefaultSourcePullAlgorithm(stream);
      }
      function cancelAlgorithm(reason) {
        TransformStreamErrorWritableAndUnblockWrite(stream, reason);
        return promiseResolvedWith(void 0);
      }
      stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
      stream._backpressure = void 0;
      stream._backpressureChangePromise = void 0;
      stream._backpressureChangePromise_resolve = void 0;
      TransformStreamSetBackpressure(stream, true);
      stream._transformStreamController = void 0;
    }
    function IsTransformStream(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_transformStreamController")) {
        return false;
      }
      return x instanceof TransformStream;
    }
    function TransformStreamError(stream, e) {
      ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e);
      TransformStreamErrorWritableAndUnblockWrite(stream, e);
    }
    function TransformStreamErrorWritableAndUnblockWrite(stream, e) {
      TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
      WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e);
      if (stream._backpressure) {
        TransformStreamSetBackpressure(stream, false);
      }
    }
    function TransformStreamSetBackpressure(stream, backpressure) {
      if (stream._backpressureChangePromise !== void 0) {
        stream._backpressureChangePromise_resolve();
      }
      stream._backpressureChangePromise = newPromise((resolve2) => {
        stream._backpressureChangePromise_resolve = resolve2;
      });
      stream._backpressure = backpressure;
    }
    class TransformStreamDefaultController {
      constructor() {
        throw new TypeError("Illegal constructor");
      }
      get desiredSize() {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("desiredSize");
        }
        const readableController = this._controlledTransformStream._readable._readableStreamController;
        return ReadableStreamDefaultControllerGetDesiredSize(readableController);
      }
      enqueue(chunk = void 0) {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("enqueue");
        }
        TransformStreamDefaultControllerEnqueue(this, chunk);
      }
      error(reason = void 0) {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("error");
        }
        TransformStreamDefaultControllerError(this, reason);
      }
      terminate() {
        if (!IsTransformStreamDefaultController(this)) {
          throw defaultControllerBrandCheckException("terminate");
        }
        TransformStreamDefaultControllerTerminate(this);
      }
    }
    Object.defineProperties(TransformStreamDefaultController.prototype, {
      enqueue: { enumerable: true },
      error: { enumerable: true },
      terminate: { enumerable: true },
      desiredSize: { enumerable: true }
    });
    if (typeof SymbolPolyfill.toStringTag === "symbol") {
      Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
        value: "TransformStreamDefaultController",
        configurable: true
      });
    }
    function IsTransformStreamDefaultController(x) {
      if (!typeIsObject(x)) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(x, "_controlledTransformStream")) {
        return false;
      }
      return x instanceof TransformStreamDefaultController;
    }
    function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
      controller._controlledTransformStream = stream;
      stream._transformStreamController = controller;
      controller._transformAlgorithm = transformAlgorithm;
      controller._flushAlgorithm = flushAlgorithm;
    }
    function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
      const controller = Object.create(TransformStreamDefaultController.prototype);
      let transformAlgorithm = (chunk) => {
        try {
          TransformStreamDefaultControllerEnqueue(controller, chunk);
          return promiseResolvedWith(void 0);
        } catch (transformResultE) {
          return promiseRejectedWith(transformResultE);
        }
      };
      let flushAlgorithm = () => promiseResolvedWith(void 0);
      if (transformer.transform !== void 0) {
        transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
      }
      if (transformer.flush !== void 0) {
        flushAlgorithm = () => transformer.flush(controller);
      }
      SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
    }
    function TransformStreamDefaultControllerClearAlgorithms(controller) {
      controller._transformAlgorithm = void 0;
      controller._flushAlgorithm = void 0;
    }
    function TransformStreamDefaultControllerEnqueue(controller, chunk) {
      const stream = controller._controlledTransformStream;
      const readableController = stream._readable._readableStreamController;
      if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
        throw new TypeError("Readable side is not in a state that permits enqueue");
      }
      try {
        ReadableStreamDefaultControllerEnqueue(readableController, chunk);
      } catch (e) {
        TransformStreamErrorWritableAndUnblockWrite(stream, e);
        throw stream._readable._storedError;
      }
      const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
      if (backpressure !== stream._backpressure) {
        TransformStreamSetBackpressure(stream, true);
      }
    }
    function TransformStreamDefaultControllerError(controller, e) {
      TransformStreamError(controller._controlledTransformStream, e);
    }
    function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
      const transformPromise = controller._transformAlgorithm(chunk);
      return transformPromiseWith(transformPromise, void 0, (r) => {
        TransformStreamError(controller._controlledTransformStream, r);
        throw r;
      });
    }
    function TransformStreamDefaultControllerTerminate(controller) {
      const stream = controller._controlledTransformStream;
      const readableController = stream._readable._readableStreamController;
      ReadableStreamDefaultControllerClose(readableController);
      const error2 = new TypeError("TransformStream terminated");
      TransformStreamErrorWritableAndUnblockWrite(stream, error2);
    }
    function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
      const controller = stream._transformStreamController;
      if (stream._backpressure) {
        const backpressureChangePromise = stream._backpressureChangePromise;
        return transformPromiseWith(backpressureChangePromise, () => {
          const writable2 = stream._writable;
          const state = writable2._state;
          if (state === "erroring") {
            throw writable2._storedError;
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        });
      }
      return TransformStreamDefaultControllerPerformTransform(controller, chunk);
    }
    function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
      TransformStreamError(stream, reason);
      return promiseResolvedWith(void 0);
    }
    function TransformStreamDefaultSinkCloseAlgorithm(stream) {
      const readable = stream._readable;
      const controller = stream._transformStreamController;
      const flushPromise = controller._flushAlgorithm();
      TransformStreamDefaultControllerClearAlgorithms(controller);
      return transformPromiseWith(flushPromise, () => {
        if (readable._state === "errored") {
          throw readable._storedError;
        }
        ReadableStreamDefaultControllerClose(readable._readableStreamController);
      }, (r) => {
        TransformStreamError(stream, r);
        throw readable._storedError;
      });
    }
    function TransformStreamDefaultSourcePullAlgorithm(stream) {
      TransformStreamSetBackpressure(stream, false);
      return stream._backpressureChangePromise;
    }
    function defaultControllerBrandCheckException(name) {
      return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
    }
    function streamBrandCheckException(name) {
      return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
    }
    exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
    exports2.CountQueuingStrategy = CountQueuingStrategy;
    exports2.ReadableByteStreamController = ReadableByteStreamController;
    exports2.ReadableStream = ReadableStream2;
    exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
    exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
    exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
    exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
    exports2.TransformStream = TransformStream;
    exports2.TransformStreamDefaultController = TransformStreamDefaultController;
    exports2.WritableStream = WritableStream;
    exports2.WritableStreamDefaultController = WritableStreamDefaultController;
    exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
    Object.defineProperty(exports2, "__esModule", { value: true });
  });
})(ponyfill_es2018, ponyfill_es2018.exports);
var POOL_SIZE$1 = 65536;
if (!globalThis.ReadableStream) {
  try {
    Object.assign(globalThis, require("stream/web"));
  } catch (error2) {
    Object.assign(globalThis, ponyfill_es2018.exports);
  }
}
try {
  const { Blob: Blob3 } = require("buffer");
  if (Blob3 && !Blob3.prototype.stream) {
    Blob3.prototype.stream = function name(params) {
      let position = 0;
      const blob = this;
      return new ReadableStream({
        type: "bytes",
        async pull(ctrl) {
          const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
          const buffer = await chunk.arrayBuffer();
          position += buffer.byteLength;
          ctrl.enqueue(new Uint8Array(buffer));
          if (position === blob.size) {
            ctrl.close();
          }
        }
      });
    };
  }
} catch (error2) {
}
var POOL_SIZE = 65536;
async function* toIterator(parts, clone2 = true) {
  for (let part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        let end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
var _Blob = class Blob {
  #parts = [];
  #type = "";
  #size = 0;
  constructor(blobParts = [], options2 = {}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let part;
      if (ArrayBuffer.isView(element)) {
        part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
      } else if (element instanceof ArrayBuffer) {
        part = new Uint8Array(element.slice(0));
      } else if (element instanceof Blob) {
        part = element;
      } else {
        part = new TextEncoder().encode(element);
      }
      size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
      return part;
    });
    const type = options2.type === void 0 ? "" : String(options2.type);
    this.#type = /[^\u0020-\u007E]/.test(type) ? "" : type;
    this.#size = size;
    this.#parts = parts;
  }
  get size() {
    return this.#size;
  }
  get type() {
    return this.#type;
  }
  async text() {
    const decoder = new TextDecoder();
    let str = "";
    for await (let part of toIterator(this.#parts, false)) {
      str += decoder.decode(part, { stream: true });
    }
    str += decoder.decode();
    return str;
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of toIterator(this.#parts, false)) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    const it = toIterator(this.#parts, true);
    return new ReadableStream({
      type: "bytes",
      async pull(ctrl) {
        const chunk = await it.next();
        chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
      }
    });
  }
  slice(start = 0, end = this.size, type = "") {
    const { size } = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = this.#parts;
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      if (added >= span) {
        break;
      }
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        let chunk;
        if (ArrayBuffer.isView(part)) {
          chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
          added += chunk.byteLength;
        } else {
          chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
          added += chunk.size;
        }
        blobParts.push(chunk);
        relativeStart = 0;
      }
    }
    const blob = new Blob([], { type: String(type).toLowerCase() });
    blob.#size = span;
    blob.#parts = blobParts;
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
};
Object.defineProperties(_Blob.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
});
var Blob2 = _Blob;
var Blob$1 = Blob2;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    length += isBlob(value) ? value.size : Buffer.byteLength(String(value));
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (import_util.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = import_stream.default.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_stream.default) {
      body.on("error", (error_) => {
        const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
        this[INTERNALS$2].error = error2;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new Blob$1([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true }
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = import_stream.default.Readable.from(body.stream());
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error2 = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_stream.PassThrough({ highWaterMark });
    p2 = new import_stream.PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof import_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const { body } = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    import_stream.default.Readable.from(body.stream()).pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw error2;
  }
};
var validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
    throw error2;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback, thisArg = void 0) {
    for (const name of this.keys()) {
      Reflect.apply(callback, thisArg, [this.get(name), name, this]);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = { enumerable: true };
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status != null ? options2.status : 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      type: "default",
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get type() {
    return this[INTERNALS$1].type;
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response(clone(this, this.highWaterMark), {
      type: this.type,
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  static error() {
    const response = new Response(null, { status: 0, statusText: "" });
    response[INTERNALS$1].type = "error";
    return response;
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response.prototype, {
  type: { enumerable: true },
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal != null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return (0, import_url.format)(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = dataUriToBuffer$1(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s2) => {
        let endedWithEventsCount;
        s2.prependListener("end", () => {
          endedWithEventsCount = s2._eventsCount;
        });
        s2.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s2._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              headers.set("Location", locationURL);
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), reject);
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), reject);
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), reject);
        raw.once("data", (chunk) => {
          body = (chunk[0] & 15) === 8 ? (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), reject) : (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), reject);
          response = new Response(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), reject);
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}

// node_modules/@sveltejs/kit/dist/node.js
function getRawBody(req) {
  return new Promise((fulfil, reject) => {
    const h = req.headers;
    if (!h["content-type"]) {
      return fulfil(null);
    }
    req.on("error", reject);
    const length = Number(h["content-length"]);
    if (isNaN(length) && h["transfer-encoding"] == null) {
      return fulfil(null);
    }
    let data = new Uint8Array(length || 0);
    if (length > 0) {
      let offset = 0;
      req.on("data", (chunk) => {
        const new_len = offset + Buffer.byteLength(chunk);
        if (new_len > length) {
          return reject({
            status: 413,
            reason: 'Exceeded "Content-Length" limit'
          });
        }
        data.set(chunk, offset);
        offset = new_len;
      });
    } else {
      req.on("data", (chunk) => {
        const new_data = new Uint8Array(data.length + chunk.length);
        new_data.set(data, 0);
        new_data.set(chunk, data.length);
        data = new_data;
      });
    }
    req.on("end", () => {
      fulfil(data);
    });
  });
}

// .svelte-kit/output/server/app.js
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _map;
function get_single_valued_header(headers, key) {
  const value = headers[key];
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return void 0;
    }
    if (value.length > 1) {
      throw new Error(`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`);
    }
    return value[0];
  }
  return value;
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error$2(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s2) {
  return typeof s2 === "string" || s2 instanceof String;
}
function is_content_type_textual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}
async function render_endpoint(request, route, match) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler) {
    return;
  }
  const params = route.params(match);
  const response = await handler({ ...request, params });
  const preface = `Invalid response from route ${request.path}`;
  if (!response) {
    return;
  }
  if (typeof response !== "object") {
    return error$2(`${preface}: expected an object, got ${typeof response}`);
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = get_single_valued_header(headers, "content-type");
  const is_type_textual = is_content_type_textual(type);
  if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
    return error$2(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = { ...headers, "content-type": "application/json; charset=utf-8" };
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop$1() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function writable(value, start = noop$1) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop$1) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop$1;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash$1(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var escape_json_string_in_html_dict = {
  '"': '\\"',
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape_json_string_in_html(str) {
  return escape$1(str, escape_json_string_in_html_dict, (code) => `\\u${code.toString(16).toUpperCase()}`);
}
var escape_html_attr_dict = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function escape_html_attr(str) {
  return '"' + escape$1(str, escape_html_attr_dict, (code) => `&#${code};`) + '"';
}
function escape$1(str, dict, unicode_encoder) {
  let result = "";
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char in dict) {
      result += dict[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += unicode_encoder(code);
      }
    } else {
      result += char;
    }
  }
  return result;
}
var s$1 = JSON.stringify;
async function render_response({
  branch,
  options: options2,
  $session,
  page_config,
  status,
  error: error2,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options2.get_stack(error2);
  }
  if (page_config.ssr) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session2 = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session: session2
      },
      page,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session2.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page && page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${page && page.path ? try_serialize(page.path, (error3) => {
      throw new Error(`Failed to serialize page.path: ${error3.message}`);
    }) : null},
						query: new URLSearchParams(${page && page.query ? s$1(page.query.toString()) : ""}),
						params: ${page && page.params ? try_serialize(page.params, (error3) => {
      throw new Error(`Failed to serialize page.params: ${error3.message}`);
    }) : null}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options2.service_worker) {
    init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    let attributes = `type="application/json" data-type="svelte-data" data-url=${escape_html_attr(url)}`;
    if (body2)
      attributes += ` data-body="${hash$1(body2)}"`;
    return `<script ${attributes}>${json}<\/script>`;
  }).join("\n\n	")}
		`;
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize({ ...error2, name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  stuff,
  prerender_enabled,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded;
  const page_proxy = new Proxy(page, {
    get: (target, prop, receiver) => {
      if (prop === "query" && prerender_enabled) {
        throw new Error("Cannot access query on a page with prerendering enabled");
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  if (module2.load) {
    const load_input = {
      page: page_proxy,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        const resolved = resolve(request.path, url.split("?")[0]);
        let response;
        const filename = resolved.replace(options2.paths.assets, "").slice(1);
        const filename_html = `${filename}/index.html`;
        const asset = options2.manifest.assets.find((d2) => d2.file === filename || d2.file === filename_html);
        if (asset) {
          response = options2.read ? new Response(options2.read(asset.file), {
            headers: asset.type ? { "content-type": asset.type } : {}
          }) : await fetch(`http://${page.host}/${asset.file}`, opts);
        } else if (resolved.startsWith("/") && !resolved.startsWith("//")) {
          const relative = resolved;
          const headers = {
            ...opts.headers
          };
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            headers.cookie = request.headers.cookie;
            if (!headers.authorization) {
              headers.authorization = request.headers.authorization;
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const search = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
          const rendered = await respond({
            host: request.host,
            method: opts.method || "GET",
            headers,
            path: relative,
            rawBody: opts.body == null ? null : new TextEncoder().encode(opts.body),
            query: new URLSearchParams(search)
          }, options2, {
            fetched: url,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
          }
          if (typeof request.host !== "undefined") {
            const { hostname: fetch_hostname } = new URL(url);
            const [server_hostname] = request.host.split(":");
            if (`.${fetch_hostname}`.endsWith(`.${server_hostname}`) && opts.credentials !== "omit") {
              uses_credentials = true;
              opts.headers = {
                ...opts.headers,
                cookie: request.headers.cookie
              };
            }
          }
          const external_request = new Request(url, opts);
          response = await options2.hooks.externalFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, _receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 === "set-cookie") {
                    set_cookie_headers = set_cookie_headers.concat(value);
                  } else if (key2 !== "etag") {
                    headers[key2] = value;
                  }
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":"${escape_json_string_in_html(body)}"}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      stuff: { ...stuff }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  if (!loaded) {
    throw new Error(`${node.entry} - load must return a value except for page fall through`);
  }
  return {
    node,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
var absolute = /^([a-z]+:)?\/?\//;
function resolve(base2, path) {
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error2 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    stuff: {},
    prerender_enabled: is_prerender_enabled(options2, default_error, state),
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      stuff: loaded ? loaded.stuff : {},
      prerender_enabled: is_prerender_enabled(options2, default_error, state),
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error2,
      branch,
      page
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
function is_prerender_enabled(options2, node, state) {
  return options2.prerender && (!!node.module.prerender || !!state.prerender && state.prerender.all);
}
async function respond$1(opts) {
  const { request, options: options2, state, $session, route } = opts;
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id ? options2.load_component(id) : void 0));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options2);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: ""
    };
  }
  let branch = [];
  let status = 200;
  let error2;
  let set_cookie_headers = [];
  ssr:
    if (page_config.ssr) {
      let stuff = {};
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              ...opts,
              node,
              stuff,
              prerender_enabled: is_prerender_enabled(options2, node, state),
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
            if (loaded.loaded.redirect) {
              return with_cookies({
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              }, set_cookie_headers);
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e = coalesce_to_error(err);
            options2.handle_error(e, request);
            status = 500;
            error2 = e;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node({
                    ...opts,
                    node: error_node,
                    stuff: node_loaded.stuff,
                    prerender_enabled: is_prerender_enabled(options2, error_node, state),
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options2);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (err) {
                  const e = coalesce_to_error(err);
                  options2.handle_error(e, request);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            }), set_cookie_headers);
          }
        }
        if (loaded && loaded.loaded.stuff) {
          stuff = {
            ...stuff,
            ...loaded.loaded.stuff
          };
        }
      }
    }
  try {
    return with_cookies(await render_response({
      ...opts,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    }), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return with_cookies(await respond_with_error({
      ...opts,
      status: 500,
      error: error3
    }), set_cookie_headers);
  }
}
function get_page_config(leaf, options2) {
  return {
    ssr: "ssr" in leaf ? !!leaf.ssr : options2.ssr,
    router: "router" in leaf ? !!leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options2.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    response.headers["set-cookie"] = set_cookie_headers;
  }
  return response;
}
async function render_page(request, route, match, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  const $session = await options2.hooks.getSession(request);
  const response = await respond$1({
    request,
    options: options2,
    state,
    $session,
    route,
    page
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        (map.get(key) || []).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  constructor(map) {
    __privateAdd(this, _map, void 0);
    __privateSet(this, _map, map);
  }
  get(key) {
    const value = __privateGet(this, _map).get(key);
    return value && value[0];
  }
  getAll(key) {
    return __privateGet(this, _map).get(key);
  }
  has(key) {
    return __privateGet(this, _map).has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key] of __privateGet(this, _map))
      yield key;
  }
  *values() {
    for (const [, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield value[i];
      }
    }
  }
};
_map = new WeakMap();
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const content_type = headers["content-type"];
  const [type, ...directives2] = content_type ? content_type.split(/;\s*/) : [];
  const text = () => new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
  switch (type) {
    case "text/plain":
      return text();
    case "application/json":
      return JSON.parse(text());
    case "application/x-www-form-urlencoded":
      return get_urlencoded(text());
    case "multipart/form-data": {
      const boundary = directives2.find((directive) => directive.startsWith("boundary="));
      if (!boundary)
        throw new Error("Missing boundary");
      return get_multipart(text(), boundary.slice("boundary=".length));
    }
    default:
      return raw;
  }
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      headers[name] = value;
      const directives2 = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives2[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives2.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives2.name) {
          key = directives2.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !(incoming.path.split("/").pop() || "").includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: options2.paths.base + path + (q ? `?${q}` : "")
        }
      };
    }
  }
  const headers = lowercase_keys(incoming.headers);
  const request = {
    ...incoming,
    headers,
    body: parse_body(incoming.rawBody, headers),
    params: {},
    locals: {}
  };
  try {
    return await options2.hooks.handle({
      request,
      resolve: async (request2) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request2),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            branch: []
          });
        }
        const decoded = decodeURI(request2.path);
        for (const route of options2.manifest.routes) {
          const match = route.pattern.exec(decoded);
          if (!match)
            continue;
          const response = route.type === "endpoint" ? await render_endpoint(request2, route, match) : await render_page(request2, route, match, options2, state);
          if (response) {
            if (response.status === 200) {
              const cache_control = get_single_valued_header(response.headers, "cache-control");
              if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
                const etag = `"${hash$1(response.body || "")}"`;
                if (request2.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: ""
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        const $session = await options2.hooks.getSession(request2);
        return await respond_with_error({
          request: request2,
          options: options2,
          state,
          $session,
          status: 404,
          error: new Error(`Not found: ${request2.path}`)
        });
      }
    });
  } catch (err) {
    const e = coalesce_to_error(err);
    options2.handle_error(e, request);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
Promise.resolve();
var escaped = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
var css$g = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        navigated = true;
        title = document.title || "untitled page";
      }
    });
    mounted = true;
    return unsubscribe;
  });
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$g);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${mounted ? `<div id="${"svelte-announcer"}" aria-live="${"assertive"}" aria-atomic="${"true"}" class="${"svelte-1j55zn5"}">${navigated ? `${escape(title)}` : ``}</div>` : ``}`;
});
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
function set_prerendering(value) {
}
var userList = () => [
  {
    username: "2017130",
    password: hash("whatever")
  },
  {
    username: "admin",
    password: hash("admin")
  },
  {
    username: "x",
    password: hash("xxx")
  }
];
var tokenList = () => [
  {
    tokenId: "&gcbdfb5^bd*&%bdkl;cgsvxebj!xje",
    ref: userList()[0]
  },
  {
    tokenId: "h83&h%Vv&sxeb,.sjxxhi{hsi_nkne=h",
    ref: userList()[1]
  },
  {
    tokenId: "@tgwv%gyg9&uguu^^5svv!vbsjb=+nln?",
    ref: userList()[2]
  }
];
var info = () => [
  {
    id: 0,
    tanggal: "02-03-2021",
    informasi: "KALENDER AKADEMIK TAHUN AJARAN 2021 SAMPAI 2022 SEMESTER GANJIL",
    link: {
      href: "/",
      text: "KALENDER AKADEMIK TAHUN AJARAN 2021 SAMPAI 2022 SEMESTER GANJIL"
    }
  },
  {
    id: 1,
    tanggal: "05-03-2021",
    informasi: "JADWAL UTS TAHUN 2021",
    link: {
      href: "/",
      text: "JADWAL UTS TAHUN 2021"
    }
  },
  {
    id: 2,
    tanggal: "03-03-2021",
    informasi: "SEMINAR TEKNOLOGI DAN PENERAPANNYA",
    link: {
      href: "/",
      text: "SEMINAR TEKNOLOGI DAN PENERAPANNYA"
    }
  },
  {
    id: 3,
    tanggal: "02-03-2021",
    informasi: "KALENDER AKADEMIK TAHUN AJARAN 2021 SAMPAI 2022 SEMESTER GANJIL",
    link: {
      href: "/",
      text: "KALENDER AKADEMIK TAHUN AJARAN 2021 SAMPAI 2022 SEMESTER GANJIL"
    }
  },
  {
    id: 4,
    tanggal: "05-03-2021",
    informasi: "JADWAL UTS TAHUN 2021",
    link: {
      href: "/",
      text: "JADWAL UTS TAHUN 2021"
    }
  },
  {
    id: 5,
    tanggal: "03-03-2021",
    informasi: "SEMINAR TEKNOLOGI DAN PENERAPANNYA",
    link: {
      href: "/",
      text: "SEMINAR TEKNOLOGI DAN PENERAPANNYA"
    }
  },
  {
    id: 6,
    tanggal: "02-03-2021",
    informasi: "KALENDER AKADEMIK TAHUN AJARAN 2021 SAMPAI 2022 SEMESTER GANJIL",
    link: {
      href: "/",
      text: "KALENDER AKADEMIK TAHUN AJARAN 2021 SAMPAI 2022 SEMESTER GANJIL"
    }
  },
  {
    id: 7,
    tanggal: "05-03-2021",
    informasi: "JADWAL UTS TAHUN 2021",
    link: {
      href: "/",
      text: "JADWAL UTS TAHUN 2021"
    }
  },
  {
    id: 8,
    tanggal: "03-03-2021",
    informasi: "SEMINAR TEKNOLOGI DAN PENERAPANNYA",
    link: {
      href: "/",
      text: "SEMINAR TEKNOLOGI DAN PENERAPANNYA"
    }
  },
  {
    id: 9,
    tanggal: "02-03-2021",
    informasi: "KALENDER AKADEMIK TAHUN AJARAN 2021 SAMPAI 2022 SEMESTER GANJIL",
    link: {
      href: "/",
      text: "KALENDER AKADEMIK TAHUN AJARAN 2021 SAMPAI 2022 SEMESTER GANJIL"
    }
  },
  {
    id: 10,
    tanggal: "05-03-2021",
    informasi: "JADWAL UTS TAHUN 2021",
    link: {
      href: "/",
      text: "JADWAL UTS TAHUN 2021"
    }
  },
  {
    id: 11,
    tanggal: "03-03-2021",
    informasi: "SEMINAR TEKNOLOGI DAN PENERAPANNYA",
    link: {
      href: "/",
      text: "SEMINAR TEKNOLOGI DAN PENERAPANNYA"
    }
  }
];
var nilai = () => [
  {
    id: 0,
    mata_kuliah: "Matematika diskrit",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 2
  },
  {
    id: 1,
    mata_kuliah: "Algoritma",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 1
  },
  {
    id: 2,
    mata_kuliah: "Komunikasi Data",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 3
  },
  {
    id: 3,
    mata_kuliah: "Kalkulus",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 1
  },
  {
    id: 4,
    mata_kuliah: "Metode Numerik",
    dosen: "Ibu Ibu",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 2
  },
  {
    id: 5,
    mata_kuliah: "Statistika",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 3
  },
  {
    id: 6,
    mata_kuliah: "Mikrokontroler",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 4
  },
  {
    id: 7,
    mata_kuliah: "Mikroprosesor",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 5
  },
  {
    id: 8,
    mata_kuliah: "Bahasa Inggris",
    dosen: "Ibu Ibu",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 6
  },
  {
    id: 9,
    mata_kuliah: "Kewarganegaraan",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 4
  },
  {
    id: 10,
    mata_kuliah: "Fisika Dasar",
    dosen: "Ibu Ibu",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 5
  },
  {
    id: 11,
    mata_kuliah: "Pemrograman Web",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 6
  },
  {
    id: 12,
    mata_kuliah: "Sistem Informasi Geografis",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 7
  },
  {
    id: 13,
    mata_kuliah: "Manajemen Proyek",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 8
  },
  {
    id: 14,
    mata_kuliah: "Aljabar Linear",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 7
  },
  {
    id: 15,
    mata_kuliah: "Etika Profesi",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 8
  },
  {
    id: 16,
    mata_kuliah: "Matematika diskrit",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 2
  },
  {
    id: 17,
    mata_kuliah: "Algoritma",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 1
  },
  {
    id: 18,
    mata_kuliah: "Komunikasi Data",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 3
  },
  {
    id: 19,
    mata_kuliah: "Kalkulus",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 1
  },
  {
    id: 20,
    mata_kuliah: "Metode Numerik",
    dosen: "Ibu Ibu",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 2
  },
  {
    id: 21,
    mata_kuliah: "Statistika",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 3
  },
  {
    id: 22,
    mata_kuliah: "Mikrokontroler",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 4
  },
  {
    id: 23,
    mata_kuliah: "Mikroprosesor",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 5
  },
  {
    id: 24,
    mata_kuliah: "Bahasa Inggris",
    dosen: "Ibu Ibu",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 6
  },
  {
    id: 25,
    mata_kuliah: "Kewarganegaraan",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 4
  },
  {
    id: 26,
    mata_kuliah: "Fisika Dasar",
    dosen: "Ibu Ibu",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 5
  },
  {
    id: 27,
    mata_kuliah: "Pemrograman Web",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 6
  },
  {
    id: 28,
    mata_kuliah: "Sistem Informasi Geografis",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 7
  },
  {
    id: 29,
    mata_kuliah: "Manajemen Proyek",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 8
  },
  {
    id: 30,
    mata_kuliah: "Aljabar Linear",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 7
  },
  {
    id: 31,
    mata_kuliah: "Etika Profesi",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 8
  },
  {
    id: 32,
    mata_kuliah: "Matematika diskrit",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 2
  },
  {
    id: 33,
    mata_kuliah: "Algoritma",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 1
  },
  {
    id: 34,
    mata_kuliah: "Komunikasi Data",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 3
  },
  {
    id: 35,
    mata_kuliah: "Kalkulus",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 1
  },
  {
    id: 36,
    mata_kuliah: "Metode Numerik",
    dosen: "Ibu Ibu",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 2
  },
  {
    id: 37,
    mata_kuliah: "Statistika",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 3
  },
  {
    id: 38,
    mata_kuliah: "Mikrokontroler",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 4
  },
  {
    id: 39,
    mata_kuliah: "Mikroprosesor",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 5
  },
  {
    id: 40,
    mata_kuliah: "Bahasa Inggris",
    dosen: "Ibu Ibu",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 6
  },
  {
    id: 41,
    mata_kuliah: "Kewarganegaraan",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 4
  },
  {
    id: 42,
    mata_kuliah: "Fisika Dasar",
    dosen: "Ibu Ibu",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 5
  },
  {
    id: 43,
    mata_kuliah: "Pemrograman Web",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 6
  },
  {
    id: 44,
    mata_kuliah: "Sistem Informasi Geografis",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 7
  },
  {
    id: 45,
    mata_kuliah: "Manajemen Proyek",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 8
  },
  {
    id: 46,
    mata_kuliah: "Aljabar Linear",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 7
  },
  {
    id: 47,
    mata_kuliah: "Etika Profesi",
    dosen: "Bapak Bapak",
    kehadiran: 67,
    tugas: 70,
    uts: 89,
    uas: 90,
    nilai_akhir: 88,
    grade: "A",
    semester: 8
  }
];
var lowongan = () => [
  {
    id: 0,
    perusahaan: "Holcim Tbk.",
    informasi: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, voluptas aspernatur ratione consequuntur incidunt quisquam ex corporis soluta sapiente necessitatibus. Aspernatur odio quam tenetur id dolores quidem amet, reprehenderit distinctio!",
    expired: "2021-09-12",
    posisi: "Driver",
    alamat: "Bogor"
  },
  {
    id: 1,
    perusahaan: "Indocement Tbk.",
    informasi: "sit amet consectetur adipisicing elit. Eligendi, voluptas aspernatur ratione consequuntur incidunt quisquam ex corporis soluta sapiente necessitatibus. Aspernatur odio quam tenetur id dolores quidem amet, reprehenderit distinctio!",
    expired: "2022-09-12",
    posisi: "Safety Control",
    alamat: "Bogor"
  },
  {
    id: 2,
    perusahaan: "Telkom Tbk.",
    informasi: "dolor sit amet consectetur adipisicing elit. Eligendi, voluptas aspernatur ratione consequuntur incidunt quisquam ex corporis soluta sapiente necessitatibus. Aspernatur odio quam tenetur id dolores quidem amet, reprehenderit distinctio!",
    expired: "2021-12-12",
    posisi: "Mechanic",
    alamat: "Bogor"
  },
  {
    id: 3,
    perusahaan: "Federal Tbk.",
    informasi: "Ipsum dolor sit amet consectetur adipisicing elit. Eligendi, voluptas aspernatur ratione consequuntur incidunt quisquam ex corporis soluta sapiente necessitatibus. Aspernatur odio quam tenetur id dolores quidem amet, reprehenderit distinctio!",
    expired: "2022-08-12",
    posisi: "Maintenance",
    alamat: "Bogor"
  }
];
async function getJSON(url) {
  return await (await fetch(url)).json();
}
async function loginRequired({ session: session2 }) {
  if (!session2.user) {
    return {
      status: 302,
      redirect: base + "/login"
    };
  }
  return {};
}
function getUserFromToken(token) {
  if (!token)
    return null;
  let user;
  try {
    user = tokenList().filter((i) => i.tokenId == clean(token))[0].ref.username;
  } catch (error2) {
    user = null;
  }
  return user;
}
async function redirectIfLoggedIn({ session: session2 }) {
  if (session2.user) {
    return {
      status: 302,
      redirect: base + "/home"
    };
  }
  return {};
}
function readCookie(cookie, key) {
  const r = new RegExp(`(?<=^${key}=)(.*)`);
  const match = cookie.split(" ").filter((k) => k.startsWith(key))[0];
  if (!match)
    return null;
  const result = match.match(r);
  if (!result)
    return null;
  let parsed;
  try {
    parsed = JSON.parse(result[0]);
  } catch (error2) {
    parsed = result[0];
  }
  return parsed;
}
function hash(str) {
  const unit = new Uint16Array(str.length);
  for (let i = 0; i < unit.length; i++) {
    unit[i] = str.charCodeAt(i);
  }
  const enc = String.fromCharCode(...new Uint8Array(unit.buffer));
  return Buffer.from(enc).toString("base64");
}
function clean(bin) {
  let binary;
  binary = Buffer.from(bin, "base64").toString();
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint16Array(bytes.buffer));
}
function getSession({ headers }) {
  const cookie = headers.cookie || "";
  let token = readCookie(cookie, "userToken");
  let user = getUserFromToken(token);
  return {
    user
  };
}
var dev = `localhost:3000`;
var deploy = "https://ak-clone.vercel.app";
var directives = {
  "img-src": [
    "*",
    "'self'",
    "data:"
  ],
  "font-src": [
    "*",
    "'self'",
    "data:"
  ],
  "style-src": [
    "'self'",
    "'unsafe-inline'"
  ],
  "default-src": [
    "'self'",
    dev,
    deploy,
    "https://*.google.com",
    "https://*.googleapis.com",
    "https://*.firebase.com",
    "https://*.gstatic.com",
    "https://*.cloudfunctions.net",
    "https://*.algolia.net",
    "https://*.facebook.com",
    "https://*.facebook.net",
    "https://*.stripe.com",
    "https://*.sentry.io"
  ],
  "script-src": [
    "'self'",
    "'unsafe-eval'",
    "'unsafe-inline'",
    dev,
    deploy,
    "https://*.stripe.com",
    "https://*.facebook.com",
    "https://*.facebook.net",
    "https://*.sentry.io",
    "https://polyfill.io"
  ],
  "frame-src": [
    "https://*.stripe.com",
    "https://*.facebook.com",
    "https://*.facebook.net"
  ]
};
var CSP = Object.entries(directives).map(([key, arr]) => key + " " + arr.join(" ")).join("; ");
async function handle({ request, resolve: resolve2 }) {
  const response = await resolve2(request);
  return {
    ...response,
    headers: {
      ...response.headers,
      "X-Frame-Options": "SAMEORIGIN",
      "X-Content-Type-Options": `nosniff`,
      "Content-Security-Policy": CSP,
      "X-XSS-Protection": 1
    }
  };
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  getSession,
  handle
});
var template = ({ head, body }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		<meta name="theme-color" content="#6666dd"/>\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
var options = null;
var default_settings = { paths: { "base": "", "assets": "" } };
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  const hooks = get_hooks(user_hooks);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: assets + "/app/start-71b40b56.js",
      css: [assets + "/app/assets/start-61d1577b.css"],
      js: [assets + "/app/start-71b40b56.js", assets + "/app/chunks/vendor-3e1a4086.js", assets + "/app/chunks/paths-28a87002.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => assets + "/app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2, request) => {
      hooks.handleError({ error: error2, request });
      error2.stack = options.get_stack(error2);
    },
    hooks,
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    prerender: true,
    read: settings.read,
    root: Root,
    service_worker: "/service-worker.js",
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var d = (s2) => s2.replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
var empty = () => ({});
var manifest = {
  assets: [{ "file": "android-chrome-144x144.png", "size": 38962, "type": "image/png" }, { "file": "apple-touch-icon.png", "size": 28683, "type": "image/png" }, { "file": "bg1.jpg", "size": 11949, "type": "image/jpeg" }, { "file": "bg2.jpg", "size": 16600, "type": "image/jpeg" }, { "file": "bitter/cyrillic-ext.woff2", "size": 11412, "type": "font/woff2" }, { "file": "bitter/cyrillic.woff2", "size": 10072, "type": "font/woff2" }, { "file": "bitter/latin-ext.woff2", "size": 14424, "type": "font/woff2" }, { "file": "bitter/latin.woff2", "size": 15700, "type": "font/woff2" }, { "file": "bitter/vietnam.woff2", "size": 4128, "type": "font/woff2" }, { "file": "browserconfig.xml", "size": 246, "type": "application/xml" }, { "file": "favicon-16x16.png", "size": 1399, "type": "image/png" }, { "file": "favicon-32x32.png", "size": 3264, "type": "image/png" }, { "file": "favicon.ico", "size": 15086, "type": "image/vnd.microsoft.icon" }, { "file": "font.css", "size": 347, "type": "text/css" }, { "file": "font.min.css", "size": 279, "type": "text/css" }, { "file": "global.css", "size": 6107, "type": "text/css" }, { "file": "global.min.css", "size": 4483, "type": "text/css" }, { "file": "ipad.webp", "size": 6546, "type": "image/webp" }, { "file": "iphone.webp", "size": 4792, "type": "image/webp" }, { "file": "logo.webp", "size": 10466, "type": "image/webp" }, { "file": "mac.webp", "size": 29100, "type": "image/webp" }, { "file": "macbook.webp", "size": 19254, "type": "image/webp" }, { "file": "manifest.json", "size": 437, "type": "application/json" }, { "file": "mstile-150x150.png", "size": 31844, "type": "image/png" }, { "file": "ps.webp", "size": 15680, "type": "image/webp" }, { "file": "robots.txt", "size": 94, "type": "text/plain" }, { "file": "safari-pinned-tab.svg", "size": 21260, "type": "image/svg+xml" }, { "file": "sitemap.xml", "size": 667, "type": "application/xml" }, { "file": "sttm.webp", "size": 55906, "type": "image/webp" }],
  layout: ".svelte-kit/build/components/layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/changepassword\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/changepassword/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/logout\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return index$b;
      })
    },
    {
      type: "page",
      pattern: /^\/input\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/input/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/login\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/login/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/loker\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/loker/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/nilai\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/nilai/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/auth\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return index$a;
      })
    },
    {
      type: "page",
      pattern: /^\/home\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/home/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/spin\/?$/,
      params: empty,
      a: [".svelte-kit/build/components/layout.svelte", "src/routes/spin/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/api\/lowongan\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return index$9;
      })
    },
    {
      type: "endpoint",
      pattern: /^\/api\/nilai\/([^/]+?)\/?$/,
      params: (m) => ({ semester: d(m[1]) }),
      load: () => Promise.resolve().then(function() {
        return _semester_;
      })
    },
    {
      type: "endpoint",
      pattern: /^\/api\/info\/?$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return index$8;
      })
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
  handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
  externalFetch: hooks.externalFetch || fetch
});
var module_lookup = {
  ".svelte-kit/build/components/layout.svelte": () => Promise.resolve().then(function() {
    return layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error$1;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index$7;
  }),
  "src/routes/changepassword/index.svelte": () => Promise.resolve().then(function() {
    return index$6;
  }),
  "src/routes/input/index.svelte": () => Promise.resolve().then(function() {
    return index$5;
  }),
  "src/routes/login/index.svelte": () => Promise.resolve().then(function() {
    return index$4;
  }),
  "src/routes/loker/index.svelte": () => Promise.resolve().then(function() {
    return index$3;
  }),
  "src/routes/nilai/index.svelte": () => Promise.resolve().then(function() {
    return index$2;
  }),
  "src/routes/home/index.svelte": () => Promise.resolve().then(function() {
    return index$1;
  }),
  "src/routes/spin/index.svelte": () => Promise.resolve().then(function() {
    return index;
  })
};
var metadata_lookup = { ".svelte-kit/build/components/layout.svelte": { "entry": "layout.svelte-c3619dea.js", "css": [], "js": ["layout.svelte-c3619dea.js", "chunks/vendor-3e1a4086.js"], "styles": [] }, ".svelte-kit/build/components/error.svelte": { "entry": "error.svelte-88216201.js", "css": [], "js": ["error.svelte-88216201.js", "chunks/vendor-3e1a4086.js"], "styles": [] }, "src/routes/index.svelte": { "entry": "pages/index.svelte-008ecfdb.js", "css": ["assets/pages/index.svelte-d5a3d6df.css"], "js": ["pages/index.svelte-008ecfdb.js", "chunks/vendor-3e1a4086.js", "chunks/helper-fdf82727.js", "chunks/paths-28a87002.js", "chunks/PageHead-780f6808.js"], "styles": [] }, "src/routes/changepassword/index.svelte": { "entry": "pages/changepassword/index.svelte-794a0836.js", "css": ["assets/pages/changepassword/index.svelte-0cbfab54.css", "assets/FormControl-799f52a1.css", "assets/Page-5e4eb7fb.css", "assets/stores-2ede06c6.css"], "js": ["pages/changepassword/index.svelte-794a0836.js", "chunks/vendor-3e1a4086.js", "chunks/helper-fdf82727.js", "chunks/paths-28a87002.js", "chunks/FormControl-20200729.js", "chunks/Page-ddd8e493.js", "chunks/PageHead-780f6808.js", "chunks/stores-f41050e5.js"], "styles": [] }, "src/routes/input/index.svelte": { "entry": "pages/input/index.svelte-d6435822.js", "css": ["assets/pages/input/index.svelte-95cbe373.css"], "js": ["pages/input/index.svelte-d6435822.js", "chunks/vendor-3e1a4086.js", "chunks/PageHead-780f6808.js", "chunks/paths-28a87002.js"], "styles": [] }, "src/routes/login/index.svelte": { "entry": "pages/login/index.svelte-844dfee4.js", "css": ["assets/pages/login/index.svelte-dd2d7523.css"], "js": ["pages/login/index.svelte-844dfee4.js", "chunks/vendor-3e1a4086.js", "chunks/helper-fdf82727.js", "chunks/paths-28a87002.js", "chunks/PageHead-780f6808.js"], "styles": [] }, "src/routes/loker/index.svelte": { "entry": "pages/loker/index.svelte-85f9242a.js", "css": ["assets/pages/loker/index.svelte-69f40f79.css", "assets/FormControl-799f52a1.css", "assets/SortableTable-51f0657a.css", "assets/Page-5e4eb7fb.css", "assets/Spinner-2c252a10.css"], "js": ["pages/loker/index.svelte-85f9242a.js", "chunks/vendor-3e1a4086.js", "chunks/helper-fdf82727.js", "chunks/paths-28a87002.js", "chunks/FormControl-20200729.js", "chunks/SortableTable-50d77c3c.js", "chunks/Page-ddd8e493.js", "chunks/PageHead-780f6808.js", "chunks/Spinner-52f46c79.js"], "styles": [] }, "src/routes/nilai/index.svelte": { "entry": "pages/nilai/index.svelte-b934d173.js", "css": ["assets/pages/nilai/index.svelte-dfc61709.css", "assets/SortableTable-51f0657a.css", "assets/Page-5e4eb7fb.css", "assets/Spinner-2c252a10.css"], "js": ["pages/nilai/index.svelte-b934d173.js", "chunks/vendor-3e1a4086.js", "chunks/helper-fdf82727.js", "chunks/paths-28a87002.js", "chunks/SortableTable-50d77c3c.js", "chunks/Page-ddd8e493.js", "chunks/PageHead-780f6808.js", "chunks/Spinner-52f46c79.js"], "styles": [] }, "src/routes/home/index.svelte": { "entry": "pages/home/index.svelte-575f6c3c.js", "css": ["assets/pages/home/index.svelte-8cbf3e75.css", "assets/SortableTable-51f0657a.css", "assets/stores-2ede06c6.css", "assets/Page-5e4eb7fb.css", "assets/Spinner-2c252a10.css"], "js": ["pages/home/index.svelte-575f6c3c.js", "chunks/vendor-3e1a4086.js", "chunks/helper-fdf82727.js", "chunks/paths-28a87002.js", "chunks/SortableTable-50d77c3c.js", "chunks/stores-f41050e5.js", "chunks/Page-ddd8e493.js", "chunks/PageHead-780f6808.js", "chunks/Spinner-52f46c79.js"], "styles": [] }, "src/routes/spin/index.svelte": { "entry": "pages/spin/index.svelte-bde2e1c9.js", "css": ["assets/Spinner-2c252a10.css"], "js": ["pages/spin/index.svelte-bde2e1c9.js", "chunks/vendor-3e1a4086.js", "chunks/Spinner-52f46c79.js"], "styles": [] } };
async function load_component(file) {
  const { entry, css: css2, js, styles } = metadata_lookup[file];
  return {
    module: await module_lookup[file](),
    entry: assets + "/app/" + entry,
    css: css2.map((dep) => assets + "/app/" + dep),
    js: js.map((dep) => assets + "/app/" + dep),
    styles
  };
}
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender });
}
async function get$3() {
  return {
    headers: {
      "set-cookie": [`userToken=${null};`],
      Location: base + "/login"
    },
    status: 302
  };
}
var index$b = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get: get$3
});
async function post({ body }) {
  const username = body.username;
  const password = body.password;
  const u = userList().filter((i) => i.username == clean(username))[0];
  const authenticated = u && u.password == password;
  if (!authenticated) {
    return {
      body: {
        error: "incorrect username or password"
      },
      headers: {
        "set-cookie": `userToken=${null};`
      },
      status: 200
    };
  }
  let token = tokenList().filter((i) => i.ref.username == clean(username))[0].tokenId;
  return {
    body: {
      error: "",
      authenticated
    },
    headers: {
      "set-cookie": `userToken=${hash(token)};Secure;HttpOnly;Max-Age=${60 * 60 * 24 * 7};SameSite=Lax;`
    },
    status: 200
  };
}
var index$a = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  post
});
async function get$2({ headers }) {
  const result = lowongan();
  const user = getUserFromToken(readCookie(headers.cookie || "", "userToken"));
  if (user) {
    return {
      body: {
        message: "",
        result
      }
    };
  }
  return {
    body: {
      message: "Are you logged in?",
      result: []
    }
  };
}
var index$9 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get: get$2
});
async function get$1({ params, headers }) {
  const { semester } = params;
  const result = semester == "all" ? nilai() : nilai().filter((i) => i.semester == semester);
  const user = getUserFromToken(readCookie(headers.cookie, "userToken"));
  if (result.length && user) {
    return {
      body: {
        message: "",
        result
      }
    };
  }
  return {
    body: {
      message: " Are you logged in?",
      result: []
    }
  };
}
var _semester_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get: get$1
});
async function get({ headers }) {
  const result = info();
  const user = getUserFromToken(readCookie(headers.cookie || "", "userToken"));
  if (user) {
    return {
      body: {
        message: "",
        result
      }
    };
  }
  return {
    body: {
      message: "Are you logged in?",
      result: []
    }
  };
}
var index$8 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get
});
var Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${slots.default ? slots.default({}) : ``}`;
});
var layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Layout
});
function load$6({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error: error2 } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
    $$bindings.error(error2);
  return `<h1>${escape(status)}</h1>

<pre>${escape(error2.message)}</pre>



${error2.frame ? `<pre>${escape(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape(error2.stack)}</pre>` : ``}`;
});
var error$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error$1,
  load: load$6
});
var PageHead = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { description } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  return `${$$result.head += `${$$result.title = `<title>${escape(title)}</title>`, ""}<meta name="${"description"}"${add_attribute("content", description, 0)} data-svelte="svelte-kkqhjv"><link rel="${"stylesheet"}" href="${escape(base) + "/font.min.css"}" data-svelte="svelte-kkqhjv"><link rel="${"stylesheet"}" href="${escape(base) + "/global.min.css"}" data-svelte="svelte-kkqhjv"><link rel="${"manifest"}" href="${escape(base) + "/manifest.json"}" data-svelte="svelte-kkqhjv"><link rel="${"apple-touch-icon"}" sizes="${"152x152"}" href="${escape(base) + "/apple-touch-icon.png"}" data-svelte="svelte-kkqhjv"><link rel="${"icon"}" type="${"image/png"}" sizes="${"32x32"}" href="${escape(base) + "/favicon-32x32.png"}" data-svelte="svelte-kkqhjv"><link rel="${"icon"}" type="${"image/png"}" sizes="${"16x16"}" href="${escape(base) + "/favicon-16x16.png"}" data-svelte="svelte-kkqhjv"><link rel="${"mask-icon"}" href="${escape(base) + "/safari-pinned-tab.svg"}" color="${"#5bbad5"}" data-svelte="svelte-kkqhjv"><meta name="${"msapplication-TileColor"}" content="${"#00aba9"}" data-svelte="svelte-kkqhjv">${slots.default ? slots.default({}) : ``}`, ""}`;
});
var css$f = {
  code: ":root{--headerheight:70vh;--headerwidth:100vw}svg.svelte-b6d53x.svelte-b6d53x{vertical-align:bottom}.svelte-b6d53x.svelte-b6d53x{user-select:none}.dots.svelte-b6d53x.svelte-b6d53x{position:absolute;bottom:5%;left:0;right:0;display:flex;align-items:center;justify-content:center;text-align:center;gap:1rem\n}.dots.svelte-b6d53x strong.svelte-b6d53x{opacity:.3;will-change:opacity, transform;color:var(--brand)\n}.dots.svelte-b6d53x .current.svelte-b6d53x{transform:scale(1.2);opacity:.75}.dots.svelte-b6d53x strong.svelte-b6d53x:hover{opacity:.75}.nextbtn.svelte-b6d53x.svelte-b6d53x,.prevbtn.svelte-b6d53x.svelte-b6d53x{position:absolute;top:50%;transform:translateY(-50%);font-size:3rem;aspect-ratio:1/1;cursor:pointer;opacity:.3;will-change:transform,opacity;color:var(--brand);transition:transform 300ms ease, opacity 200ms ease}.nextbtn.svelte-b6d53x.svelte-b6d53x:hover,.prevbtn.svelte-b6d53x.svelte-b6d53x:hover{opacity:.75}.prevbtn.svelte-b6d53x.svelte-b6d53x{left:5%}.nextbtn.svelte-b6d53x.svelte-b6d53x{right:5%}.item3.svelte-b6d53x.svelte-b6d53x{background:var(--brand);color:var(--surface1);width:max-content;padding:4px 8px;font-size:12px;margin:.25rem 0}.item4.svelte-b6d53x.svelte-b6d53x{padding-top:1rem}main.svelte-b6d53x.svelte-b6d53x{display:flex;align-items:center;justify-content:center;padding:2em}.login-box.svelte-b6d53x.svelte-b6d53x{display:flex;flex-direction:column;border-radius:8px;overflow:hidden;border:var(--border);width:100%;box-shadow:0 0 1px 1px rgba(0,0,0,.1) }.login-box.svelte-b6d53x>.description.svelte-b6d53x{display:flex;align-items:center;gap:2rem;justify-content:space-between;padding:1rem;background:var(--brand);color:var(--surface1)}header.svelte-b6d53x.svelte-b6d53x{overflow:hidden;height:70vh;position:relative}header.svelte-b6d53x.svelte-b6d53x::before,header.svelte-b6d53x.svelte-b6d53x::after{content:'';position:absolute;width:100%;height:100%;top:0;left:0;background-size:cover;background:url(/bg1.jpg);opacity:0;will-change:opacity;transition:opacity 500ms linear}header.svelte-b6d53x.svelte-b6d53x::after{z-index:-1;background:url(/bg2.jpg)}header.bg1.svelte-b6d53x.svelte-b6d53x::before,header.bg2.svelte-b6d53x.svelte-b6d53x::after{opacity:1}@media(prefers-color-scheme:dark){header.svelte-b6d53x.svelte-b6d53x::before,header.svelte-b6d53x.svelte-b6d53x::after{filter:invert(.9)}}.mac.svelte-b6d53x.svelte-b6d53x{position:absolute;max-width:50%;left:25%;height:auto;bottom:15%}.ipad.svelte-b6d53x.svelte-b6d53x{position:absolute;max-width:30%;left:1%;bottom:15%;height:auto}.iphone.svelte-b6d53x.svelte-b6d53x{position:absolute;max-width:12%;left:32%;bottom:10%;height:auto}.macbook.svelte-b6d53x.svelte-b6d53x{position:absolute;max-width:50%;right:1%;bottom:15%;height:auto}.text.svelte-b6d53x.svelte-b6d53x{position:absolute;left:0;top:0;padding:5% 3%;display:flex;flex-direction:column;width:100%;height:50%}.image.svelte-b6d53x.svelte-b6d53x{height:50%;width:100%;display:grid;place-items:center;position:absolute;left:0;top:50%}.logo.svelte-b6d53x.svelte-b6d53x{height:60%;width:auto}.ps.svelte-b6d53x.svelte-b6d53x{width:25%;height:auto}*[style*=--state].svelte-b6d53x.svelte-b6d53x{will-change:transform,opacity}@media(orientation: landscape) and (min-width:800px){:root{--headerheight:60vh;--headerwidth:50vw}header.svelte-b6d53x.svelte-b6d53x{height:60vh;grid-template-rows:1fr;grid-template-columns:1fr 1fr}main.svelte-b6d53x.svelte-b6d53x{justify-content:flex-end;height:max-content;padding:1em}.login-box.svelte-b6d53x.svelte-b6d53x{width:max-content}.text.svelte-b6d53x.svelte-b6d53x{height:100%;width:50%}.image.svelte-b6d53x.svelte-b6d53x{height:100%;left:50%;top:0;width:50%}.logo.svelte-b6d53x.svelte-b6d53x{height:auto;width:30%}.ps.svelte-b6d53x.svelte-b6d53x{width:30%;height:auto}}.text.svelte-b6d53x>h1.svelte-b6d53x{font-size:18px}h1.svelte-b6d53x>span.svelte-b6d53x{font-size:12px}.hide.svelte-b6d53x.svelte-b6d53x{transform:scaleY(0)}.top-in.svelte-b6d53x.svelte-b6d53x{animation:svelte-b6d53x-top 600ms ease backwards;animation-delay:var(--in);animation-play-state:var(--state)}.top-out.svelte-b6d53x.svelte-b6d53x{animation:svelte-b6d53x-top 600ms ease forwards;animation-direction:reverse;animation-delay:var(--out);animation-play-state:var(--state)}.bottom-in.svelte-b6d53x.svelte-b6d53x{animation:svelte-b6d53x-bottom 600ms ease backwards;animation-delay:var(--in);animation-play-state:var(--state)}.bottom-out.svelte-b6d53x.svelte-b6d53x{animation:svelte-b6d53x-bottom 600ms ease forwards;animation-direction:reverse;animation-delay:var(--out);animation-play-state:var(--state)}.left-in.svelte-b6d53x.svelte-b6d53x{animation:svelte-b6d53x-left 600ms ease backwards;animation-delay:var(--in);animation-play-state:var(--state)}.left-out.svelte-b6d53x.svelte-b6d53x{animation:svelte-b6d53x-left 600ms ease forwards;animation-direction:reverse;animation-delay:var(--out);animation-play-state:var(--state)}.right-in.svelte-b6d53x.svelte-b6d53x{animation:svelte-b6d53x-right 600ms ease backwards;animation-delay:var(--in);animation-play-state:var(--state)}.right-bounce-in.svelte-b6d53x.svelte-b6d53x{animation:svelte-b6d53x-right-no-opacity 1000ms cubic-bezier(0, 1.5, 0.75, 1) backwards;animation-delay:var(--in);animation-play-state:var(--state);opacity:1}.right-out.svelte-b6d53x.svelte-b6d53x{animation:svelte-b6d53x-right 1s ease forwards;animation-direction:reverse;animation-delay:var(--out);animation-play-state:var(--state)}@keyframes svelte-b6d53x-top{0%{transform:translateY(calc(-1 * var(--headerheight)));opacity:0}50%{opacity:.2}90%{opacity:1}}@keyframes svelte-b6d53x-bottom{0%{transform:translateY(calc(1 * var(--headerheight)));opacity:0}50%{opacity:.2}90%{opacity:1}}@keyframes svelte-b6d53x-left{0%{transform:translateX(calc(-1 * var(--headerwidth)));opacity:0}50%{opacity:.2}90%{opacity:1}}@keyframes svelte-b6d53x-right{0%{transform:translateX(calc(1 * var(--headerwidth)));opacity:0}50%{opacity:.2}90%{opacity:1}}@keyframes svelte-b6d53x-right-no-opacity{0%{transform:translateX(calc(1 * var(--headerwidth)));opacity:0}90%{opacity:1}}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script context=module>\\n    import { redirectIfLoggedIn } from '$lib/scripts/helper';\\n    export const load = redirectIfLoggedIn\\n<\/script>\\n\\n<script>\\nimport { base } from '$app/paths';\\nimport PageHead from '$lib/PageHead.svelte';\\nimport { onMount } from 'svelte';\\n\\nlet slide = 0\\nlet intro = true\\nlet read = false\\n\\n\\n$: getstate = n => slide==n && !read? 'running':'paused'\\n\\n$: switchstate = ()=> intro=false\\n\\n$: switchslide = (e)=>{\\n    let x = e.target.hasAttribute('title')\\n    if(x && !intro){\\n        intro=true\\n        if(slide==3){\\n            slide=1\\n        }\\n        else{\\n            slide=slide+1\\n        }\\n    }\\n}\\n\\n\\nfunction next() {\\n    intro=true\\n    if(slide==3){\\n        slide=1\\n    }\\n    else{\\n        slide=slide+1\\n    }\\n}\\n\\nfunction prev() {\\n    intro=true\\n    if(slide==1){\\n        slide=3\\n    }\\n    else{\\n        slide=slide-1\\n    }\\n}\\n\\nfunction goToSlide(n) {\\n    intro = true\\n    slide = n\\n}\\n\\nonMount(()=>{\\n    slide=1\\n    document.addEventListener('visibilitychange', _=>{\\n        read = document.hidden ? true : false\\n    })\\n})\\n\\n<\/script>\\n\\n\\n<PageHead title='Web Akademik' description='Landing Page'>\\n</PageHead>\\n\\n<header on:pointerdown={()=>read=!read} class:bg2={slide==3} class:bg1={slide!=3}>\\n\\n    <div class=\\"text\\" class:top-out={slide==1&&!intro} style=\\"--out:2000ms; --state:{getstate(1)}\\" class:hide={slide!=1} title=\\"last\\" on:animationend={switchslide}>\\n        <h1 style=\\"font-size: 24px; --in:300ms; --state:{getstate(1)}\\" class:top-in={slide==1}>Selamat Datang <span>di website</span></h1>\\n        <h1 style=\\"font-size: 20px; --in:400ms; --state:{getstate(1)}\\" class:top-in={slide==1}>AKADEMIK STTM CILEUNGSI</h1>\\n        <b class=\\"item3\\" style=\\"--in:500ms; --state:{getstate(1)}\\" class:top-in={slide==1}>Excellent - Moral - Professional</b>\\n        <span class=\\"item4\\" style=\\"--in:600ms; --state:{getstate(1)}\\" class:left-in={slide==1}>Smart - Clean - Responsive - Elegant</span>\\n        <div style=\\"margin-top: 1em; --in:700ms; --state:{getstate(1)}\\" class:right-in={slide==1} on:animationend={switchstate}>\\n            <span>Sekolah Tinggi Teknologi Muhammadiyah Cileungsi</span>\\n            <br>\\n            <span>Jln Anggrek Cileungsi</span>\\n            <br>\\n            <span>Telp. 0099949449</span>\\n        </div>\\n    </div>      \\n    <div class=\\"image\\" class:hide={slide!=1}>\\n        <img src='{base}/logo.webp' alt=\\"logo\\" class=\\"logo\\" width=168 height=168 style=\\"--in:400ms; --out:2000ms; --state:{getstate(1)}\\" class:right-in={slide==1 && intro} class:bottom-out={slide==1&&!intro}>\\n    </div> \\n   \\n   \\n   \\n   \\n    <div class=\\"text\\" class:hide={slide!=2}>\\n        <h1 style=\\"font-size: 24px; --in:300ms; --out:2100ms; --state:{getstate(2)}\\" class:left-in={slide==2 && intro} title=\\"last\\" on:animationend={switchslide} class:top-out={slide==2 && !intro}>GUIDANCE</h1>\\n        <div style=\\"margin-top: 1em; font-size: 20px; --in:500ms; --out:2050ms; --state:{getstate(2)}\\" class:top-in={slide==2 && intro} class:left-out={slide==2&&!intro} on:animationend={switchstate}>\\n            <span>e-Arsip</span>\\n            <br>\\n            <span>e-Learning</span>\\n            <br>\\n            <span>e-Perpus</span>\\n            <br>\\n            <span>e-Alumni</span>\\n            <br>\\n            <span>Accesibility, Central, Responsive, User friendly</span>\\n        </div>\\n    </div>\\n    <div class=\\"image\\" class:hide={slide!=2}>\\n        <img src=\\"{base}/ps.webp\\" alt=\\"img\\" style=\\"--in:400ms; --out:1950ms; --state:{getstate(2)}\\" class=ps class:bottom-in={slide==2&&intro} class:right-out={slide==2&!intro} height=300 width=300>\\n    </div>\\n    \\n\\n    <div class=\\"text\\" title=\\"last\\" class:hide={slide!=3} style=\\"--in:300ms; --out:2100ms; --state:{getstate(3)}\\" class:top-out={slide==3 && !intro} on:animationend={switchslide}>\\n        <h1 style=\\"font-size: 24px; --in:500ms; --state:{getstate(3)}\\" class:top-in={slide==3}>Mudah Diakses</h1>\\n        <b class=\\"item3\\" style=\\"--in:400ms; --state:{getstate(3)}\\" class:right-in={slide==3}>Responsive & Theme-Colored</b>\\n        <span style=\\"font-size: 20px; margin-top: 2rem; --in:500ms; --state:{getstate(3)}\\" class:left-in={slide==3}>Sistem Akademik STTM Cileungsi dapat diakses menggunakan PC, Laptop</span>\\n    </div>\\n    <div class=\\"image\\" class:hide={slide!=3}>\\n        <img src='{base}/mac.webp' alt=\\"mac\\" class=\\"mac\\" style=\\"--in:400ms; --out:2000ms; --state:{getstate(3)}\\" class:right-bounce-in={slide==3&&intro} class:bottom-out={slide==3&&!intro}>\\n        <img src='{base}/ipad.webp' alt=\\"ipad\\" class=\\"ipad\\" style=\\"--in:600ms; --out:2000ms; --state:{getstate(3)}\\" class:right-bounce-in={slide==3&&intro} class:left-out={slide==3&&!intro}>\\n        <img src='{base}/iphone.webp' alt=\\"iphone\\" class=\\"iphone\\" style=\\"--in:800ms; --out:2000ms; --state:{getstate(3)}\\" class:right-bounce-in={slide==3&&intro} class:left-out={slide==3&&!intro}>\\n        <img src='{base}/macbook.webp' alt=\\"macbook\\" class=\\"macbook\\" style=\\"--in:1000ms; --out:1900ms; --state:{getstate(3)}\\" class:right-bounce-in={slide==3&&intro} class:right-out={slide==3&&!intro} on:animationend={switchstate}>\\n    </div>\\n\\n        <div class=\\"nextbtn\\" class:hide={!read} on:pointerdown={next}>\u25B6</div>\\n        <div class=\\"prevbtn\\" class:hide={!read} on:pointerdown={prev}>\u25C0</div>\\n\\n        <div class=\\"dots\\" class:hide={!read}>\\n            {#each Array(3) as _, i }\\n                <strong on:pointerdown={()=>{if(slide!=i+1) goToSlide(i+1)}} class:current={slide==i+1}>\u{1F535}</strong>\\n            {/each}\\n        </div>\\n\\n</header>\\n\\n<main style=padding-bottom:1rem;>\\n    <a class=\\"login-box\\" href=\\"{base}/login\\" rel=external>\\n        <div class=\\"description\\">\\n            <svg width=3em xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 20 20\\" fill=\\"white\\"><path fill-rule=\\"evenodd\\" d=\\"M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z\\" clip-rule=\\"evenodd\\"></path></svg>\\n            <h2 style=\\"color: white;\\">Single Sign On</h2>\\n        </div>\\n        <div class=\\"description\\" style=background:var(--surface1);color:var(--text);>\\n                <h2>Login</h2>\\n                <svg width=\\"2em\\" xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 20 20\\" fill=\\"currentColor\\"><path fill-rule=\\"evenodd\\" d=\\"M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z\\" clip-rule=\\"evenodd\\"></path></svg>\\n            </div>\\n        </a>\\n    </main>\\n\\n<style>\\n\\n\\n:root{\\n    --headerheight: 70vh;\\n    --headerwidth: 100vw;\\n}\\n\\nsvg{\\n    vertical-align: bottom;\\n}\\n\\n*{\\n    user-select: none;\\n}\\n\\n\\n.dots{\\n    position: absolute;\\n    bottom: 5%;\\n    left: 0;\\n    right: 0;\\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n    text-align: center;\\n    gap:1rem\\n}\\n\\n.dots strong{\\n    opacity: .3;\\n    will-change: opacity, transform;\\n    color: var(--brand)\\n}\\n\\n.dots .current{\\n    transform: scale(1.2);\\n    opacity: .75;\\n}\\n\\n.dots strong:hover{\\n    opacity: .75;\\n}\\n\\n.nextbtn, .prevbtn{\\n    position: absolute;\\n    top: 50%;\\n    transform: translateY(-50%);\\n    font-size: 3rem;\\n    aspect-ratio: 1/1;\\n    cursor: pointer;\\n    opacity: .3;\\n    will-change: transform,opacity;\\n    color: var(--brand);\\n    transition: transform 300ms ease, opacity 200ms ease;\\n}\\n\\n.nextbtn:hover, .prevbtn:hover{\\n    opacity: .75;\\n}\\n\\n.prevbtn{\\n    left: 5%;\\n}\\n\\n.nextbtn{\\n    right: 5%;\\n}\\n\\n.item3{\\n    background: var(--brand);\\n    color: var(--surface1);\\n    width: max-content;\\n    padding: 4px 8px;\\n    font-size: 12px;\\n    margin: .25rem 0;\\n}\\n\\n\\n.item4{\\n    padding-top: 1rem;\\n}\\n\\nmain{\\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n    padding: 2em;\\n}\\n\\n.login-box{\\n    display: flex;\\n    flex-direction: column;\\n    border-radius: 8px;\\n    overflow: hidden;\\n    border: var(--border);\\n    width: 100%;\\n    box-shadow: 0 0 1px 1px rgba(0,0,0,.1) ;\\n}\\n\\n.login-box>.description{\\n    display: flex;\\n    align-items: center;\\n    gap:2rem;\\n    justify-content: space-between;\\n    padding: 1rem;\\n    background: var(--brand);\\n    color: var(--surface1);\\n}\\n\\nheader{\\n overflow: hidden;\\n height: 70vh;\\n position: relative;\\n}  \\n\\nheader::before, header::after{\\n    content: '';\\n    position: absolute;\\n    width: 100%;\\n    height: 100%;\\n    top: 0;\\n    left: 0;\\n    background-size: cover;\\n    background: url(/bg1.jpg);\\n    opacity: 0;\\n    will-change: opacity;\\n    transition: opacity 500ms linear;\\n}\\n\\n\\nheader::after{\\n    z-index: -1;\\n    background: url(/bg2.jpg);\\n}\\n\\nheader.bg1::before, header.bg2::after{\\n    opacity: 1;\\n}\\n\\n@media(prefers-color-scheme:dark){\\n    header::before, header::after{\\n        filter: invert(.9);\\n    }\\n}\\n\\n.mac{\\n    position: absolute;\\n    max-width:50%;\\n    left: 25%;\\n    height: auto;\\n    bottom:15%;\\n}\\n\\n.ipad{\\n    position: absolute;\\n    max-width:30%;\\n    left: 1%;\\n    bottom:15%;\\n    height: auto;\\n}\\n\\n.iphone{\\n    position: absolute;\\n    max-width:12%;\\n    left: 32%;\\n    bottom:10%;\\n    height: auto;\\n}\\n\\n.macbook{\\n    position: absolute;\\n    max-width:50%;\\n    right: 1%;\\n    bottom:15%;\\n    height: auto;\\n}\\n\\n.text{\\n    position: absolute;\\n    left: 0;\\n    top:0;\\n    padding: 5% 3%;\\n    display: flex;\\n    flex-direction: column;\\n    width: 100%;\\n    height: 50%;\\n}\\n\\n.image{\\n    height: 50%;\\n    width: 100%;\\n    display: grid;\\n    place-items: center;\\n    position: absolute;\\n    left: 0;\\n    top:50%;\\n}\\n\\n.logo{\\n    height:60%;\\n    width: auto;\\n}\\n\\n.ps{\\n    width: 25%; \\n    height:auto;\\n}\\n*[style*=--state]{\\n    will-change: transform,opacity;\\n}\\n\\n@media (orientation: landscape) and (min-width:800px){\\n    :root{\\n        --headerheight:60vh;\\n        --headerwidth:50vw;\\n    }\\n    header{\\n        height: 60vh;\\n        grid-template-rows: 1fr;\\n        grid-template-columns: 1fr 1fr;\\n    }\\n\\n    main{\\n        justify-content: flex-end;\\n        height: max-content;\\n        padding: 1em;\\n    }\\n\\n    .login-box{\\n        width: max-content;\\n    }\\n\\n    .text{\\n        height: 100%;\\n        width: 50%;\\n    }\\n\\n    .image{\\n        height: 100%;\\n        left: 50%;\\n        top:0;\\n        width: 50%;\\n    }\\n\\n    .logo{\\n        height: auto;\\n        width: 30%;\\n    }\\n\\n    .ps{\\n        width: 30%; \\n        height:auto;\\n    }\\n\\n    \\n}\\n\\n\\n.text > h1{\\n    font-size: 18px;\\n}\\n\\nh1>span{\\n    font-size: 12px;\\n}\\n\\n\\n.hide{\\n    transform: scaleY(0);\\n}\\n\\n\\n.top-in{\\n    animation: top 600ms ease backwards;\\n    animation-delay: var(--in);\\n    animation-play-state: var(--state);\\n}\\n\\n.top-out{\\n    animation: top 600ms ease forwards;\\n    animation-direction: reverse;\\n    animation-delay: var(--out);\\n    animation-play-state: var(--state);\\n}\\n\\n.bottom-in{\\n    animation: bottom 600ms ease backwards;\\n    animation-delay: var(--in);\\n    animation-play-state: var(--state);\\n}\\n\\n.bottom-out{\\n    animation: bottom 600ms ease forwards;\\n    animation-direction: reverse;\\n    animation-delay: var(--out);\\n    animation-play-state: var(--state);\\n}\\n\\n.left-in{\\n    animation: left 600ms ease backwards;\\n    animation-delay: var(--in);\\n    animation-play-state: var(--state);\\n}\\n\\n.left-out{\\n    animation: left 600ms ease forwards;\\n    animation-direction: reverse;\\n    animation-delay: var(--out);\\n    animation-play-state: var(--state);\\n}\\n\\n.right-in{\\n    animation: right 600ms ease backwards;\\n    animation-delay: var(--in);\\n    animation-play-state: var(--state);\\n}\\n\\n.right-bounce-in{\\n    animation: right-no-opacity 1000ms cubic-bezier(0, 1.5, 0.75, 1) backwards;\\n    animation-delay: var(--in);\\n    animation-play-state: var(--state);\\n    opacity: 1;\\n}\\n\\n.right-out{\\n    animation: right 1s ease forwards;\\n    animation-direction: reverse;\\n    animation-delay: var(--out);\\n    animation-play-state: var(--state);\\n}\\n\\n@keyframes top{\\n    0%{\\n        transform: translateY(calc(-1 * var(--headerheight)));\\n        opacity: 0;\\n    }\\n    50%{\\n        opacity: .2;\\n    }\\n    90%{\\n        opacity: 1;\\n    }\\n}\\n\\n@keyframes bottom{\\n    0%{\\n        transform: translateY(calc(1 * var(--headerheight)));\\n        opacity: 0;\\n    }\\n    50%{\\n        opacity: .2;\\n    }\\n    90%{\\n        opacity: 1;\\n    }\\n}\\n\\n@keyframes left{\\n    0%{\\n        transform: translateX(calc(-1 * var(--headerwidth)));\\n        opacity: 0;\\n    }\\n    50%{\\n        opacity: .2;\\n    }\\n    90%{\\n        opacity: 1;\\n    }\\n}\\n\\n@keyframes right{\\n    0%{\\n        transform: translateX(calc(1 * var(--headerwidth)));\\n        opacity: 0;\\n    }\\n    50%{\\n        opacity: .2;\\n    }\\n    90%{\\n        opacity: 1;\\n    }\\n}\\n\\n@keyframes right-no-opacity{\\n    0%{\\n        transform: translateX(calc(1 * var(--headerwidth)));\\n        opacity: 0;\\n    }\\n    90%{\\n        opacity: 1;\\n    }\\n}\\n</style>"],"names":[],"mappings":"AAuJA,KAAK,CAAC,AACF,cAAc,CAAE,IAAI,CACpB,aAAa,CAAE,KAAK,AACxB,CAAC,AAED,+BAAG,CAAC,AACA,cAAc,CAAE,MAAM,AAC1B,CAAC,AAED,4BAAC,CAAC,AACE,WAAW,CAAE,IAAI,AACrB,CAAC,AAGD,iCAAK,CAAC,AACF,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,EAAE,CACV,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,UAAU,CAAE,MAAM,CAClB,IAAI,IAAI;AACZ,CAAC,AAED,mBAAK,CAAC,oBAAM,CAAC,AACT,OAAO,CAAE,EAAE,CACX,WAAW,CAAE,OAAO,CAAC,CAAC,SAAS,CAC/B,KAAK,CAAE,IAAI,OAAO,CAAC;AACvB,CAAC,AAED,mBAAK,CAAC,sBAAQ,CAAC,AACX,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,OAAO,CAAE,GAAG,AAChB,CAAC,AAED,mBAAK,CAAC,oBAAM,MAAM,CAAC,AACf,OAAO,CAAE,GAAG,AAChB,CAAC,AAED,oCAAQ,CAAE,oCAAQ,CAAC,AACf,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,SAAS,CAAE,IAAI,CACf,YAAY,CAAE,CAAC,CAAC,CAAC,CACjB,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,EAAE,CACX,WAAW,CAAE,SAAS,CAAC,OAAO,CAC9B,KAAK,CAAE,IAAI,OAAO,CAAC,CACnB,UAAU,CAAE,SAAS,CAAC,KAAK,CAAC,IAAI,CAAC,CAAC,OAAO,CAAC,KAAK,CAAC,IAAI,AACxD,CAAC,AAED,oCAAQ,MAAM,CAAE,oCAAQ,MAAM,CAAC,AAC3B,OAAO,CAAE,GAAG,AAChB,CAAC,AAED,oCAAQ,CAAC,AACL,IAAI,CAAE,EAAE,AACZ,CAAC,AAED,oCAAQ,CAAC,AACL,KAAK,CAAE,EAAE,AACb,CAAC,AAED,kCAAM,CAAC,AACH,UAAU,CAAE,IAAI,OAAO,CAAC,CACxB,KAAK,CAAE,IAAI,UAAU,CAAC,CACtB,KAAK,CAAE,WAAW,CAClB,OAAO,CAAE,GAAG,CAAC,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,MAAM,CAAC,CAAC,AACpB,CAAC,AAGD,kCAAM,CAAC,AACH,WAAW,CAAE,IAAI,AACrB,CAAC,AAED,gCAAI,CAAC,AACD,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,OAAO,CAAE,GAAG,AAChB,CAAC,AAED,sCAAU,CAAC,AACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,aAAa,CAAE,GAAG,CAClB,QAAQ,CAAE,MAAM,CAChB,MAAM,CAAE,IAAI,QAAQ,CAAC,CACrB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,AAC3C,CAAC,AAED,wBAAU,CAAC,0BAAY,CAAC,AACpB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,IAAI,IAAI,CACR,eAAe,CAAE,aAAa,CAC9B,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IAAI,OAAO,CAAC,CACxB,KAAK,CAAE,IAAI,UAAU,CAAC,AAC1B,CAAC,AAED,kCAAM,CAAC,AACN,QAAQ,CAAE,MAAM,CAChB,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,AACnB,CAAC,AAED,kCAAM,QAAQ,CAAE,kCAAM,OAAO,CAAC,AAC1B,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,eAAe,CAAE,KAAK,CACtB,UAAU,CAAE,IAAI,QAAQ,CAAC,CACzB,OAAO,CAAE,CAAC,CACV,WAAW,CAAE,OAAO,CACpB,UAAU,CAAE,OAAO,CAAC,KAAK,CAAC,MAAM,AACpC,CAAC,AAGD,kCAAM,OAAO,CAAC,AACV,OAAO,CAAE,EAAE,CACX,UAAU,CAAE,IAAI,QAAQ,CAAC,AAC7B,CAAC,AAED,MAAM,gCAAI,QAAQ,CAAE,MAAM,gCAAI,OAAO,CAAC,AAClC,OAAO,CAAE,CAAC,AACd,CAAC,AAED,MAAM,sBAAsB,IAAI,CAAC,CAAC,AAC9B,kCAAM,QAAQ,CAAE,kCAAM,OAAO,CAAC,AAC1B,MAAM,CAAE,OAAO,EAAE,CAAC,AACtB,CAAC,AACL,CAAC,AAED,gCAAI,CAAC,AACD,QAAQ,CAAE,QAAQ,CAClB,UAAU,GAAG,CACb,IAAI,CAAE,GAAG,CACT,MAAM,CAAE,IAAI,CACZ,OAAO,GAAG,AACd,CAAC,AAED,iCAAK,CAAC,AACF,QAAQ,CAAE,QAAQ,CAClB,UAAU,GAAG,CACb,IAAI,CAAE,EAAE,CACR,OAAO,GAAG,CACV,MAAM,CAAE,IAAI,AAChB,CAAC,AAED,mCAAO,CAAC,AACJ,QAAQ,CAAE,QAAQ,CAClB,UAAU,GAAG,CACb,IAAI,CAAE,GAAG,CACT,OAAO,GAAG,CACV,MAAM,CAAE,IAAI,AAChB,CAAC,AAED,oCAAQ,CAAC,AACL,QAAQ,CAAE,QAAQ,CAClB,UAAU,GAAG,CACb,KAAK,CAAE,EAAE,CACT,OAAO,GAAG,CACV,MAAM,CAAE,IAAI,AAChB,CAAC,AAED,iCAAK,CAAC,AACF,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,IAAI,CAAC,CACL,OAAO,CAAE,EAAE,CAAC,EAAE,CACd,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,AACf,CAAC,AAED,kCAAM,CAAC,AACH,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,IAAI,GAAG,AACX,CAAC,AAED,iCAAK,CAAC,AACF,OAAO,GAAG,CACV,KAAK,CAAE,IAAI,AACf,CAAC,AAED,+BAAG,CAAC,AACA,KAAK,CAAE,GAAG,CACV,OAAO,IAAI,AACf,CAAC,AACD,CAAC,CAAC,KAAK,EAAE,OAAO,6BAAC,CAAC,AACd,WAAW,CAAE,SAAS,CAAC,OAAO,AAClC,CAAC,AAED,MAAM,AAAC,cAAc,SAAS,CAAC,CAAC,GAAG,CAAC,WAAW,KAAK,CAAC,CAAC,AAClD,KAAK,CAAC,AACF,eAAe,IAAI,CACnB,cAAc,IAAI,AACtB,CAAC,AACD,kCAAM,CAAC,AACH,MAAM,CAAE,IAAI,CACZ,kBAAkB,CAAE,GAAG,CACvB,qBAAqB,CAAE,GAAG,CAAC,GAAG,AAClC,CAAC,AAED,gCAAI,CAAC,AACD,eAAe,CAAE,QAAQ,CACzB,MAAM,CAAE,WAAW,CACnB,OAAO,CAAE,GAAG,AAChB,CAAC,AAED,sCAAU,CAAC,AACP,KAAK,CAAE,WAAW,AACtB,CAAC,AAED,iCAAK,CAAC,AACF,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,GAAG,AACd,CAAC,AAED,kCAAM,CAAC,AACH,MAAM,CAAE,IAAI,CACZ,IAAI,CAAE,GAAG,CACT,IAAI,CAAC,CACL,KAAK,CAAE,GAAG,AACd,CAAC,AAED,iCAAK,CAAC,AACF,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,GAAG,AACd,CAAC,AAED,+BAAG,CAAC,AACA,KAAK,CAAE,GAAG,CACV,OAAO,IAAI,AACf,CAAC,AAGL,CAAC,AAGD,mBAAK,CAAG,gBAAE,CAAC,AACP,SAAS,CAAE,IAAI,AACnB,CAAC,AAED,gBAAE,CAAC,kBAAI,CAAC,AACJ,SAAS,CAAE,IAAI,AACnB,CAAC,AAGD,iCAAK,CAAC,AACF,SAAS,CAAE,OAAO,CAAC,CAAC,AACxB,CAAC,AAGD,mCAAO,CAAC,AACJ,SAAS,CAAE,iBAAG,CAAC,KAAK,CAAC,IAAI,CAAC,SAAS,CACnC,eAAe,CAAE,IAAI,IAAI,CAAC,CAC1B,oBAAoB,CAAE,IAAI,OAAO,CAAC,AACtC,CAAC,AAED,oCAAQ,CAAC,AACL,SAAS,CAAE,iBAAG,CAAC,KAAK,CAAC,IAAI,CAAC,QAAQ,CAClC,mBAAmB,CAAE,OAAO,CAC5B,eAAe,CAAE,IAAI,KAAK,CAAC,CAC3B,oBAAoB,CAAE,IAAI,OAAO,CAAC,AACtC,CAAC,AAED,sCAAU,CAAC,AACP,SAAS,CAAE,oBAAM,CAAC,KAAK,CAAC,IAAI,CAAC,SAAS,CACtC,eAAe,CAAE,IAAI,IAAI,CAAC,CAC1B,oBAAoB,CAAE,IAAI,OAAO,CAAC,AACtC,CAAC,AAED,uCAAW,CAAC,AACR,SAAS,CAAE,oBAAM,CAAC,KAAK,CAAC,IAAI,CAAC,QAAQ,CACrC,mBAAmB,CAAE,OAAO,CAC5B,eAAe,CAAE,IAAI,KAAK,CAAC,CAC3B,oBAAoB,CAAE,IAAI,OAAO,CAAC,AACtC,CAAC,AAED,oCAAQ,CAAC,AACL,SAAS,CAAE,kBAAI,CAAC,KAAK,CAAC,IAAI,CAAC,SAAS,CACpC,eAAe,CAAE,IAAI,IAAI,CAAC,CAC1B,oBAAoB,CAAE,IAAI,OAAO,CAAC,AACtC,CAAC,AAED,qCAAS,CAAC,AACN,SAAS,CAAE,kBAAI,CAAC,KAAK,CAAC,IAAI,CAAC,QAAQ,CACnC,mBAAmB,CAAE,OAAO,CAC5B,eAAe,CAAE,IAAI,KAAK,CAAC,CAC3B,oBAAoB,CAAE,IAAI,OAAO,CAAC,AACtC,CAAC,AAED,qCAAS,CAAC,AACN,SAAS,CAAE,mBAAK,CAAC,KAAK,CAAC,IAAI,CAAC,SAAS,CACrC,eAAe,CAAE,IAAI,IAAI,CAAC,CAC1B,oBAAoB,CAAE,IAAI,OAAO,CAAC,AACtC,CAAC,AAED,4CAAgB,CAAC,AACb,SAAS,CAAE,8BAAgB,CAAC,MAAM,CAAC,aAAa,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,SAAS,CAC1E,eAAe,CAAE,IAAI,IAAI,CAAC,CAC1B,oBAAoB,CAAE,IAAI,OAAO,CAAC,CAClC,OAAO,CAAE,CAAC,AACd,CAAC,AAED,sCAAU,CAAC,AACP,SAAS,CAAE,mBAAK,CAAC,EAAE,CAAC,IAAI,CAAC,QAAQ,CACjC,mBAAmB,CAAE,OAAO,CAC5B,eAAe,CAAE,IAAI,KAAK,CAAC,CAC3B,oBAAoB,CAAE,IAAI,OAAO,CAAC,AACtC,CAAC,AAED,WAAW,iBAAG,CAAC,AACX,EAAE,CAAC,AACC,SAAS,CAAE,WAAW,KAAK,EAAE,CAAC,CAAC,CAAC,IAAI,cAAc,CAAC,CAAC,CAAC,CACrD,OAAO,CAAE,CAAC,AACd,CAAC,AACD,GAAG,CAAC,AACA,OAAO,CAAE,EAAE,AACf,CAAC,AACD,GAAG,CAAC,AACA,OAAO,CAAE,CAAC,AACd,CAAC,AACL,CAAC,AAED,WAAW,oBAAM,CAAC,AACd,EAAE,CAAC,AACC,SAAS,CAAE,WAAW,KAAK,CAAC,CAAC,CAAC,CAAC,IAAI,cAAc,CAAC,CAAC,CAAC,CACpD,OAAO,CAAE,CAAC,AACd,CAAC,AACD,GAAG,CAAC,AACA,OAAO,CAAE,EAAE,AACf,CAAC,AACD,GAAG,CAAC,AACA,OAAO,CAAE,CAAC,AACd,CAAC,AACL,CAAC,AAED,WAAW,kBAAI,CAAC,AACZ,EAAE,CAAC,AACC,SAAS,CAAE,WAAW,KAAK,EAAE,CAAC,CAAC,CAAC,IAAI,aAAa,CAAC,CAAC,CAAC,CACpD,OAAO,CAAE,CAAC,AACd,CAAC,AACD,GAAG,CAAC,AACA,OAAO,CAAE,EAAE,AACf,CAAC,AACD,GAAG,CAAC,AACA,OAAO,CAAE,CAAC,AACd,CAAC,AACL,CAAC,AAED,WAAW,mBAAK,CAAC,AACb,EAAE,CAAC,AACC,SAAS,CAAE,WAAW,KAAK,CAAC,CAAC,CAAC,CAAC,IAAI,aAAa,CAAC,CAAC,CAAC,CACnD,OAAO,CAAE,CAAC,AACd,CAAC,AACD,GAAG,CAAC,AACA,OAAO,CAAE,EAAE,AACf,CAAC,AACD,GAAG,CAAC,AACA,OAAO,CAAE,CAAC,AACd,CAAC,AACL,CAAC,AAED,WAAW,8BAAgB,CAAC,AACxB,EAAE,CAAC,AACC,SAAS,CAAE,WAAW,KAAK,CAAC,CAAC,CAAC,CAAC,IAAI,aAAa,CAAC,CAAC,CAAC,CACnD,OAAO,CAAE,CAAC,AACd,CAAC,AACD,GAAG,CAAC,AACA,OAAO,CAAE,CAAC,AACd,CAAC,AACL,CAAC"}`
};
var load$5 = redirectIfLoggedIn;
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let getstate;
  let slide = 0;
  let intro = true;
  let read = false;
  onMount(() => {
    slide = 1;
    document.addEventListener("visibilitychange", (_) => {
      read = document.hidden ? true : false;
    });
  });
  $$result.css.add(css$f);
  getstate = (n) => slide == n && !read ? "running" : "paused";
  return `${validate_component(PageHead, "PageHead").$$render($$result, {
    title: "Web Akademik",
    description: "Landing Page"
  }, {}, {})}

<header class="${["svelte-b6d53x", (slide == 3 ? "bg2" : "") + " " + (slide != 3 ? "bg1" : "")].join(" ").trim()}"><div class="${[
    "text svelte-b6d53x",
    (slide == 1 && !intro ? "top-out" : "") + " " + (slide != 1 ? "hide" : "")
  ].join(" ").trim()}" style="${"--out:2000ms; --state:" + escape(getstate(1))}" title="${"last"}"><h1 style="${"font-size: 24px; --in:300ms; --state:" + escape(getstate(1))}" class="${["svelte-b6d53x", slide == 1 ? "top-in" : ""].join(" ").trim()}">Selamat Datang <span class="${"svelte-b6d53x"}">di website</span></h1>
        <h1 style="${"font-size: 20px; --in:400ms; --state:" + escape(getstate(1))}" class="${["svelte-b6d53x", slide == 1 ? "top-in" : ""].join(" ").trim()}">AKADEMIK STTM CILEUNGSI</h1>
        <b class="${["item3 svelte-b6d53x", slide == 1 ? "top-in" : ""].join(" ").trim()}" style="${"--in:500ms; --state:" + escape(getstate(1))}">Excellent - Moral - Professional</b>
        <span class="${["item4 svelte-b6d53x", slide == 1 ? "left-in" : ""].join(" ").trim()}" style="${"--in:600ms; --state:" + escape(getstate(1))}">Smart - Clean - Responsive - Elegant</span>
        <div style="${"margin-top: 1em; --in:700ms; --state:" + escape(getstate(1))}" class="${["svelte-b6d53x", slide == 1 ? "right-in" : ""].join(" ").trim()}"><span class="${"svelte-b6d53x"}">Sekolah Tinggi Teknologi Muhammadiyah Cileungsi</span>
            <br class="${"svelte-b6d53x"}">
            <span class="${"svelte-b6d53x"}">Jln Anggrek Cileungsi</span>
            <br class="${"svelte-b6d53x"}">
            <span class="${"svelte-b6d53x"}">Telp. 0099949449</span></div></div>      
    <div class="${["image svelte-b6d53x", slide != 1 ? "hide" : ""].join(" ").trim()}"><img src="${escape(base) + "/logo.webp"}" alt="${"logo"}" class="${[
    "logo svelte-b6d53x",
    (slide == 1 && intro ? "right-in" : "") + " " + (slide == 1 && !intro ? "bottom-out" : "")
  ].join(" ").trim()}" width="${"168"}" height="${"168"}" style="${"--in:400ms; --out:2000ms; --state:" + escape(getstate(1))}"></div> 
   
   
   
   
    <div class="${["text svelte-b6d53x", slide != 2 ? "hide" : ""].join(" ").trim()}"><h1 style="${"font-size: 24px; --in:300ms; --out:2100ms; --state:" + escape(getstate(2))}" title="${"last"}" class="${[
    "svelte-b6d53x",
    (slide == 2 && intro ? "left-in" : "") + " " + (slide == 2 && !intro ? "top-out" : "")
  ].join(" ").trim()}">GUIDANCE</h1>
        <div style="${"margin-top: 1em; font-size: 20px; --in:500ms; --out:2050ms; --state:" + escape(getstate(2))}" class="${[
    "svelte-b6d53x",
    (slide == 2 && intro ? "top-in" : "") + " " + (slide == 2 && !intro ? "left-out" : "")
  ].join(" ").trim()}"><span class="${"svelte-b6d53x"}">e-Arsip</span>
            <br class="${"svelte-b6d53x"}">
            <span class="${"svelte-b6d53x"}">e-Learning</span>
            <br class="${"svelte-b6d53x"}">
            <span class="${"svelte-b6d53x"}">e-Perpus</span>
            <br class="${"svelte-b6d53x"}">
            <span class="${"svelte-b6d53x"}">e-Alumni</span>
            <br class="${"svelte-b6d53x"}">
            <span class="${"svelte-b6d53x"}">Accesibility, Central, Responsive, User friendly</span></div></div>
    <div class="${["image svelte-b6d53x", slide != 2 ? "hide" : ""].join(" ").trim()}"><img src="${escape(base) + "/ps.webp"}" alt="${"img"}" style="${"--in:400ms; --out:1950ms; --state:" + escape(getstate(2))}" class="${[
    "ps svelte-b6d53x",
    (slide == 2 && intro ? "bottom-in" : "") + " " + (slide == 2 & !intro ? "right-out" : "")
  ].join(" ").trim()}" height="${"300"}" width="${"300"}"></div>
    

    <div class="${[
    "text svelte-b6d53x",
    (slide != 3 ? "hide" : "") + " " + (slide == 3 && !intro ? "top-out" : "")
  ].join(" ").trim()}" title="${"last"}" style="${"--in:300ms; --out:2100ms; --state:" + escape(getstate(3))}"><h1 style="${"font-size: 24px; --in:500ms; --state:" + escape(getstate(3))}" class="${["svelte-b6d53x", slide == 3 ? "top-in" : ""].join(" ").trim()}">Mudah Diakses</h1>
        <b class="${["item3 svelte-b6d53x", slide == 3 ? "right-in" : ""].join(" ").trim()}" style="${"--in:400ms; --state:" + escape(getstate(3))}">Responsive &amp; Theme-Colored</b>
        <span style="${"font-size: 20px; margin-top: 2rem; --in:500ms; --state:" + escape(getstate(3))}" class="${["svelte-b6d53x", slide == 3 ? "left-in" : ""].join(" ").trim()}">Sistem Akademik STTM Cileungsi dapat diakses menggunakan PC, Laptop</span></div>
    <div class="${["image svelte-b6d53x", slide != 3 ? "hide" : ""].join(" ").trim()}"><img src="${escape(base) + "/mac.webp"}" alt="${"mac"}" class="${[
    "mac svelte-b6d53x",
    (slide == 3 && intro ? "right-bounce-in" : "") + " " + (slide == 3 && !intro ? "bottom-out" : "")
  ].join(" ").trim()}" style="${"--in:400ms; --out:2000ms; --state:" + escape(getstate(3))}">
        <img src="${escape(base) + "/ipad.webp"}" alt="${"ipad"}" class="${[
    "ipad svelte-b6d53x",
    (slide == 3 && intro ? "right-bounce-in" : "") + " " + (slide == 3 && !intro ? "left-out" : "")
  ].join(" ").trim()}" style="${"--in:600ms; --out:2000ms; --state:" + escape(getstate(3))}">
        <img src="${escape(base) + "/iphone.webp"}" alt="${"iphone"}" class="${[
    "iphone svelte-b6d53x",
    (slide == 3 && intro ? "right-bounce-in" : "") + " " + (slide == 3 && !intro ? "left-out" : "")
  ].join(" ").trim()}" style="${"--in:800ms; --out:2000ms; --state:" + escape(getstate(3))}">
        <img src="${escape(base) + "/macbook.webp"}" alt="${"macbook"}" class="${[
    "macbook svelte-b6d53x",
    (slide == 3 && intro ? "right-bounce-in" : "") + " " + (slide == 3 && !intro ? "right-out" : "")
  ].join(" ").trim()}" style="${"--in:1000ms; --out:1900ms; --state:" + escape(getstate(3))}"></div>

        <div class="${["nextbtn svelte-b6d53x", !read ? "hide" : ""].join(" ").trim()}">\u25B6</div>
        <div class="${["prevbtn svelte-b6d53x", !read ? "hide" : ""].join(" ").trim()}">\u25C0</div>

        <div class="${["dots svelte-b6d53x", !read ? "hide" : ""].join(" ").trim()}">${each(Array(3), (_, i) => `<strong class="${["svelte-b6d53x", slide == i + 1 ? "current" : ""].join(" ").trim()}">\u{1F535}</strong>`)}</div></header>

<main style="${"padding-bottom:1rem;"}" class="${"svelte-b6d53x"}"><a class="${"login-box svelte-b6d53x"}" href="${escape(base) + "/login"}" rel="${"external"}"><div class="${"description svelte-b6d53x"}"><svg width="${"3em"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}" fill="${"white"}" class="${"svelte-b6d53x"}"><path fill-rule="${"evenodd"}" d="${"M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z"}" clip-rule="${"evenodd"}" class="${"svelte-b6d53x"}"></path></svg>
            <h2 style="${"color: white;"}" class="${"svelte-b6d53x"}">Single Sign On</h2></div>
        <div class="${"description svelte-b6d53x"}" style="${"background:var(--surface1);color:var(--text);"}"><h2 class="${"svelte-b6d53x"}">Login</h2>
                <svg width="${"2em"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}" fill="${"currentColor"}" class="${"svelte-b6d53x"}"><path fill-rule="${"evenodd"}" d="${"M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"}" clip-rule="${"evenodd"}" class="${"svelte-b6d53x"}"></path></svg></div></a>
    </main>`;
});
var index$7 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes,
  load: load$5
});
var css$e = {
  code: "div.svelte-1dsm1o1{display:grid;grid-template-rows:auto 1fr;grid-template-columns:1fr;align-items:baseline;padding-bottom:1rem;gap:.25rem}@media(orientation: landscape) and (min-width:600px){div.svelte-1dsm1o1{display:grid;grid-template-columns:30% 70%;grid-template-rows:1fr}}",
  map: '{"version":3,"file":"FormControl.svelte","sources":["FormControl.svelte"],"sourcesContent":["<div>\\r\\n\\t<slot></slot>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\tdiv{\\r\\n\\t\\tdisplay:grid;\\r\\n\\t\\tgrid-template-rows: auto 1fr;\\r\\n\\t\\tgrid-template-columns:1fr;\\r\\n\\t\\talign-items:baseline;\\r\\n\\t\\tpadding-bottom:1rem;\\r\\n\\t\\tgap: .25rem;\\r\\n\\t}\\r\\n\\t@media (orientation: landscape) and (min-width:600px){\\r\\n\\t\\t\\tdiv{\\r\\n\\t\\t\\t\\tdisplay:grid;\\r\\n\\t\\t\\t\\tgrid-template-columns: 30% 70%;\\r\\n\\t\\t\\t\\tgrid-template-rows:1fr;\\r\\n\\t\\t\\t}\\r\\n\\t}\\r\\n</style>"],"names":[],"mappings":"AAKC,kBAAG,CAAC,AACH,QAAQ,IAAI,CACZ,kBAAkB,CAAE,IAAI,CAAC,GAAG,CAC5B,sBAAsB,GAAG,CACzB,YAAY,QAAQ,CACpB,eAAe,IAAI,CACnB,GAAG,CAAE,MAAM,AACZ,CAAC,AACD,MAAM,AAAC,cAAc,SAAS,CAAC,CAAC,GAAG,CAAC,WAAW,KAAK,CAAC,CAAC,AACpD,kBAAG,CAAC,AACH,QAAQ,IAAI,CACZ,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAC9B,mBAAmB,GAAG,AACvB,CAAC,AACH,CAAC"}'
};
var FormControl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$e);
  return `<div class="${"svelte-1dsm1o1"}">${slots.default ? slots.default({}) : ``}
</div>`;
});
var css$d = {
  code: "*{box-sizing:border-box}.indicator.svelte-1bwli83{font-size:xx-small}.title.svelte-1bwli83{display:flex;justify-content:space-between;z-index:1}.container.svelte-1bwli83{position:relative}menu.svelte-1bwli83{background:var(--surface1);padding-top:.25rem;padding-bottom:.5rem;transform:translateZ(0);display:none}menu.active.svelte-1bwli83{display:block}span.svelte-1bwli83{cursor:pointer}@media(orientation: landscape) and (min-width:800px){menu.svelte-1bwli83{position:absolute;top:100%;right:0;margin-top:.25rem;width:max-content;border:var(--border)}.left.svelte-1bwli83{left:0}span.svelte-1bwli83::before{content:'';position:absolute;bottom:0;left:0;height:3px;background:var(--brand);width:100%;transform-origin:0 50%;transform:scaleX(0);opacity:0;transition:transform 300ms ease, opacity 200ms ease-out}span.active.svelte-1bwli83::before{transform:scaleX(1);opacity:1}.indicator.svelte-1bwli83{visibility:collapse}}",
  map: `{"version":3,"file":"Submenu.svelte","sources":["Submenu.svelte"],"sourcesContent":["\\n<script context='module'>\\n<\/script>\\n\\n<script>\\nimport { onDestroy, onMount} from 'svelte'\\n\\nimport {slide, fly } from 'svelte/transition'\\n\\nexport let display = 'submenu'\\nexport let scope = new Map()\\nlet _\\n\\nconst update = _ => scope = scope\\n\\nonMount(()=>{\\n    scope.set(_, false)\\n    update()\\n})\\n\\nonDestroy(()=>{\\n    scope.delete(_)\\n    update()\\n})\\n\\n\\nexport function closeAll(){\\n    [...scope.keys()].forEach(i=>{\\n        scope.set(i, false)\\n    })\\n    update()\\n}\\n\\nfunction open(){\\n    closeAll()\\n    scope.set(_, true)\\n    update()\\n}\\n\\nfunction close() {\\n    scope.set(_, false)\\n    update()\\n}\\n\\nfunction handler(){\\n    if(active) return close()\\n    return open()\\n}\\n\\n$: active = scope.get(_)\\n<\/script>\\n\\n<svelte:body on:click={e=>{\\n    const path = e.path || (e.composedPath && e.composedPath())\\n    if([...path].includes(_)) return\\n    close()\\n}}/>\\n\\n<div bind:this={_} on:click={handler} class=container>\\n    <div class=\\"title\\">\\n        <span class={$$props.class} style={$$props.style} class:active title={'Menu ' + display.replace(/[^\\\\x00-\\\\x7F]/g, '')}>{display}</span>\\n        <span class=indicator>\\n            {#if active}\\n            <svg width=\\"2em\\" xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\" fill=\\"currentColor\\" color=\\"var(--brand)\\"><path d=\\"M0 0h24v24H0z\\" fill=\\"none\\"></path><path d=\\"M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z\\"></path></svg>\\n            {:else}\\n            <svg width=\\"2em\\" xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\" fill=\\"currentColor\\" color=\\"var(--brand)\\"><path d=\\"M0 0h24v24H0z\\" fill=\\"none\\"></path><path d=\\"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z\\"></path></svg>\\n            {/if}\\n        \\n        </span>\\n    </div>\\n    {#key active}        \\n        <menu class:left={[...scope.keys()][0]==_} in:fly={{duration: 300, x:-100}} out:slide={{duration:300}} class:active={active}>\\n            <slot></slot>\\n        </menu>\\n    {/key}\\n</div>\\n\\n\\n<style>\\n    :global(*){\\n        box-sizing: border-box;\\n    }\\n\\n    .indicator{\\n        font-size: xx-small;\\n    }\\n\\n    .title{\\n        display: flex;\\n        justify-content: space-between;\\n        z-index: 1;\\n    }\\n\\n    .container{\\n        position: relative;\\n    }\\n\\n    menu{\\n        background: var(--surface1);\\n        padding-top: .25rem;\\n        padding-bottom: .5rem;\\n        transform: translateZ(0);\\n        display: none;\\n    }\\n\\n    menu.active{\\n        display: block;\\n    }\\n\\n    span{\\n        cursor: pointer;\\n    }\\n    \\n    @media (orientation: landscape) and (min-width:800px){\\n        menu{\\n            position: absolute;\\n            top:100%;\\n            right: 0;\\n            margin-top: .25rem;\\n            width: max-content;\\n            border: var(--border);\\n\\n        }\\n\\n        .left{\\n            left: 0;\\n        }\\n\\n\\n        span::before{\\n\\t\\tcontent:'';\\n\\t\\tposition:absolute;\\n\\t\\tbottom:0;\\n\\t\\tleft:0;\\n\\t\\theight:3px;\\n\\t\\tbackground: var(--brand);\\n\\t\\twidth:100%;\\n\\t\\ttransform-origin:0 50%;\\n\\t\\ttransform: scaleX(0);\\n\\t\\topacity:0;\\n\\t\\ttransition: transform 300ms ease, opacity 200ms ease-out;\\n\\t}\\n\\t\\n        span.active::before{\\n                transform: scaleX(1);\\n                opacity:1;\\n        }\\n\\n        .indicator{\\n            visibility: collapse;\\n        }\\n    }\\n\\n\\n</style>"],"names":[],"mappings":"AA+EY,CAAC,AAAC,CAAC,AACP,UAAU,CAAE,UAAU,AAC1B,CAAC,AAED,yBAAU,CAAC,AACP,SAAS,CAAE,QAAQ,AACvB,CAAC,AAED,qBAAM,CAAC,AACH,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,OAAO,CAAE,CAAC,AACd,CAAC,AAED,yBAAU,CAAC,AACP,QAAQ,CAAE,QAAQ,AACtB,CAAC,AAED,mBAAI,CAAC,AACD,UAAU,CAAE,IAAI,UAAU,CAAC,CAC3B,WAAW,CAAE,MAAM,CACnB,cAAc,CAAE,KAAK,CACrB,SAAS,CAAE,WAAW,CAAC,CAAC,CACxB,OAAO,CAAE,IAAI,AACjB,CAAC,AAED,IAAI,sBAAO,CAAC,AACR,OAAO,CAAE,KAAK,AAClB,CAAC,AAED,mBAAI,CAAC,AACD,MAAM,CAAE,OAAO,AACnB,CAAC,AAED,MAAM,AAAC,cAAc,SAAS,CAAC,CAAC,GAAG,CAAC,WAAW,KAAK,CAAC,CAAC,AAClD,mBAAI,CAAC,AACD,QAAQ,CAAE,QAAQ,CAClB,IAAI,IAAI,CACR,KAAK,CAAE,CAAC,CACR,UAAU,CAAE,MAAM,CAClB,KAAK,CAAE,WAAW,CAClB,MAAM,CAAE,IAAI,QAAQ,CAAC,AAEzB,CAAC,AAED,oBAAK,CAAC,AACF,IAAI,CAAE,CAAC,AACX,CAAC,AAGD,mBAAI,QAAQ,CAAC,AACnB,QAAQ,EAAE,CACV,SAAS,QAAQ,CACjB,OAAO,CAAC,CACR,KAAK,CAAC,CACN,OAAO,GAAG,CACV,UAAU,CAAE,IAAI,OAAO,CAAC,CACxB,MAAM,IAAI,CACV,iBAAiB,CAAC,CAAC,GAAG,CACtB,SAAS,CAAE,OAAO,CAAC,CAAC,CACpB,QAAQ,CAAC,CACT,UAAU,CAAE,SAAS,CAAC,KAAK,CAAC,IAAI,CAAC,CAAC,OAAO,CAAC,KAAK,CAAC,QAAQ,AACzD,CAAC,AAEM,IAAI,sBAAO,QAAQ,CAAC,AACZ,SAAS,CAAE,OAAO,CAAC,CAAC,CACpB,QAAQ,CAAC,AACjB,CAAC,AAED,yBAAU,CAAC,AACP,UAAU,CAAE,QAAQ,AACxB,CAAC,AACL,CAAC"}`
};
var Submenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let active;
  let { display = "submenu" } = $$props;
  let { scope = new Map() } = $$props;
  let _;
  const update = (_2) => scope = scope;
  onMount(() => {
    scope.set(_, false);
    update();
  });
  onDestroy(() => {
    scope.delete(_);
    update();
  });
  function closeAll() {
    [...scope.keys()].forEach((i) => {
      scope.set(i, false);
    });
    update();
  }
  if ($$props.display === void 0 && $$bindings.display && display !== void 0)
    $$bindings.display(display);
  if ($$props.scope === void 0 && $$bindings.scope && scope !== void 0)
    $$bindings.scope(scope);
  if ($$props.closeAll === void 0 && $$bindings.closeAll && closeAll !== void 0)
    $$bindings.closeAll(closeAll);
  $$result.css.add(css$d);
  active = scope.get(_);
  return `

<div class="${"container svelte-1bwli83"}"${add_attribute("this", _, 1)}><div class="${"title svelte-1bwli83"}"><span class="${[
    escape(null_to_empty($$props.class)) + " svelte-1bwli83",
    active ? "active" : ""
  ].join(" ").trim()}"${add_attribute("style", $$props.style, 0)}${add_attribute("title", "Menu " + display.replace(/[^\x00-\x7F]/g, ""), 0)}>${escape(display)}</span>
        <span class="${"indicator svelte-1bwli83"}">${active ? `<svg width="${"2em"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}" fill="${"currentColor"}" color="${"var(--brand)"}"><path d="${"M0 0h24v24H0z"}" fill="${"none"}"></path><path d="${"M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"}"></path></svg>` : `<svg width="${"2em"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}" fill="${"currentColor"}" color="${"var(--brand)"}"><path d="${"M0 0h24v24H0z"}" fill="${"none"}"></path><path d="${"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"}"></path></svg>`}</span></div>
    <menu class="${[
    "svelte-1bwli83",
    ([...scope.keys()][0] == _ ? "left" : "") + " " + (active ? "active" : "")
  ].join(" ").trim()}">${slots.default ? slots.default({}) : ``}</menu>
</div>`;
});
var css$c = {
  code: ".blue{background:blue}.svelte-1wbdzra.svelte-1wbdzra{box-sizing:border-box}a.svelte-1wbdzra.svelte-1wbdzra{text-decoration:none;color:var(--text)}a.svelte-1wbdzra.svelte-1wbdzra::before{display:none}.mobile-show.svelte-1wbdzra.svelte-1wbdzra{display:block}ul.svelte-1wbdzra.svelte-1wbdzra{display:grid;grid-template-columns:80% 15%;grid-gap:3%;padding:.5rem auto;grid-template-rows:clamp(8vh, 120px, 15vh)}.toggler.svelte-1wbdzra.svelte-1wbdzra{display:flex;flex-direction:row-reverse;overflow:hidden}.toggler.svelte-1wbdzra>button.svelte-1wbdzra{font-size:36px;text-align:end;background:transparent;outline:0;border:0;cursor:pointer;aspect-ratio:1/1;padding:0;width:min-content}.header.svelte-1wbdzra.svelte-1wbdzra{display:flex;align-items:center;gap:1rem;padding:0 1rem}.text.svelte-1wbdzra.svelte-1wbdzra{display:flex;flex-direction:column}.header.svelte-1wbdzra>img.svelte-1wbdzra{height:60%;width:auto;cursor:pointer}li.svelte-1wbdzra.svelte-1wbdzra{list-style:none}menu.svelte-1wbdzra.svelte-1wbdzra{padding:0 .5rem;display:none}menu.svelte-1wbdzra>li.svelte-1wbdzra{padding:.25rem 0;font-size:18px;border-top:1px solid var(--overlay)}menu.svelte-1wbdzra>li.svelte-1wbdzra:first-child{border:0}li.svelte-1wbdzra li.svelte-1wbdzra{padding:0 0.5rem;font-size:16px;position:relative}.title.svelte-1wbdzra.svelte-1wbdzra{color:var(--brand);font-size:clamp(1rem, .1rem + 1vw, 2.5rem);font-weight:700}.caption.svelte-1wbdzra.svelte-1wbdzra{color:var(--surface1);background:var(--brand);padding:.25rem}@media(orientation: landscape) and (min-width:800px){menu.svelte-1wbdzra.svelte-1wbdzra,.mobile-show.svelte-1wbdzra.svelte-1wbdzra{display:flex;justify-content:space-evenly;border-radius:0;border:0}a.svelte-1wbdzra.svelte-1wbdzra::before{display:absolute}a.svelte-1wbdzra.svelte-1wbdzra:hover::before{transform:scaleX(1)}menu.svelte-1wbdzra>li.svelte-1wbdzra{border:0;transition:background-color 300ms ease}menu.svelte-1wbdzra>li.svelte-1wbdzra:hover{background-color:rgba(0,0,0,.05)}.toggler.svelte-1wbdzra.svelte-1wbdzra{display:none}li.svelte-1wbdzra li.svelte-1wbdzra{padding:.25rem}header.svelte-1wbdzra.svelte-1wbdzra{max-width:100% !important;display:flex;align-items:center;justify-content:space-between}ul.svelte-1wbdzra.svelte-1wbdzra{grid-template-columns:1fr}}header.svelte-1wbdzra.svelte-1wbdzra{top:0;background:var(--surface1);z-index:99;border-bottom:2px solid var(--brand);position:sticky;user-select:none}",
  map: `{"version":3,"file":"Navbar.svelte","sources":["Navbar.svelte"],"sourcesContent":["<script>\\r\\nimport { browser } from \\"$app/env\\";\\r\\n\\r\\nimport { base } from \\"$app/paths\\";\\r\\nimport {slide, fly} from 'svelte/transition'\\r\\n    import Submenu from \\"./Submenu.svelte\\";\\r\\n    export let title = ''\\r\\n    export let caption = ''\\r\\n\\r\\n    let active = false\\r\\n\\r\\n    let scope = new Map()\\r\\n    let closeAll\\r\\n\\r\\n    export const close = _ => {closeAll(); active = false}\\r\\n<\/script>\\r\\n\\r\\n\\r\\n<svelte:body on:scroll={close}/>\\r\\n\\r\\n<header>\\r\\n    <ul>\\r\\n        <li class=\\"header\\">\\r\\n            <img src='{base}/logo.webp' alt=logo width=167 height=168 on:click=\\"{()=>window.location=\\"/\\"}\\" title=\\"Logo STTM\\">\\r\\n            <div class=text>\\r\\n                <span class=\\"title\\">{title}</span>\\r\\n                <span class=caption>{caption}</span>\\r\\n            </div>\\r\\n        </li>\\r\\n        <li class=toggler>\\r\\n            <button on:click={()=>{closeAll(); active=!active}} title=\\"Toggle Button\\">\\r\\n                {#if !active}\\r\\n                <svg width=\\"1em\\" in:fly={{y:100, duration:300}}  xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 20 20\\" fill=\\"currentColor\\" color=\\"var(--brand)\\"><path fill-rule=\\"evenodd\\" d=\\"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z\\" clip-rule=\\"evenodd\\"></path></svg>\\r\\n                {:else}\\r\\n                <svg width=\\"1em\\" in:fly={{y:100, duration:300}}  xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 20 20\\" fill=\\"currentColor\\" color=\\"var(--brand)\\"><path fill-rule=\\"evenodd\\" d=\\"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z\\" clip-rule=\\"evenodd\\"></path></svg>\\r\\n                {/if}\\r\\n            </button>\\r\\n        </li>\\r\\n    </ul>\\r\\n    {#key active}\\r\\n    <menu class:mobile-show={active} transition:slide={{duration: 300}}>\\r\\n        <li>\\r\\n            <Submenu display='\u{1F3E0} Beranda' bind:scope bind:closeAll>\\r\\n                <li class=\\"link-like\\">\\r\\n                    <a href='{base}/home' on:click={close} rel=external>\u{1F3EB} Beranda</a>\\r\\n                </li>\\r\\n                <li class=\\"link-like\\">\\r\\n                    <a href='{base}/changepassword' on:click={close} rel=external>\u{1F511} Ganti Password</a>\\r\\n                </li>\\r\\n                <li class=\\"link-like\\">\\r\\n                    <a href='{base}/logout' on:click={close} rel=external>\u{1F6AA} Logout</a>\\r\\n                </li>\\r\\n            </Submenu>\\r\\n        </li>\\r\\n        <li>\\r\\n            <Submenu display='\u{1F4DD} Input' bind:scope>\\r\\n                <li>\\r\\n                    <p>\u{1F6A7} Under Construction</p>\\r\\n                </li>\\r\\n            </Submenu>\\r\\n        </li>\\r\\n        <li>\\r\\n            <Submenu display='\u{1F440} Lihat' bind:scope>\\r\\n                <li class=\\"link-like\\">\\r\\n                    <a href='{base}/nilai' on:click={close} rel=external>\u{1F4C4} Nilai</a>\\r\\n                </li>\\r\\n            </Submenu>\\r\\n        </li>\\r\\n        <li>\\r\\n            <Submenu display='\u{1F4C3} Pengajuan' bind:scope>\\r\\n                <li>\\r\\n                    <p>\u{1F6A7} Under Construction</p>\\r\\n                </li>\\r\\n            </Submenu>\\r\\n        </li>\\r\\n        <li>\\r\\n            <Submenu display=\\"\u{1F4F0} Artikel\\" bind:scope>\\r\\n                <li>\\r\\n                    <p>\u{1F6A7} Under Construction</p>\\r\\n                </li>\\r\\n\\r\\n            </Submenu>\\r\\n        </li>\\r\\n        <li>\\r\\n            <Submenu display='\u{1F517} Tautan' bind:scope>\\r\\n                <li class=\\"link-like\\">\\r\\n                    <a href='{base}/loker' on:click={close} rel=external>\u{1F3E2} Info Lowker</a>\\r\\n                </li>\\r\\n            </Submenu>\\r\\n        </li>\\r\\n\\r\\n    </menu>\\r\\n{/key}\\r\\n</header>\\r\\n\\r\\n\\r\\n<style>\\r\\n    :global(.blue){\\r\\n        background: blue;\\r\\n    }\\r\\n\\r\\n    *{\\r\\n        box-sizing: border-box;\\r\\n    }\\r\\n\\r\\n    a{\\r\\n        text-decoration: none;\\r\\n        color: var(--text);\\r\\n    }\\r\\n\\r\\n    a::before{\\r\\n        display: none;\\r\\n    }\\r\\n\\r\\n    .mobile-show{\\r\\n        display: block;\\r\\n    }\\r\\n\\r\\n    ul{\\r\\n        display: grid;\\r\\n        grid-template-columns: 80% 15%;\\r\\n        grid-gap: 3%;\\r\\n        padding: .5rem auto;\\r\\n        grid-template-rows: clamp(8vh, 120px, 15vh);\\r\\n    }\\r\\n\\r\\n    .toggler{\\r\\n        display: flex;\\r\\n        flex-direction: row-reverse;\\r\\n        overflow: hidden;\\r\\n    }\\r\\n\\r\\n\\r\\n    \\r\\n    .toggler>button{\\r\\n        font-size: 36px;\\r\\n        text-align: end;\\r\\n        background: transparent;\\r\\n        outline: 0;\\r\\n        border: 0;\\r\\n        cursor: pointer;\\r\\n        aspect-ratio: 1/1;\\r\\n        padding: 0;\\r\\n        width: min-content;\\r\\n\\r\\n    }\\r\\n\\r\\n    .header{\\r\\n        display: flex;\\r\\n        align-items: center;\\r\\n        gap: 1rem;\\r\\n        padding: 0 1rem;\\r\\n    }\\r\\n\\r\\n    .text{\\r\\n        display: flex;\\r\\n        flex-direction: column;\\r\\n    }\\r\\n\\r\\n    .header > img {\\r\\n        height: 60%;\\r\\n        width: auto;\\r\\n        cursor: pointer;\\r\\n    }\\r\\n\\r\\n    li{\\r\\n        list-style: none;\\r\\n    }\\r\\n\\r\\n    menu{\\r\\n        padding: 0 .5rem;\\r\\n        display: none;\\r\\n    }\\r\\n\\r\\n    menu>li{\\r\\n        padding: .25rem 0;\\r\\n        font-size: 18px;\\r\\n        border-top: 1px solid var(--overlay);\\r\\n    }\\r\\n\\r\\n    menu>li:first-child{\\r\\n        border: 0;\\r\\n    }\\r\\n\\r\\n    li li {\\r\\n        padding: 0 0.5rem;\\r\\n        font-size: 16px;\\r\\n        position: relative;\\r\\n    }\\r\\n\\r\\n    .title{\\r\\n        color: var(--brand);\\r\\n        font-size: clamp(1rem, .1rem + 1vw, 2.5rem);\\r\\n        font-weight: 700;\\r\\n    }\\r\\n\\r\\n    .caption{\\r\\n        color: var(--surface1);\\r\\n        background: var(--brand);\\r\\n        padding: .25rem;\\r\\n    }\\r\\n\\r\\n\\r\\n    @media (orientation: landscape) and (min-width:800px){\\r\\n        menu, .mobile-show{\\r\\n            display: flex;\\r\\n            justify-content: space-evenly;\\r\\n            border-radius: 0;\\r\\n            border: 0;\\r\\n        }\\r\\n\\r\\n        a::before{\\r\\n            display: absolute;\\r\\n        }\\r\\n\\r\\n        a:hover::before{\\r\\n          transform: scaleX(1);  \\r\\n        }\\r\\n\\r\\n        menu>li{\\r\\n            border: 0;\\r\\n            transition: background-color 300ms ease;\\r\\n        }\\r\\n\\r\\n        menu>li:hover{\\r\\n            background-color: rgba(0,0,0,.05);\\r\\n        }\\r\\n\\r\\n        .toggler{\\r\\n            display: none;\\r\\n        }\\r\\n        li li{\\r\\n            padding: .25rem;\\r\\n        }\\r\\n\\t\\r\\n        header{\\r\\n            max-width: 100% !important;\\r\\n            display: flex;\\r\\n            align-items: center;\\r\\n            justify-content: space-between;\\r\\n        }\\r\\n        ul{\\r\\n            grid-template-columns: 1fr;\\r\\n        }\\r\\n\\r\\n    }\\r\\n\\r\\n    header{\\r\\n        top: 0;\\r\\n        background: var(--surface1);\\r\\n        z-index: 99;\\r\\n        border-bottom: 2px solid var(--brand);\\r\\n        position: sticky;\\r\\n        user-select: none;\\r\\n    }\\r\\n\\r\\n\\r\\n</style>"],"names":[],"mappings":"AAiGY,KAAK,AAAC,CAAC,AACX,UAAU,CAAE,IAAI,AACpB,CAAC,AAED,8BAAC,CAAC,AACE,UAAU,CAAE,UAAU,AAC1B,CAAC,AAED,+BAAC,CAAC,AACE,eAAe,CAAE,IAAI,CACrB,KAAK,CAAE,IAAI,MAAM,CAAC,AACtB,CAAC,AAED,+BAAC,QAAQ,CAAC,AACN,OAAO,CAAE,IAAI,AACjB,CAAC,AAED,0CAAY,CAAC,AACT,OAAO,CAAE,KAAK,AAClB,CAAC,AAED,gCAAE,CAAC,AACC,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAC9B,QAAQ,CAAE,EAAE,CACZ,OAAO,CAAE,KAAK,CAAC,IAAI,CACnB,kBAAkB,CAAE,MAAM,GAAG,CAAC,CAAC,KAAK,CAAC,CAAC,IAAI,CAAC,AAC/C,CAAC,AAED,sCAAQ,CAAC,AACL,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,WAAW,CAC3B,QAAQ,CAAE,MAAM,AACpB,CAAC,AAID,uBAAQ,CAAC,qBAAM,CAAC,AACZ,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,GAAG,CACf,UAAU,CAAE,WAAW,CACvB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CACT,MAAM,CAAE,OAAO,CACf,YAAY,CAAE,CAAC,CAAC,CAAC,CACjB,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,WAAW,AAEtB,CAAC,AAED,qCAAO,CAAC,AACJ,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,CACT,OAAO,CAAE,CAAC,CAAC,IAAI,AACnB,CAAC,AAED,mCAAK,CAAC,AACF,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,AAC1B,CAAC,AAED,sBAAO,CAAG,GAAG,eAAC,CAAC,AACX,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,OAAO,AACnB,CAAC,AAED,gCAAE,CAAC,AACC,UAAU,CAAE,IAAI,AACpB,CAAC,AAED,kCAAI,CAAC,AACD,OAAO,CAAE,CAAC,CAAC,KAAK,CAChB,OAAO,CAAE,IAAI,AACjB,CAAC,AAED,mBAAI,CAAC,iBAAE,CAAC,AACJ,OAAO,CAAE,MAAM,CAAC,CAAC,CACjB,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,SAAS,CAAC,AACxC,CAAC,AAED,mBAAI,CAAC,iBAAE,YAAY,CAAC,AAChB,MAAM,CAAE,CAAC,AACb,CAAC,AAED,iBAAE,CAAC,EAAE,eAAC,CAAC,AACH,OAAO,CAAE,CAAC,CAAC,MAAM,CACjB,SAAS,CAAE,IAAI,CACf,QAAQ,CAAE,QAAQ,AACtB,CAAC,AAED,oCAAM,CAAC,AACH,KAAK,CAAE,IAAI,OAAO,CAAC,CACnB,SAAS,CAAE,MAAM,IAAI,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,MAAM,CAAC,CAC3C,WAAW,CAAE,GAAG,AACpB,CAAC,AAED,sCAAQ,CAAC,AACL,KAAK,CAAE,IAAI,UAAU,CAAC,CACtB,UAAU,CAAE,IAAI,OAAO,CAAC,CACxB,OAAO,CAAE,MAAM,AACnB,CAAC,AAGD,MAAM,AAAC,cAAc,SAAS,CAAC,CAAC,GAAG,CAAC,WAAW,KAAK,CAAC,CAAC,AAClD,kCAAI,CAAE,0CAAY,CAAC,AACf,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,YAAY,CAC7B,aAAa,CAAE,CAAC,CAChB,MAAM,CAAE,CAAC,AACb,CAAC,AAED,+BAAC,QAAQ,CAAC,AACN,OAAO,CAAE,QAAQ,AACrB,CAAC,AAED,+BAAC,MAAM,QAAQ,CAAC,AACd,SAAS,CAAE,OAAO,CAAC,CAAC,AACtB,CAAC,AAED,mBAAI,CAAC,iBAAE,CAAC,AACJ,MAAM,CAAE,CAAC,CACT,UAAU,CAAE,gBAAgB,CAAC,KAAK,CAAC,IAAI,AAC3C,CAAC,AAED,mBAAI,CAAC,iBAAE,MAAM,CAAC,AACV,gBAAgB,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,AACrC,CAAC,AAED,sCAAQ,CAAC,AACL,OAAO,CAAE,IAAI,AACjB,CAAC,AACD,iBAAE,CAAC,iBAAE,CAAC,AACF,OAAO,CAAE,MAAM,AACnB,CAAC,AAED,oCAAM,CAAC,AACH,SAAS,CAAE,IAAI,CAAC,UAAU,CAC1B,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,aAAa,AAClC,CAAC,AACD,gCAAE,CAAC,AACC,qBAAqB,CAAE,GAAG,AAC9B,CAAC,AAEL,CAAC,AAED,oCAAM,CAAC,AACH,GAAG,CAAE,CAAC,CACN,UAAU,CAAE,IAAI,UAAU,CAAC,CAC3B,OAAO,CAAE,EAAE,CACX,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,OAAO,CAAC,CACrC,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,IAAI,AACrB,CAAC"}`
};
var Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { caption = "" } = $$props;
  let active = false;
  let scope = new Map();
  let closeAll;
  const close = (_) => {
    closeAll();
    active = false;
  };
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.caption === void 0 && $$bindings.caption && caption !== void 0)
    $$bindings.caption(caption);
  if ($$props.close === void 0 && $$bindings.close && close !== void 0)
    $$bindings.close(close);
  $$result.css.add(css$c);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `

<header class="${"svelte-1wbdzra"}"><ul class="${"svelte-1wbdzra"}"><li class="${"header svelte-1wbdzra"}"><img src="${escape(base) + "/logo.webp"}" alt="${"logo"}" width="${"167"}" height="${"168"}" title="${"Logo STTM"}" class="${"svelte-1wbdzra"}">
            <div class="${"text svelte-1wbdzra"}"><span class="${"title svelte-1wbdzra"}">${escape(title)}</span>
                <span class="${"caption svelte-1wbdzra"}">${escape(caption)}</span></div></li>
        <li class="${"toggler svelte-1wbdzra"}"><button title="${"Toggle Button"}" class="${"svelte-1wbdzra"}">${!active ? `<svg width="${"1em"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}" fill="${"currentColor"}" color="${"var(--brand)"}" class="${"svelte-1wbdzra"}"><path fill-rule="${"evenodd"}" d="${"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"}" clip-rule="${"evenodd"}" class="${"svelte-1wbdzra"}"></path></svg>` : `<svg width="${"1em"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}" fill="${"currentColor"}" color="${"var(--brand)"}" class="${"svelte-1wbdzra"}"><path fill-rule="${"evenodd"}" d="${"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"}" clip-rule="${"evenodd"}" class="${"svelte-1wbdzra"}"></path></svg>`}</button></li></ul>
    <menu class="${["svelte-1wbdzra", active ? "mobile-show" : ""].join(" ").trim()}"><li class="${"svelte-1wbdzra"}">${validate_component(Submenu, "Submenu").$$render($$result, { display: "\u{1F3E0} Beranda", scope, closeAll }, {
      scope: ($$value) => {
        scope = $$value;
        $$settled = false;
      },
      closeAll: ($$value) => {
        closeAll = $$value;
        $$settled = false;
      }
    }, {
      default: () => `<li class="${"link-like svelte-1wbdzra"}"><a href="${escape(base) + "/home"}" rel="${"external"}" class="${"svelte-1wbdzra"}">\u{1F3EB} Beranda</a></li>
                <li class="${"link-like svelte-1wbdzra"}"><a href="${escape(base) + "/changepassword"}" rel="${"external"}" class="${"svelte-1wbdzra"}">\u{1F511} Ganti Password</a></li>
                <li class="${"link-like svelte-1wbdzra"}"><a href="${escape(base) + "/logout"}" rel="${"external"}" class="${"svelte-1wbdzra"}">\u{1F6AA} Logout</a></li>`
    })}</li>
        <li class="${"svelte-1wbdzra"}">${validate_component(Submenu, "Submenu").$$render($$result, { display: "\u{1F4DD} Input", scope }, {
      scope: ($$value) => {
        scope = $$value;
        $$settled = false;
      }
    }, {
      default: () => `<li class="${"svelte-1wbdzra"}"><p class="${"svelte-1wbdzra"}">\u{1F6A7} Under Construction</p></li>`
    })}</li>
        <li class="${"svelte-1wbdzra"}">${validate_component(Submenu, "Submenu").$$render($$result, { display: "\u{1F440} Lihat", scope }, {
      scope: ($$value) => {
        scope = $$value;
        $$settled = false;
      }
    }, {
      default: () => `<li class="${"link-like svelte-1wbdzra"}"><a href="${escape(base) + "/nilai"}" rel="${"external"}" class="${"svelte-1wbdzra"}">\u{1F4C4} Nilai</a></li>`
    })}</li>
        <li class="${"svelte-1wbdzra"}">${validate_component(Submenu, "Submenu").$$render($$result, { display: "\u{1F4C3} Pengajuan", scope }, {
      scope: ($$value) => {
        scope = $$value;
        $$settled = false;
      }
    }, {
      default: () => `<li class="${"svelte-1wbdzra"}"><p class="${"svelte-1wbdzra"}">\u{1F6A7} Under Construction</p></li>`
    })}</li>
        <li class="${"svelte-1wbdzra"}">${validate_component(Submenu, "Submenu").$$render($$result, { display: "\u{1F4F0} Artikel", scope }, {
      scope: ($$value) => {
        scope = $$value;
        $$settled = false;
      }
    }, {
      default: () => `<li class="${"svelte-1wbdzra"}"><p class="${"svelte-1wbdzra"}">\u{1F6A7} Under Construction</p></li>`
    })}</li>
        <li class="${"svelte-1wbdzra"}">${validate_component(Submenu, "Submenu").$$render($$result, { display: "\u{1F517} Tautan", scope }, {
      scope: ($$value) => {
        scope = $$value;
        $$settled = false;
      }
    }, {
      default: () => `<li class="${"link-like svelte-1wbdzra"}"><a href="${escape(base) + "/loker"}" rel="${"external"}" class="${"svelte-1wbdzra"}">\u{1F3E2} Info Lowker</a></li>`
    })}</li></menu>
</header>`;
  } while (!$$settled);
  return $$rendered;
});
var Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { description } = $$props;
  let close;
  let page;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${validate_component(PageHead, "PageHead").$$render($$result, { title, description }, {}, {})}

${validate_component(Navbar, "Navbar").$$render($$result, { title, caption: description, close }, {
      close: ($$value) => {
        close = $$value;
        $$settled = false;
      }
    }, {})}



<main${add_attribute("this", page, 1)}>${slots.default ? slots.default({}) : ``}</main>`;
  } while (!$$settled);
  return $$rendered;
});
var css$b = {
  code: "article.svelte-1j9j5sf{display:block;border-radius:8px 8px 0 0;overflow:hidden;border:var(--border);box-sizing:border-box}div.svelte-1j9j5sf{padding:1rem}div.svelte-1j9j5sf:first-of-type{background:var(--brand);color:white;font-size:18px;font-weight:500;border-bottom:2px solid var(--text)}",
  map: '{"version":3,"file":"TitledBox.svelte","sources":["TitledBox.svelte"],"sourcesContent":["<article  class={$$props.class}>\\r\\n    <div>{$$props.name}</div>\\r\\n    <div>\\r\\n        <slot></slot>\\r\\n    </div>\\r\\n</article>\\r\\n\\r\\n<style>\\r\\n    article{\\r\\n        display: block;\\r\\n        border-radius: 8px 8px 0 0;\\r\\n        overflow: hidden;\\r\\n        border: var(--border);\\r\\n        box-sizing: border-box;\\r\\n    }\\r\\n\\r\\n    div{\\r\\n        padding: 1rem;\\r\\n    }\\r\\n\\r\\n    div:first-of-type{\\r\\n        background: var(--brand);\\r\\n        color: white;\\r\\n        font-size: 18px;\\r\\n        font-weight: 500;\\r\\n        border-bottom: 2px solid var(--text);\\r\\n    }\\r\\n</style>\\r\\n\\r\\n"],"names":[],"mappings":"AAQI,sBAAO,CAAC,AACJ,OAAO,CAAE,KAAK,CACd,aAAa,CAAE,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAC1B,QAAQ,CAAE,MAAM,CAChB,MAAM,CAAE,IAAI,QAAQ,CAAC,CACrB,UAAU,CAAE,UAAU,AAC1B,CAAC,AAED,kBAAG,CAAC,AACA,OAAO,CAAE,IAAI,AACjB,CAAC,AAED,kBAAG,cAAc,CAAC,AACd,UAAU,CAAE,IAAI,OAAO,CAAC,CACxB,KAAK,CAAE,KAAK,CACZ,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,MAAM,CAAC,AACxC,CAAC"}'
};
var TitledBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$b);
  return `<article class="${escape(null_to_empty($$props.class)) + " svelte-1j9j5sf"}"><div class="${"svelte-1j9j5sf"}">${escape($$props.name)}</div>
    <div class="${"svelte-1j9j5sf"}">${slots.default ? slots.default({}) : ``}</div>
</article>`;
});
var getStores = () => {
  const stores = getContext("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session
  };
};
var error = (verb) => {
  throw new Error(`Can only ${verb} session store in browser`);
};
var session = {
  subscribe(fn) {
    const store = getStores().session;
    return store.subscribe(fn);
  },
  set: () => error("set"),
  update: () => error("update")
};
var css$a = {
  code: "@media(orientation:landscape) and (min-width:800px){.box-container{max-width:40%;min-width:600px;margin:0 auto}}.btn-container.svelte-10dvznl{display:flex;justify-content:flex-end;align-items:center;padding:1rem}.checkbox-container.svelte-10dvznl{padding-top:2rem;display:flex;align-items:center;gap:1rem}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script context=module>\\r\\n    import { loginRequired } from \\"$lib/scripts/helper\\";\\r\\n    export const load = loginRequired\\r\\n<\/script>\\r\\n\\r\\n\\r\\n<script>\\r\\nimport FormControl from \\"$lib/FormControl.svelte\\";\\r\\nimport Page from \\"$lib/Page.svelte\\";\\r\\nimport TitledBox from \\"$lib/TitledBox.svelte\\";\\r\\nimport { session } from \\"$app/stores\\";\\r\\n\\r\\nlet showpassword = false\\r\\n\\r\\nlet oldpass\\r\\nlet newpass\\r\\nlet confirmpass\\r\\n\\r\\n$: match = confirmpass==newpass \\r\\n$: indicator = (newpass && confirmpass) ? (match?'\u{1F604}':'\u{1F622}') : ''\\r\\n<\/script>\\r\\n\\r\\n\\r\\n<Page title='Ganti Password' description='Ganti Password'>\\r\\n        <TitledBox name='Ganti Password {indicator}' class='box-container'>\\r\\n            <FormControl>\\r\\n                <label for=username>Username</label>\\r\\n                <input type=\\"text\\" readonly value={$session.user} id=username>\\r\\n            </FormControl>\\r\\n            <FormControl>\\r\\n                <label for=oldpass>Password Lama</label>\\r\\n                <input type={showpassword?'text':'password'} id=oldpass on:input={e=>{oldpass=e.target.value}}>\\r\\n            </FormControl>\\r\\n            <FormControl>\\r\\n                <label for=newpass>Password Baru</label>\\r\\n                <input type={showpassword?'text':'password'} id=newpass on:input={e=>{newpass=e.target.value}}>\\r\\n            </FormControl>\\r\\n            <FormControl>\\r\\n                <label for=confirmpass>Konfirmasi Password</label>\\r\\n                <input type={showpassword?'text':'password'} id=confirmpass on:input={e=>{confirmpass=e.target.value}}>\\r\\n            </FormControl>\\r\\n            <div class=\\"checkbox-container\\">\\r\\n                <input type=checkbox id=showpassword on:click={()=>showpassword=!showpassword}>\\r\\n                <label for=showpassword>Tampilkan Password</label>\\r\\n            </div>\\r\\n            <div class=\\"btn-container\\">\\r\\n                <button>Proses</button>\\r\\n            </div>\\r\\n        </TitledBox>\\r\\n</Page>\\r\\n\\r\\n<style>\\r\\n\\r\\n    @media (orientation:landscape) and (min-width:800px){\\r\\n\\r\\n        :global(.box-container){\\r\\n            max-width: 40%;\\r\\n            min-width: 600px;\\r\\n            margin: 0 auto;\\r\\n        }\\r\\n/* \\r\\n        :global(main){\\r\\n            max-width: 100vw;\\r\\n        } */\\r\\n    }\\r\\n\\r\\n    .btn-container{\\r\\n        display: flex;\\r\\n        justify-content: flex-end;\\r\\n        align-items: center;\\r\\n        padding: 1rem;\\r\\n    }\\r\\n\\r\\n    .checkbox-container{\\r\\n        padding-top: 2rem;\\r\\n        display: flex;\\r\\n        align-items: center;\\r\\n        gap: 1rem;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAqDI,MAAM,AAAC,aAAa,SAAS,CAAC,CAAC,GAAG,CAAC,WAAW,KAAK,CAAC,CAAC,AAEzC,cAAc,AAAC,CAAC,AACpB,SAAS,CAAE,GAAG,CACd,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,CAAC,CAAC,IAAI,AAClB,CAAC,AAKL,CAAC,AAED,6BAAc,CAAC,AACX,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,QAAQ,CACzB,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,IAAI,AACjB,CAAC,AAED,kCAAmB,CAAC,AAChB,WAAW,CAAE,IAAI,CACjB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,AACb,CAAC"}`
};
var load$4 = loginRequired;
var Changepassword = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let indicator;
  let $session, $$unsubscribe_session;
  $$unsubscribe_session = subscribe(session, (value) => $session = value);
  $$result.css.add(css$a);
  indicator = "";
  $$unsubscribe_session();
  return `${validate_component(Page, "Page").$$render($$result, {
    title: "Ganti Password",
    description: "Ganti Password"
  }, {}, {
    default: () => `${validate_component(TitledBox, "TitledBox").$$render($$result, {
      name: "Ganti Password " + indicator,
      class: "box-container"
    }, {}, {
      default: () => `${validate_component(FormControl, "FormControl").$$render($$result, {}, {}, {
        default: () => `<label for="${"username"}">Username</label>
                <input type="${"text"}" readonly${add_attribute("value", $session.user, 0)} id="${"username"}">`
      })}
            ${validate_component(FormControl, "FormControl").$$render($$result, {}, {}, {
        default: () => `<label for="${"oldpass"}">Password Lama</label>
                <input${add_attribute("type", "password", 0)} id="${"oldpass"}">`
      })}
            ${validate_component(FormControl, "FormControl").$$render($$result, {}, {}, {
        default: () => `<label for="${"newpass"}">Password Baru</label>
                <input${add_attribute("type", "password", 0)} id="${"newpass"}">`
      })}
            ${validate_component(FormControl, "FormControl").$$render($$result, {}, {}, {
        default: () => `<label for="${"confirmpass"}">Konfirmasi Password</label>
                <input${add_attribute("type", "password", 0)} id="${"confirmpass"}">`
      })}
            <div class="${"checkbox-container svelte-10dvznl"}"><input type="${"checkbox"}" id="${"showpassword"}">
                <label for="${"showpassword"}">Tampilkan Password</label></div>
            <div class="${"btn-container svelte-10dvznl"}"><button>Proses</button></div>`
    })}`
  })}`;
});
var index$6 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Changepassword,
  load: load$4
});
var css$9 = {
  code: "div.svelte-1cz4rkk>.svelte-1cz4rkk{margin-bottom:1rem}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script>\\r\\nimport PageHead from \\"$lib/PageHead.svelte\\";\\r\\n\\r\\n<\/script>\\r\\n<PageHead title=test description='test input'></PageHead>\\r\\n\\r\\n<div>\\r\\n\\r\\n    <label for=\\"\\">bababu</label>\\r\\n    <input type=\\"text\\">\\r\\n    <input type=\\"tel\\">\\r\\n    <input type=\\"time\\">\\r\\n    <input type=\\"date\\">\\r\\n    <input type=\\"datetime\\">\\r\\n    <input type=\\"datetime-local\\">\\r\\n    <input type=\\"number\\">\\r\\n    <input type=\\"search\\">\\r\\n    <input type=\\"week\\">\\r\\n    <input type=\\"month\\">\\r\\n    <input type=\\"password\\">\\r\\n    <input type=\\"email\\">\\r\\n    <input type=\\"range\\">\\r\\n\\r\\n\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n    div> *{\\r\\n        margin-bottom: 1rem;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AA2BI,kBAAG,CAAE,eAAC,CAAC,AACH,aAAa,CAAE,IAAI,AACvB,CAAC"}`
};
var Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$9);
  return `${validate_component(PageHead, "PageHead").$$render($$result, { title: "test", description: "test input" }, {}, {})}

<div class="${"svelte-1cz4rkk"}"><label for="${""}" class="${"svelte-1cz4rkk"}">bababu</label>
    <input type="${"text"}" class="${"svelte-1cz4rkk"}">
    <input type="${"tel"}" class="${"svelte-1cz4rkk"}">
    <input type="${"time"}" class="${"svelte-1cz4rkk"}">
    <input type="${"date"}" class="${"svelte-1cz4rkk"}">
    <input type="${"datetime"}" class="${"svelte-1cz4rkk"}">
    <input type="${"datetime-local"}" class="${"svelte-1cz4rkk"}">
    <input type="${"number"}" class="${"svelte-1cz4rkk"}">
    <input type="${"search"}" class="${"svelte-1cz4rkk"}">
    <input type="${"week"}" class="${"svelte-1cz4rkk"}">
    <input type="${"month"}" class="${"svelte-1cz4rkk"}">
    <input type="${"password"}" class="${"svelte-1cz4rkk"}">
    <input type="${"email"}" class="${"svelte-1cz4rkk"}">
    <input type="${"range"}" class="${"svelte-1cz4rkk"}">


</div>`;
});
var index$5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Input
});
var css$8 = {
  code: "label.svelte-1xphgov.svelte-1xphgov{margin-bottom:.5em}input.svelte-1xphgov.svelte-1xphgov{width:100%}main{height:100vh;position:relative;display:grid;place-items:center}main.svelte-1xphgov.svelte-1xphgov::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;z-index:-1;background-image:var(--bg);background-repeat:no-repeat;background-position:center;background-size:cover;filter:brightness(.8) blur(4px);transition:filter 400ms ease}main.transparent.svelte-1xphgov.svelte-1xphgov::before{filter:brightness(1) blur(0)}main.transparent.svelte-1xphgov form.svelte-1xphgov{opacity:.005}main.svelte-1xphgov form.svelte-1xphgov{border-radius:8px;background:rgba(255,255,255,.9);margin:.5em;box-shadow:var(--shadow) ;max-width:90vw;max-height:96%;overflow:auto;will-change:opacity;transition-delay:300ms;transition:opacity 300ms ease;border:var(--border)}@media(prefers-color-scheme: dark){main.svelte-1xphgov.svelte-1xphgov::before{filter:brightness(.2) blur(4px)}main.transparent.svelte-1xphgov.svelte-1xphgov::before{filter:brightness(.2) blur(0)}main.svelte-1xphgov form.svelte-1xphgov{background:rgba(0,0,0,.3)}}.info.svelte-1xphgov.svelte-1xphgov{display:flex;flex-direction:column}.footer.svelte-1xphgov>.links.svelte-1xphgov{margin-top:1em;display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;white-space:nowrap}label.svelte-1xphgov.svelte-1xphgov{font-weight:600}.control.svelte-1xphgov.svelte-1xphgov{margin:.5em;margin-top:0}.header.svelte-1xphgov.svelte-1xphgov{display:flex;flex-direction:column;align-items:center;padding:.5rem;text-align:center;margin-bottom:1.5rem;background:var(--brand)}.header.svelte-1xphgov>span.svelte-1xphgov{margin-top:0}.logo.svelte-1xphgov>svg.svelte-1xphgov{font-size:48px}.footer.svelte-1xphgov.svelte-1xphgov{padding:1em;text-align:center;display:flex;flex-direction:column;gap:.5em;align-content:center;font-size:.85rem;padding-bottom:2rem}.submit.svelte-1xphgov.svelte-1xphgov{background:var(--brand);color:var(--surface1);border-radius:4px;padding:.5em 1em;transition:box-shadow 300ms linear;cursor:pointer;margin:.5em;margin-top:1em;width:calc(100% - 1em);font-size:16px}.submit.svelte-1xphgov.svelte-1xphgov:hover{box-shadow:var(--shadow)}a.svelte-1xphgov svg.svelte-1xphgov{width:1em;vertical-align:bottom}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script context=module>\\n    import { redirectIfLoggedIn } from '$lib/scripts/helper';\\n    export const load = redirectIfLoggedIn\\n<\/script>\\n\\n<script>\\nimport {base} from '$app/paths'\\nimport PageHead from '$lib/PageHead.svelte';\\nimport { hash } from '$lib/scripts/helper';\\n\\nlet username\\nlet password\\nlet error\\n\\n\\nasync function login() {\\n\\tif(!(username && password)) return error = 'please fill all field'\\n\\terror = ''\\n\\t\\n\\tconst req = await fetch(base+'/auth', {\\n\\t\\tmethod: 'POST',\\n\\t\\tbody: JSON.stringify({\\n\\t\\t\\tusername: hash(username),\\n\\t\\t\\tpassword: hash(password)\\n\\t\\t}),\\n\\t\\theaders:{\\n\\t\\t\\t'content-type': 'application/json'\\n\\t\\t}\\n\\t})\\n\\n\\tconst res = await req.json()\\n\\terror = res.error\\n\\tif(res.authenticated) window.location = base+'/home'\\n}\\n\\n$: password, error=''\\n$: username, error=''\\nlet menu\\nlet hide=false\\nlet timer\\n\\n<\/script>\\n\\n\\n<svelte:body on:keyup={e=>{if(e.key=='Enter') login()}} />\\n\\n<PageHead title=Login description='Halaman Login'>\\n</PageHead>\\n\\n<main bind:this=\\"{menu}\\" on:pointerdown={e=>timer = setTimeout(()=>hide=e.target==menu, 400)} on:pointerup={()=>{hide=false; clearTimeout(timer);}} class:transparent={hide} style=\\"--bg:url({base}/sttm.webp)\\">\\n\\t<form>\\n\\t\\t<div class='header'>\\n\\t\\t\\t<span class=\\"logo\\">\\n\\t\\t\\t\\t<svg width=\\"48\\" height=\\"48\\" xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 20 20\\" fill=\\"white\\"><path d=\\"M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zm5.99 7.176A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z\\"></path></svg>\\n\\t\\t\\t</span>\\n\\t\\t\\t<h1 style=\\"color: white; font-size: 1.1rem;\\">\\n\\t\\t\\t\\tSISTEM AKADEMIK - STTM CILEUNGSI\\n\\t\\t\\t</h1>\\n\\t\\t\\t<span style=\\"color: white;\\">SSO - Form Login</span>\\n\\t\\t</div>\\n\\t\\t<div class='main'>\\n\\t\\t\\t<div class=\\"control\\">\\n\\t\\t\\t\\t<label for=\\"username\\">Nama Pengguna</label>\\n\\t\\t\\t\\t<input id=\\"username\\" type=\\"text\\" placeholder=\\"Username\\" bind:value={username} name=\\"username\\" required autocomplete=\\"off\\">\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"control\\">\\n\\t\\t\\t\\t<label for=\\"password\\">Password</label>\\n\\t\\t\\t\\t<input id=\\"password\\" type=\\"password\\" placeholder=\\"Password\\" bind:value={password} name=\\"password\\" required>\\n\\t\\t\\t</div>\\n\\t\\t\\t{#if error}\\n\\t\\t\\t<div style=\\"text-align: center;\\">\\n\\t\\t\\t\\t<strong style=\\" color: #d45;\\">{error}</strong>\\n\\t\\t\\t</div>\\n\\t\\t\\t{/if}\\n\\t\\t\\t<button type=\\"button\\" class=\\"submit\\" on:click={login}>\\n\\t\\t\\t\\tLogin\\n\\t\\t\\t</button>\\n\\t\\t\\t<hr>\\n\\t\\t</div>\\n\\t\\t<div class=\\"footer\\">\\n\\t\\t\\t<div class=\\"info\\">\\n\\t\\t\\t\\t<b>Sekolah Tinggi Teknologi Muhammadiyah Cileungsi</b>\\n                <address>\\n\\t\\t\\t\\t\\t<em>Perum PT.SC Jl.Anggrek No.25 Cileungsi-Bogor 16820  <a href=\\"tel:021-82495502\\">021-82495502</a></em>\\n                    <br>\\n                    <em>All Right Reserved by : <a href=\\"https://github.com/fmented/ak-clone\\">Fmented and ...</a> - 2021</em>\\n                </address>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"links\\">\\n\\t\\t\\t\\t<a href=\\"/\\" rel=external><svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 20 20\\" fill=\\"currentColor\\" ><path d=\\"M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z\\"></path></svg> Menu Utama</a>\\n\\t\\t\\t\\t<a href=\\"/\\" rel=external><svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\" fill=\\"currentColor\\"><path d=\\"M3.5 3.75a.25.25 0 01.25-.25h13.5a.25.25 0 01.25.25v10a.75.75 0 001.5 0v-10A1.75 1.75 0 0017.25 2H3.75A1.75 1.75 0 002 3.75v16.5c0 .966.784 1.75 1.75 1.75h7a.75.75 0 000-1.5h-7a.25.25 0 01-.25-.25V3.75z\\"></path><path d=\\"M6.25 7a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm-.75 4.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm16.28 4.53a.75.75 0 10-1.06-1.06l-4.97 4.97-1.97-1.97a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5.5-5.5z\\"></path></svg> e-Learning</a>\\n\\t\\t\\t\\t<a href=\\"/\\" rel=external><svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\" fill=\\"currentColor\\" ><path d=\\"M0 0h24v24H0z\\" fill=\\"none\\"></path><path d=\\"M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z\\"></path></svg> e-Perpus</a>\\n\\t\\t\\t\\t<a href=\\"/\\" rel=external><svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 20 20\\" fill=\\"currentColor\\"><path d=\\"M4 3a2 2 0 100 4h12a2 2 0 100-4H4z\\"></path><path fill-rule=\\"evenodd\\" d=\\"M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z\\" clip-rule=\\"evenodd\\"></path></svg> e-Arsip</a>\\n\\t\\t\\t\\t<a href=\\"/\\" rel=external><svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 20 20\\" fill=\\"currentColor\\"><path d=\\"M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zm5.99 7.176A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z\\"></path></svg> e-Alumni</a>\\n\\t\\t\\t</div >\\n\\t\\t</div>\\n\\t</form>\\n</main>\\n\\t\\n<style>\\n\\t\\n\\tlabel{\\n\\t\\tmargin-bottom: .5em;\\n    }\\n\\n\\tinput{\\n\\t\\twidth: 100%;\\n\\t}\\n\\t\\n\\t:global(main){\\n\\t\\theight:100vh;\\n\\t\\tposition:relative;\\n\\t\\tdisplay:grid;\\n\\t\\tplace-items:center;\\n\\t}\\n\\n\\n\\tmain::before{\\n\\t\\tcontent: '';\\n\\t\\tposition: absolute;\\n\\t\\ttop: 0;\\n\\t\\tleft: 0;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\tz-index: -1;\\n\\t\\tbackground-image: var(--bg);\\n        background-repeat: no-repeat;\\n        background-position: center;\\n        background-size: cover;\\n\\t\\tfilter: brightness(.8) blur(4px);\\n\\t\\ttransition: filter 400ms ease;\\n\\t}\\n\\n\\tmain.transparent::before{\\n\\t\\tfilter: brightness(1) blur(0);\\n\\t}\\n\\n\\tmain.transparent form{\\n\\t\\topacity: .005;\\n\\t}\\n\\n\\tmain form{\\n\\t\\tborder-radius:8px;\\n\\t\\tbackground: rgba(255,255,255,.9);\\n\\t\\tmargin:.5em;\\n\\t\\tbox-shadow: var(--shadow) ;\\n        max-width: 90vw;\\n\\t\\tmax-height: 96%;\\n\\t\\toverflow: auto;\\n\\t\\twill-change: opacity;\\n\\t\\ttransition-delay: 300ms;\\n\\t\\ttransition: opacity 300ms ease;\\n\\t\\tborder: var(--border);\\n\\t}\\n\\t\\n\\n\\t@media(prefers-color-scheme: dark){\\n\\t\\tmain::before{\\n\\t\\t\\tfilter: brightness(.2) blur(4px);\\n\\t\\t}\\n\\n\\t\\tmain.transparent::before{\\n\\t\\tfilter: brightness(.2) blur(0);\\n\\t}\\n\\n\\t\\tmain form{\\n\\t\\t\\tbackground: rgba(0,0,0,.3);\\n\\t\\t}\\n\\t}\\n\\t\\n\\t.info{\\n\\t\\tdisplay:flex;\\n\\t\\tflex-direction:column;\\n\\t}\\n\\t\\n\\t.footer>.links{\\n\\t\\tmargin-top:1em;\\n\\t\\tdisplay: flex;\\n\\t\\tflex-wrap: wrap;\\n\\t\\tgap: .5rem;\\n\\t\\tjustify-content: center;\\n\\t\\twhite-space: nowrap;\\n\\t}\\n\\t\\n\\t\\n\\tlabel{\\n\\t\\tfont-weight:600;\\n\\t}\\n\\n\\t\\n\\t.control{\\n        margin:.5em;\\n        margin-top:0;\\n\\t}\\n\\t\\n\\t.header{\\n\\t\\tdisplay:flex;\\n\\t\\tflex-direction:column;\\n\\t\\talign-items:center;\\n\\t\\tpadding:.5rem;\\n\\t\\ttext-align:center;\\n\\t\\tmargin-bottom:1.5rem;\\n\\t\\tbackground:var(--brand);\\n\\t}\\n\\t\\n\\n    .header>span{\\n        margin-top: 0;\\n    }\\n\\t\\n\\t.logo > svg{\\n\\t\\tfont-size:48px;\\n\\t}\\n\\t\\n\\t.footer{\\n\\t\\tpadding:1em;\\n\\t\\ttext-align:center;\\n\\t\\tdisplay:flex;\\n\\t\\tflex-direction:column;\\n\\t\\tgap:.5em;\\n\\t\\talign-content: center;\\n\\t\\tfont-size: .85rem;\\n\\t\\tpadding-bottom: 2rem;\\n\\t}\\n\\t\\n\\t\\n\\t\\t.submit{\\n\\t\\tbackground:var(--brand);\\n\\t\\tcolor:var(--surface1);\\n\\t\\tborder-radius:4px;\\n\\t\\tpadding:.5em 1em;\\n\\t\\ttransition: box-shadow 300ms linear;\\n\\t\\tcursor:pointer;\\n\\t\\tmargin:.5em;\\n\\t\\tmargin-top:1em;\\n\\t\\twidth:calc(100% - 1em);\\n        font-size: 16px;\\n\\t}\\n\\t\\n\\t.submit:hover{\\n\\t\\tbox-shadow: var(--shadow);\\n\\t}\\n\\n\\ta svg{\\n\\t\\twidth: 1em;\\n\\t\\tvertical-align: bottom;\\n\\t}\\n\\n\\n</style>"],"names":[],"mappings":"AAqGC,mCAAK,CAAC,AACL,aAAa,CAAE,IAAI,AACjB,CAAC,AAEJ,mCAAK,CAAC,AACL,KAAK,CAAE,IAAI,AACZ,CAAC,AAEO,IAAI,AAAC,CAAC,AACb,OAAO,KAAK,CACZ,SAAS,QAAQ,CACjB,QAAQ,IAAI,CACZ,YAAY,MAAM,AACnB,CAAC,AAGD,kCAAI,QAAQ,CAAC,AACZ,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,EAAE,CACX,gBAAgB,CAAE,IAAI,IAAI,CAAC,CACrB,iBAAiB,CAAE,SAAS,CAC5B,mBAAmB,CAAE,MAAM,CAC3B,eAAe,CAAE,KAAK,CAC5B,MAAM,CAAE,WAAW,EAAE,CAAC,CAAC,KAAK,GAAG,CAAC,CAChC,UAAU,CAAE,MAAM,CAAC,KAAK,CAAC,IAAI,AAC9B,CAAC,AAED,IAAI,0CAAY,QAAQ,CAAC,AACxB,MAAM,CAAE,WAAW,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AAC9B,CAAC,AAED,IAAI,2BAAY,CAAC,mBAAI,CAAC,AACrB,OAAO,CAAE,IAAI,AACd,CAAC,AAED,mBAAI,CAAC,mBAAI,CAAC,AACT,cAAc,GAAG,CACjB,UAAU,CAAE,KAAK,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,EAAE,CAAC,CAChC,OAAO,IAAI,CACX,UAAU,CAAE,IAAI,QAAQ,CAAC,CAAC,CACpB,SAAS,CAAE,IAAI,CACrB,UAAU,CAAE,GAAG,CACf,QAAQ,CAAE,IAAI,CACd,WAAW,CAAE,OAAO,CACpB,gBAAgB,CAAE,KAAK,CACvB,UAAU,CAAE,OAAO,CAAC,KAAK,CAAC,IAAI,CAC9B,MAAM,CAAE,IAAI,QAAQ,CAAC,AACtB,CAAC,AAGD,MAAM,uBAAuB,IAAI,CAAC,CAAC,AAClC,kCAAI,QAAQ,CAAC,AACZ,MAAM,CAAE,WAAW,EAAE,CAAC,CAAC,KAAK,GAAG,CAAC,AACjC,CAAC,AAED,IAAI,0CAAY,QAAQ,CAAC,AACzB,MAAM,CAAE,WAAW,EAAE,CAAC,CAAC,KAAK,CAAC,CAAC,AAC/B,CAAC,AAEA,mBAAI,CAAC,mBAAI,CAAC,AACT,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,AAC3B,CAAC,AACF,CAAC,AAED,mCAAK,CAAC,AACL,QAAQ,IAAI,CACZ,eAAe,MAAM,AACtB,CAAC,AAED,sBAAO,CAAC,qBAAM,CAAC,AACd,WAAW,GAAG,CACd,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,GAAG,CAAE,KAAK,CACV,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,AACpB,CAAC,AAGD,mCAAK,CAAC,AACL,YAAY,GAAG,AAChB,CAAC,AAGD,sCAAQ,CAAC,AACF,OAAO,IAAI,CACX,WAAW,CAAC,AACnB,CAAC,AAED,qCAAO,CAAC,AACP,QAAQ,IAAI,CACZ,eAAe,MAAM,CACrB,YAAY,MAAM,CAClB,QAAQ,KAAK,CACb,WAAW,MAAM,CACjB,cAAc,MAAM,CACpB,WAAW,IAAI,OAAO,CAAC,AACxB,CAAC,AAGE,sBAAO,CAAC,mBAAI,CAAC,AACT,UAAU,CAAE,CAAC,AACjB,CAAC,AAEJ,oBAAK,CAAG,kBAAG,CAAC,AACX,UAAU,IAAI,AACf,CAAC,AAED,qCAAO,CAAC,AACP,QAAQ,GAAG,CACX,WAAW,MAAM,CACjB,QAAQ,IAAI,CACZ,eAAe,MAAM,CACrB,IAAI,IAAI,CACR,aAAa,CAAE,MAAM,CACrB,SAAS,CAAE,MAAM,CACjB,cAAc,CAAE,IAAI,AACrB,CAAC,AAGA,qCAAO,CAAC,AACR,WAAW,IAAI,OAAO,CAAC,CACvB,MAAM,IAAI,UAAU,CAAC,CACrB,cAAc,GAAG,CACjB,QAAQ,IAAI,CAAC,GAAG,CAChB,UAAU,CAAE,UAAU,CAAC,KAAK,CAAC,MAAM,CACnC,OAAO,OAAO,CACd,OAAO,IAAI,CACX,WAAW,GAAG,CACd,MAAM,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CAChB,SAAS,CAAE,IAAI,AACtB,CAAC,AAED,qCAAO,MAAM,CAAC,AACb,UAAU,CAAE,IAAI,QAAQ,CAAC,AAC1B,CAAC,AAED,gBAAC,CAAC,kBAAG,CAAC,AACL,KAAK,CAAE,GAAG,CACV,cAAc,CAAE,MAAM,AACvB,CAAC"}`
};
var load$3 = redirectIfLoggedIn;
var Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let username;
  let password;
  let error2;
  let menu;
  $$result.css.add(css$8);
  {
    error2 = "";
  }
  {
    error2 = "";
  }
  return `

${validate_component(PageHead, "PageHead").$$render($$result, {
    title: "Login",
    description: "Halaman Login"
  }, {}, {})}

<main style="${"--bg:url(" + escape(base) + "/sttm.webp)"}" class="${["svelte-1xphgov", ""].join(" ").trim()}"${add_attribute("this", menu, 1)}><form class="${"svelte-1xphgov"}"><div class="${"header svelte-1xphgov"}"><span class="${"logo svelte-1xphgov"}"><svg width="${"48"}" height="${"48"}" xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}" fill="${"white"}" class="${"svelte-1xphgov"}"><path d="${"M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zm5.99 7.176A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"}"></path></svg></span>
			<h1 style="${"color: white; font-size: 1.1rem;"}">SISTEM AKADEMIK - STTM CILEUNGSI
			</h1>
			<span style="${"color: white;"}" class="${"svelte-1xphgov"}">SSO - Form Login</span></div>
		<div class="${"main"}"><div class="${"control svelte-1xphgov"}"><label for="${"username"}" class="${"svelte-1xphgov"}">Nama Pengguna</label>
				<input id="${"username"}" type="${"text"}" placeholder="${"Username"}" name="${"username"}" required autocomplete="${"off"}" class="${"svelte-1xphgov"}"${add_attribute("value", username, 1)}></div>
			<div class="${"control svelte-1xphgov"}"><label for="${"password"}" class="${"svelte-1xphgov"}">Password</label>
				<input id="${"password"}" type="${"password"}" placeholder="${"Password"}" name="${"password"}" required class="${"svelte-1xphgov"}"${add_attribute("value", password, 1)}></div>
			${error2 ? `<div style="${"text-align: center;"}"><strong style="${" color: #d45;"}">${escape(error2)}</strong></div>` : ``}
			<button type="${"button"}" class="${"submit svelte-1xphgov"}">Login
			</button>
			<hr></div>
		<div class="${"footer svelte-1xphgov"}"><div class="${"info svelte-1xphgov"}"><b>Sekolah Tinggi Teknologi Muhammadiyah Cileungsi</b>
                <address><em>Perum PT.SC Jl.Anggrek No.25 Cileungsi-Bogor 16820  <a href="${"tel:021-82495502"}">021-82495502</a></em>
                    <br>
                    <em>All Right Reserved by : <a href="${"https://github.com/fmented/ak-clone"}">Fmented and ...</a> - 2021</em></address></div>
			<div class="${"links svelte-1xphgov"}"><a href="${"/"}" rel="${"external"}" class="${"svelte-1xphgov"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}" fill="${"currentColor"}" class="${"svelte-1xphgov"}"><path d="${"M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"}"></path></svg> Menu Utama</a>
				<a href="${"/"}" rel="${"external"}" class="${"svelte-1xphgov"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}" fill="${"currentColor"}" class="${"svelte-1xphgov"}"><path d="${"M3.5 3.75a.25.25 0 01.25-.25h13.5a.25.25 0 01.25.25v10a.75.75 0 001.5 0v-10A1.75 1.75 0 0017.25 2H3.75A1.75 1.75 0 002 3.75v16.5c0 .966.784 1.75 1.75 1.75h7a.75.75 0 000-1.5h-7a.25.25 0 01-.25-.25V3.75z"}"></path><path d="${"M6.25 7a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm-.75 4.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm16.28 4.53a.75.75 0 10-1.06-1.06l-4.97 4.97-1.97-1.97a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5.5-5.5z"}"></path></svg> e-Learning</a>
				<a href="${"/"}" rel="${"external"}" class="${"svelte-1xphgov"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 24 24"}" fill="${"currentColor"}" class="${"svelte-1xphgov"}"><path d="${"M0 0h24v24H0z"}" fill="${"none"}"></path><path d="${"M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"}"></path></svg> e-Perpus</a>
				<a href="${"/"}" rel="${"external"}" class="${"svelte-1xphgov"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}" fill="${"currentColor"}" class="${"svelte-1xphgov"}"><path d="${"M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"}"></path><path fill-rule="${"evenodd"}" d="${"M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"}" clip-rule="${"evenodd"}"></path></svg> e-Arsip</a>
				<a href="${"/"}" rel="${"external"}" class="${"svelte-1xphgov"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" viewBox="${"0 0 20 20"}" fill="${"currentColor"}" class="${"svelte-1xphgov"}"><path d="${"M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zm5.99 7.176A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"}"></path></svg> e-Alumni</a></div></div></form>
</main>`;
});
var index$4 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Login,
  load: load$3
});
var css$7 = {
  code: "aside.svelte-ow4lkc{position:fixed;top:0;left:0;width:100%;height:100%;display:grid;place-items:center;background:rgba(0,0,0,.7);backdrop-filter:blur(4px);z-index:99;box-shadow:var(--shadow)}article.svelte-ow4lkc{min-width:340px;max-width:96%;min-height:20%;max-height:90%;display:grid;grid-template-rows:auto 1fr auto}.head.svelte-ow4lkc,.action.svelte-ow4lkc,.content.svelte-ow4lkc{border:2px solid var(--text)}.head.svelte-ow4lkc{border-radius:8px 8px 0 0;display:flex;justify-content:space-between;align-items:center;background:var(--brand);font-size:large;font-weight:600;color:var(--surface1)}.action.svelte-ow4lkc{border-radius:0 0 8px 8px;display:flex;justify-content:flex-end;align-items:center;gap:.5rem;border-top:0}.content.svelte-ow4lkc{padding:1rem;border-bottom:0;max-height:100%;overflow-y:auto;padding-inline-end:4px}.content.svelte-ow4lkc,.action.svelte-ow4lkc{background-color:var(--surface1)}.head.svelte-ow4lkc,.action.svelte-ow4lkc{padding:1rem}@media(orientation: landscape){article.svelte-ow4lkc{max-width:450px}}",
  map: `{"version":3,"file":"Modal.svelte","sources":["Modal.svelte"],"sourcesContent":["<script>\\n    import {fade, fly} from 'svelte/transition'\\n    import {onMount} from 'svelte'\\n\\n    export let active = false\\n    let modal\\n\\n    let doc\\n\\n    onMount(()=>doc = document)\\n\\n    function teleport(el) {\\n        document.body.appendChild(el)\\n    }\\n\\n    export const close = ()=>active=false\\n\\n    $: if(doc && active) doc.body.style.overflow = 'hidden'\\n    $: if(doc && !active) doc.body.style.overflow = 'auto'\\n\\n<\/script>\\n\\n\\n{#if active}\\n<aside on:click={e=>{\\n    const path = e.path || (e.composedPath && e.composedPath())\\n    if([...path].includes(modal)) return\\n    active = false\\n    }} transition:fade use:teleport>\\n    <article bind:this={modal} in:fly={{y:-100}} out:fade>\\n        <div class=head>\\n            <slot name=head></slot>\\n        </div>\\n        <div class=content>\\n                <slot name=content></slot>\\n        </div>\\n        <div class=action>\\n            <slot name=action close={close}></slot>\\n        </div>\\n    </article>\\n</aside>\\n{/if}\\n\\n<style>\\n    aside{\\n        position: fixed;\\n        top:0;\\n        left: 0;\\n        width: 100%;\\n        height: 100%;\\n        display: grid;\\n        place-items: center;\\n        background: rgba(0,0,0,.7);\\n        backdrop-filter: blur(4px);\\n        z-index: 99;\\n        box-shadow: var(--shadow);\\n    }\\n\\n    article{\\n        min-width: 340px;\\n        max-width: 96%;\\n        min-height: 20%;\\n        max-height: 90%;\\n        display: grid;\\n        grid-template-rows: auto 1fr auto;\\n    }\\n\\n    \\n    .head, .action, .content{\\n        border: 2px solid var(--text);\\n    }\\n\\n    .head{\\n        border-radius: 8px 8px 0 0;\\n        display: flex;\\n        justify-content: space-between;\\n        align-items: center;\\n        background: var(--brand);\\n        font-size: large;\\n        font-weight: 600;\\n        color: var(--surface1);\\n    }\\n\\n    .action{\\n        border-radius: 0 0 8px 8px;\\n        display: flex;\\n        justify-content: flex-end;\\n        align-items: center;\\n        gap: .5rem;\\n        border-top: 0;\\n    }\\n\\n    .content{\\n        padding: 1rem;\\n        border-bottom: 0;\\n        max-height: 100%;\\n        overflow-y: auto;\\n        padding-inline-end: 4px;\\n    }\\n\\n    .content, .action{\\n        background-color: var(--surface1);\\n    }\\n\\n    .head, .action{   \\n        padding: 1rem;\\n    }\\n\\n    @media (orientation: landscape){\\n        article{\\n            max-width: 450px;\\n        }\\n    }\\n\\n\\n</style>"],"names":[],"mappings":"AA4CI,mBAAK,CAAC,AACF,QAAQ,CAAE,KAAK,CACf,IAAI,CAAC,CACL,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAC1B,eAAe,CAAE,KAAK,GAAG,CAAC,CAC1B,OAAO,CAAE,EAAE,CACX,UAAU,CAAE,IAAI,QAAQ,CAAC,AAC7B,CAAC,AAED,qBAAO,CAAC,AACJ,SAAS,CAAE,KAAK,CAChB,SAAS,CAAE,GAAG,CACd,UAAU,CAAE,GAAG,CACf,UAAU,CAAE,GAAG,CACf,OAAO,CAAE,IAAI,CACb,kBAAkB,CAAE,IAAI,CAAC,GAAG,CAAC,IAAI,AACrC,CAAC,AAGD,mBAAK,CAAE,qBAAO,CAAE,sBAAQ,CAAC,AACrB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,MAAM,CAAC,AACjC,CAAC,AAED,mBAAK,CAAC,AACF,aAAa,CAAE,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAC1B,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,IAAI,OAAO,CAAC,CACxB,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,IAAI,UAAU,CAAC,AAC1B,CAAC,AAED,qBAAO,CAAC,AACJ,aAAa,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,GAAG,CAC1B,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,QAAQ,CACzB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,KAAK,CACV,UAAU,CAAE,CAAC,AACjB,CAAC,AAED,sBAAQ,CAAC,AACL,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,CAAC,CAChB,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,IAAI,CAChB,kBAAkB,CAAE,GAAG,AAC3B,CAAC,AAED,sBAAQ,CAAE,qBAAO,CAAC,AACd,gBAAgB,CAAE,IAAI,UAAU,CAAC,AACrC,CAAC,AAED,mBAAK,CAAE,qBAAO,CAAC,AACX,OAAO,CAAE,IAAI,AACjB,CAAC,AAED,MAAM,AAAC,cAAc,SAAS,CAAC,CAAC,AAC5B,qBAAO,CAAC,AACJ,SAAS,CAAE,KAAK,AACpB,CAAC,AACL,CAAC"}`
};
var Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = false } = $$props;
  let modal;
  let doc;
  onMount(() => doc = document);
  const close = () => active = false;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.close === void 0 && $$bindings.close && close !== void 0)
    $$bindings.close(close);
  $$result.css.add(css$7);
  {
    if (doc && active)
      doc.body.style.overflow = "hidden";
  }
  {
    if (doc && !active)
      doc.body.style.overflow = "auto";
  }
  return `${active ? `<aside class="${"svelte-ow4lkc"}"><article class="${"svelte-ow4lkc"}"${add_attribute("this", modal, 1)}><div class="${"head svelte-ow4lkc"}">${slots.head ? slots.head({}) : ``}</div>
        <div class="${"content svelte-ow4lkc"}">${slots.content ? slots.content({}) : ``}</div>
        <div class="${"action svelte-ow4lkc"}">${slots.action ? slots.action({ close }) : ``}</div></article></aside>` : ``}`;
});
var css$6 = {
  code: "@media print{*{visibility:collapse}[printable] *{visibility:visible}[printable].svelte-gbwofp{position:absolute;top:0;left:0;width:100vw}}",
  map: '{"version":3,"file":"PrintableArea.svelte","sources":["PrintableArea.svelte"],"sourcesContent":["<div printable>\\r\\n    <slot></slot>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n    @media print{\\r\\n    :global(*){\\r\\n        visibility: collapse;\\r\\n    }\\r\\n    \\r\\n        :global([printable] *){\\r\\n            visibility: visible;\\r\\n    }\\r\\n\\r\\n    [printable]{\\r\\n        position: absolute;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        width: 100vw;\\r\\n    }\\r\\n}\\r\\n</style>"],"names":[],"mappings":"AAKI,OAAO,KAAK,CAAC,AACL,CAAC,AAAC,CAAC,AACP,UAAU,CAAE,QAAQ,AACxB,CAAC,AAEW,aAAa,AAAC,CAAC,AACnB,UAAU,CAAE,OAAO,AAC3B,CAAC,AAED,CAAC,SAAS,eAAC,CAAC,AACR,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,KAAK,AAChB,CAAC,AACL,CAAC"}'
};
var PrintableArea = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$6);
  return `<div printable class="${"svelte-gbwofp"}">${slots.default ? slots.default({}) : ``}
</div>`;
});
var css$5 = {
  code: "div.svelte-12f6bu9{display:grid;grid-template-rows:auto auto;grid-template-columns:1fr;align-items:baseline;grid-gap:calc(var(--gap) / 4)}@media(orientation: landscape) and (min-width:800px){div.svelte-12f6bu9{grid-template-columns:var(--template);grid-template-rows:1fr;grid-gap:var(--gap)}}",
  map: '{"version":3,"file":"Stack.svelte","sources":["Stack.svelte"],"sourcesContent":["<script>\\r\\n    export let gap = \'2em\'\\r\\n\\texport let template = \'1fr 1fr\'\\r\\n<\/script>\\r\\n\\r\\n<div style={`--gap:${gap}; --template:${template};`}>\\r\\n\\t<slot></slot>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\tdiv{\\r\\n\\t\\tdisplay:grid;\\r\\n\\t\\tgrid-template-rows: auto auto;\\r\\n\\t\\tgrid-template-columns:1fr;\\r\\n\\t\\talign-items:baseline;\\r\\n\\t\\tgrid-gap: calc(var(--gap) / 4);\\r\\n\\t}\\r\\n\\t\\r\\n\\t@media (orientation: landscape) and (min-width:800px){\\r\\n\\t\\t\\tdiv{\\r\\n\\t\\t\\t\\tgrid-template-columns: var(--template);\\r\\n\\t\\t\\t\\tgrid-template-rows:1fr;\\r\\n\\t\\t\\t\\tgrid-gap: var(--gap);\\r\\n\\t\\t\\t}\\r\\n\\t}\\r\\n</style>"],"names":[],"mappings":"AAUC,kBAAG,CAAC,AACH,QAAQ,IAAI,CACZ,kBAAkB,CAAE,IAAI,CAAC,IAAI,CAC7B,sBAAsB,GAAG,CACzB,YAAY,QAAQ,CACpB,QAAQ,CAAE,KAAK,IAAI,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,AAC/B,CAAC,AAED,MAAM,AAAC,cAAc,SAAS,CAAC,CAAC,GAAG,CAAC,WAAW,KAAK,CAAC,CAAC,AACpD,kBAAG,CAAC,AACH,qBAAqB,CAAE,IAAI,UAAU,CAAC,CACtC,mBAAmB,GAAG,CACtB,QAAQ,CAAE,IAAI,KAAK,CAAC,AACrB,CAAC,AACH,CAAC"}'
};
var Stack = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { gap = "2em" } = $$props;
  let { template: template2 = "1fr 1fr" } = $$props;
  if ($$props.gap === void 0 && $$bindings.gap && gap !== void 0)
    $$bindings.gap(gap);
  if ($$props.template === void 0 && $$bindings.template && template2 !== void 0)
    $$bindings.template(template2);
  $$result.css.add(css$5);
  return `<div${add_attribute("style", `--gap:${gap}; --template:${template2};`, 0)} class="${"svelte-12f6bu9"}">${slots.default ? slots.default({}) : ``}
</div>`;
});
var css$4 = {
  code: ":root{--mobile-head-column:40%;--row-accent:var(--readonly)}table.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{width:100%;border-collapse:collapse}thead.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{visibility:collapse}tr.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{display:flex;flex-direction:column;margin-bottom:.5rem;padding-inline-end:4px}.wrap.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{display:grid;grid-template-columns:var(--mobile-head-column) calc( 100% - var(--mobile-head-column) );align-items:center;grid-gap:.5rem}th.svelte-1rfaaxn>.wrap.svelte-1rfaaxn.svelte-1rfaaxn{grid-template-columns:auto 1fr;text-align:left}td.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{overflow:hidden;border:1px solid var(--text)}td.svelte-1rfaaxn>.wrap.svelte-1rfaaxn.svelte-1rfaaxn{padding:0 .25rem}tbody.svelte-1rfaaxn tr td.svelte-1rfaaxn>.wrap.svelte-1rfaaxn{background-image:linear-gradient(90deg, var(--brand) var(--mobile-head-column), var(--surface1) var(--mobile-head-column))}tbody.svelte-1rfaaxn tr td.svelte-1rfaaxn:nth-child(even)>.wrap.svelte-1rfaaxn{background-image:linear-gradient(90deg, var(--brand) var(--mobile-head-column), var(--row-accent) var(--mobile-head-column));;}td.svelte-1rfaaxn>.wrap.svelte-1rfaaxn>span.svelte-1rfaaxn:first-child{color:white}.fake-label.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{word-wrap:break-word;white-space:nowrap}td.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn:first-of-type{border-radius:4px 4px 0 0}td.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn:last-of-type{border-radius:0 0 4px 4px}.wrap.svelte-1rfaaxn>.svelte-1rfaaxn.svelte-1rfaaxn{padding:.25rem}th.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{padding:0 .25rem}.sorter.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{padding:0;padding-bottom:1rem}section.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{margin-top:1rem}@media print, (orientation: landscape) and (min-width:800px){.tableWrapper.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{padding-inline-end:4px}tbody.svelte-1rfaaxn tr:nth-child(even) td.svelte-1rfaaxn>.wrap.svelte-1rfaaxn{background-image:none}tbody.svelte-1rfaaxn tr.svelte-1rfaaxn.svelte-1rfaaxn:nth-child(even){background:var(--row-accent)}.sorter.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{grid-template-columns:auto 1fr}tbody.svelte-1rfaaxn tr:nth-child(odd) td.svelte-1rfaaxn>.wrap.svelte-1rfaaxn{background-image:none\n    }thead.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{visibility:visible;cursor:pointer;border-collapse:collapse;border-radius:4px 4px 0 0}th.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{position:sticky;top:0;z-index:1;background:var(--brand)}th.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn:first-of-type{border-radius:4px 0 0 0}th.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn:last-of-type{border-radius:0 4px 0 0}td.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn,th.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{min-width:5rem;max-width:10rem}td.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn:hover,th.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn:hover{box-shadow:var(--shadow) inset}tr.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{display:table-row;padding-inline-end:0}td.svelte-1rfaaxn>.wrap.svelte-1rfaaxn.svelte-1rfaaxn{grid-template-columns:1fr}td.svelte-1rfaaxn>.wrap.svelte-1rfaaxn>.fake-label.svelte-1rfaaxn{visibility:collapse;display:none;font-weight:600}th.svelte-1rfaaxn .wrap.svelte-1rfaaxn.svelte-1rfaaxn{font-size:.8rem;display:flex;flex-direction:column;gap:0;align-items:flex-start}td.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn:first-of-type,td.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn:last-of-type{border-radius:0}.sorter.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn:first-of-type{display:none}td.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{border:0}th.svelte-1rfaaxn .svelte-1rfaaxn.svelte-1rfaaxn:first-of-type{border-radius:8px 0 0 0;overflow:hidden}}td.svelte-1rfaaxn .wrap .fake-label.svelte-1rfaaxn.svelte-1rfaaxn{font-size:.9rem}.paginator.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{display:grid;grid-template-columns:auto 1fr auto;padding:.25rem 0;text-align:center}.paginator.svelte-1rfaaxn>.svelte-1rfaaxn.svelte-1rfaaxn{padding:.5rem}.paginator.svelte-1rfaaxn>span.svelte-1rfaaxn.svelte-1rfaaxn{font-size:1.25rem}input.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn,select.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{width:calc(100% - 1ch)}.controlWrapper.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{background:var(--surface1);position:sticky;top:0;z-index:1}.tableWrapper.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{max-height:var(--maxHeight);overflow-y:auto}@media print{th.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn,td.svelte-1rfaaxn.svelte-1rfaaxn.svelte-1rfaaxn{box-shadow:var(--shadow) inset;position:initial}}",
  map: `{"version":3,"file":"SortableTable.svelte","sources":["SortableTable.svelte"],"sourcesContent":["<script>\\n    import {fade} from 'svelte/transition'\\n    import {flip} from 'svelte/animate'\\nimport PrintableArea from './PrintableArea.svelte'\\nimport Stack from './Stack.svelte'\\n\\n\\nexport let data_id = 'id'\\n\\nlet limit = 15\\nlet search = ''\\nlet page = 0\\n\\nexport let row = []\\n\\nexport let column = []\\n\\nexport let maxHeight = '20rem'\\n\\n\\t\\nlet sortBy = {col: data_id};\\n\\n$: sort = (column) => {\\n\\n    let col = (column==sortBy.col) ? data_id : column\\n    sortBy.col = col\\n\\n    \\n    let sortStandard = (a, b) => \\n        (JSON.stringify(a[col]) < JSON.stringify(b[col])) \\n        ? -1 \\n        : (JSON.stringify(a[col]) > JSON.stringify(b[col])) \\n        ? 1  \\n        : 0;\\n\\n    \\n    filteredTable = filteredTable.sort(sortStandard)\\n}\\n\\n$: filteredTable = row.filter(data=>JSON.stringify(Object.values(data)).includes(search))\\n\\n$: paginate = Math.ceil(filteredTable.length / limit) || 1\\n\\n\\n$: if(!filteredTable.length || page+1>paginate) page = 0\\n\\nconst capitalize = string=>string.toUpperCase().replace('_', ' ')\\n\\nlet currentSort = sortBy.col\\n\\n$: sort(currentSort)\\n<\/script>\\n\\n<style>\\n:root{\\n    --mobile-head-column: 40%;\\n    --row-accent: var(--readonly);\\n}\\ntable{\\n    width: 100%;\\n    border-collapse: collapse;\\n}\\n\\nthead{\\n    visibility: collapse;\\n}\\n\\ntr{\\n    display: flex;\\n    flex-direction: column;\\n    margin-bottom: .5rem;\\n    padding-inline-end: 4px;\\n}\\n\\n\\n.wrap{\\n    display: grid;\\n    grid-template-columns: var(--mobile-head-column) calc( 100% - var(--mobile-head-column) );\\n    align-items: center;\\n    grid-gap: .5rem;\\n}\\n\\nth > .wrap{\\n    grid-template-columns: auto 1fr;\\n    text-align: left;\\n}\\n\\ntd{\\n    overflow: hidden;\\n    border: 1px solid var(--text);\\n}\\n\\ntd > .wrap{\\n    padding: 0 .25rem;\\n}\\n\\ntbody tr td >.wrap{\\n    background-image: linear-gradient(90deg, var(--brand) var(--mobile-head-column), var(--surface1) var(--mobile-head-column));\\n}\\n\\ntbody tr td:nth-child(even) > .wrap{\\n    background-image: linear-gradient(90deg, var(--brand) var(--mobile-head-column), var(--row-accent) var(--mobile-head-column));;\\n}\\n\\n\\ntd > .wrap > span:first-child{\\n    color: white;\\n}\\n\\n.fake-label{\\n    word-wrap: break-word;\\n    white-space: nowrap;\\n}\\n\\n\\ntd:first-of-type{\\n    border-radius: 4px 4px 0 0;\\n}\\n\\ntd:last-of-type{\\n    border-radius: 0 0 4px 4px;\\n}\\n\\n.wrap > *{\\n    padding: .25rem;\\n}\\n\\nth{\\n    padding: 0 .25rem;\\n}\\n\\n\\n.sorter{\\n    padding: 0;\\n    padding-bottom: 1rem;\\n}\\n\\nsection{\\n    margin-top: 1rem;\\n}\\n\\n\\n@media print, (orientation: landscape) and (min-width:800px){\\n    \\n    .tableWrapper{\\n        padding-inline-end: 4px;\\n    }\\n    tbody tr:nth-child(even) td >.wrap{\\n    background-image: none;\\n    }\\n\\n    tbody tr:nth-child(even) {\\n        background: var(--row-accent);\\n    }\\n\\n    .sorter{\\n        grid-template-columns: auto 1fr;\\n    }\\n\\n    tbody tr:nth-child(odd) td >.wrap{\\n    background-image: none\\n    }\\n    \\n    thead{\\n        visibility: visible;\\n        cursor: pointer;\\n        border-collapse: collapse;\\n        border-radius: 4px 4px 0 0;\\n        \\n    }\\n    \\n    th{\\n        position: sticky;\\n        top: 0;\\n        z-index: 1;\\n        background: var(--brand);\\n    }\\n\\n    th:first-of-type{\\n        border-radius: 4px 0 0 0;\\n    }\\n\\n    th:last-of-type{\\n        border-radius: 0 4px 0 0;\\n    }\\n\\n    td, th{\\n        min-width: 5rem;\\n        max-width: 10rem;\\n    }\\n\\n    td:hover, th:hover{\\n        box-shadow: var(--shadow) inset;\\n    }\\n\\n\\n    tr {\\n        display: table-row;\\n        padding-inline-end: 0;\\n    }\\n\\n\\n\\n    td > .wrap{\\n        grid-template-columns: 1fr;\\n    }\\n\\n    td > .wrap > .fake-label{\\n        visibility: collapse;\\n        display: none;\\n        font-weight: 600;\\n    }\\n\\n    th .wrap{\\n        font-size: .8rem;\\n        display: flex;\\n        flex-direction: column;\\n        gap:0;\\n        align-items: flex-start;\\n    }\\n\\n    td:first-of-type, td:last-of-type{\\n        border-radius: 0;\\n    }\\n\\n    .sorter:first-of-type{\\n        display: none;\\n    }\\n\\n    td{\\n        border: 0;\\n    }\\n\\n    th :first-of-type{\\n        border-radius: 8px 0 0 0;\\n        overflow: hidden;\\n    }\\n    \\n\\n}\\n\\ntd .wrap .fake-label{\\n    font-size: .9rem;\\n}\\n\\n\\n.paginator{\\n    display: grid;\\n    grid-template-columns: auto 1fr auto;\\n    padding: .25rem 0;\\n    text-align: center;\\n}\\n\\n.paginator > *{\\n    padding: .5rem;\\n}\\n\\n.paginator>span{\\n    font-size: 1.25rem;\\n}\\n\\ninput, select{\\n    width: calc(100% - 1ch);\\n}\\n\\n.controlWrapper{\\n    background: var(--surface1);\\n    position: sticky;\\n    top: 0;\\n    z-index: 1;\\n}\\n\\n.tableWrapper{\\n    max-height: var(--maxHeight);\\n    overflow-y: auto;\\n    \\n}\\n@media print{\\n    th, td{\\n        box-shadow: var(--shadow) inset;\\n        position: initial;\\n    }\\n}\\n\\n</style>\\n\\n\\n<section> \\n{#if row.length}\\n<div class=\\"controlWrapper\\">\\n<Stack gap='5%'>\\n    <div class=\\"wrap sorter\\">\\n        <label for=\\"sortBy\\">Urutkan</label>\\n        <select bind:value=\\"{currentSort}\\" id=sortBy>\\n            {#each column as field}\\n            <option value={field}>{capitalize(field)}</option>\\n            {/each}\\n        </select>\\n    </div>\\n\\n    <div class=\\"wrap sorter\\">\\n        <label for=paginateBy>Maximum</label>\\n        <select id=paginateBy bind:value={limit}>\\n            {#each Array(10) as _, i}\\n            <option value={(i+1)*5}>{(i+1)*5}</option>\\n            {/each}\\n        </select>\\n    </div>\\n    \\n    <div class=\\"wrap sorter\\">\\n        <label for=search>Pencarian</label>\\n        <input id=search bind:value={search} type=\\"search\\">\\n    </div>\\n</Stack>\\n</div>\\n{/if}\\n\\n<div style=\\"--maxHeight:{maxHeight}\\" class=\\"tableWrapper\\" >\\n<PrintableArea>\\n<table>\\n    <thead>\\n        <tr>\\n            {#each column as field}\\n                {#if field != data_id}\\n                    <th on:click={()=>currentSort =  currentSort!=field? field: data_id} title=\\"Sort By {capitalize(field)}\\">    \\n                        <div class=\\"wrap\\">\\n                            {#if currentSort === field}\\n                            <span>\u{1F53A}</span>\\n                            {:else}\\n                            <span>\u{1F536}</span>\\n                            {/if}\\n                            <span>\\n                                {capitalize(field)}\\n                            </span>\\n                        </div>\\n                    </th>\\n                {/if}\\n            {/each}\\n                </tr>\\n            </thead>\\n            <tbody>\\n            {#if filteredTable.length}\\n                    \\n                {#each filteredTable.filter((_, i)=>i>=limit*page && i<limit*(page+1)) as data (data)}\\n                <tr animate:flip={{duration:400}}>\\n                    {#each column as field}\\n                    {#if field != data_id}                            \\n                    <td transition:fade title={capitalize(field)}>\\n                        <div class=wrap>\\n                            <span class=fake-label>\\n                                {field==data_id?'No.': capitalize(field)}\\n                            </span>\\n                            <span>\\n                                {#if field == 'link'}\\n                                <a href=\\"{data[field].href}\\">{data[field].text}</a>\\n                                {:else}\\n                                {data[field]}\\n                                {/if}\\n                            </span>\\n                        </div>\\n                    </td>\\n                    {/if}\\n                    {/each}\\n                </tr>\\n                {/each}\\n            {:else}\\n                <tr>\\n                    <td colspan={column.length} style=text-align:center;border-radius:0;padding:1rem>No Data To Show</td>\\n                </tr>\\n            {/if}\\n        </tbody>\\n    </table>\\n</PrintableArea>\\n</div>\\n\\n{#if paginate>1}\\n    \\n<div class=\\"paginator\\">\\n    {#if page==0}\\n            <button disabled>Prev</button>\\n            {:else}\\n            <button on:click={()=>page--}>Prev</button>\\n            {/if}\\n            \\n            <span>{page+1} / {paginate}</span>\\n            \\n            {#if page+1 == paginate}\\n            <button disabled>Next</button>\\n            {:else}\\n            <button on:click={()=>page++}>Next</button>\\n            {/if}\\n        </div>\\n    {/if}\\n    \\n\\n</section>\\n"],"names":[],"mappings":"AAsDA,KAAK,CAAC,AACF,oBAAoB,CAAE,GAAG,CACzB,YAAY,CAAE,eAAe,AACjC,CAAC,AACD,kDAAK,CAAC,AACF,KAAK,CAAE,IAAI,CACX,eAAe,CAAE,QAAQ,AAC7B,CAAC,AAED,kDAAK,CAAC,AACF,UAAU,CAAE,QAAQ,AACxB,CAAC,AAED,+CAAE,CAAC,AACC,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,aAAa,CAAE,KAAK,CACpB,kBAAkB,CAAE,GAAG,AAC3B,CAAC,AAGD,kDAAK,CAAC,AACF,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,IAAI,oBAAoB,CAAC,CAAC,MAAM,IAAI,CAAC,CAAC,CAAC,IAAI,oBAAoB,CAAC,EAAE,CACzF,WAAW,CAAE,MAAM,CACnB,QAAQ,CAAE,KAAK,AACnB,CAAC,AAED,iBAAE,CAAG,mCAAK,CAAC,AACP,qBAAqB,CAAE,IAAI,CAAC,GAAG,CAC/B,UAAU,CAAE,IAAI,AACpB,CAAC,AAED,+CAAE,CAAC,AACC,QAAQ,CAAE,MAAM,CAChB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,MAAM,CAAC,AACjC,CAAC,AAED,iBAAE,CAAG,mCAAK,CAAC,AACP,OAAO,CAAE,CAAC,CAAC,MAAM,AACrB,CAAC,AAED,oBAAK,CAAC,EAAE,CAAC,iBAAE,CAAE,oBAAK,CAAC,AACf,gBAAgB,CAAE,gBAAgB,KAAK,CAAC,CAAC,IAAI,OAAO,CAAC,CAAC,IAAI,oBAAoB,CAAC,CAAC,CAAC,IAAI,UAAU,CAAC,CAAC,IAAI,oBAAoB,CAAC,CAAC,AAC/H,CAAC,AAED,oBAAK,CAAC,EAAE,CAAC,iBAAE,WAAW,IAAI,CAAC,CAAG,oBAAK,CAAC,AAChC,gBAAgB,CAAE,gBAAgB,KAAK,CAAC,CAAC,IAAI,OAAO,CAAC,CAAC,IAAI,oBAAoB,CAAC,CAAC,CAAC,IAAI,YAAY,CAAC,CAAC,IAAI,oBAAoB,CAAC,CAAC,CAAC,CAAC,AACnI,CAAC,AAGD,iBAAE,CAAG,oBAAK,CAAG,mBAAI,YAAY,CAAC,AAC1B,KAAK,CAAE,KAAK,AAChB,CAAC,AAED,wDAAW,CAAC,AACR,SAAS,CAAE,UAAU,CACrB,WAAW,CAAE,MAAM,AACvB,CAAC,AAGD,+CAAE,cAAc,CAAC,AACb,aAAa,CAAE,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,AAC9B,CAAC,AAED,+CAAE,aAAa,CAAC,AACZ,aAAa,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,GAAG,AAC9B,CAAC,AAED,oBAAK,CAAG,8BAAC,CAAC,AACN,OAAO,CAAE,MAAM,AACnB,CAAC,AAED,+CAAE,CAAC,AACC,OAAO,CAAE,CAAC,CAAC,MAAM,AACrB,CAAC,AAGD,oDAAO,CAAC,AACJ,OAAO,CAAE,CAAC,CACV,cAAc,CAAE,IAAI,AACxB,CAAC,AAED,oDAAO,CAAC,AACJ,UAAU,CAAE,IAAI,AACpB,CAAC,AAGD,OAAO,KAAK,EAAE,cAAc,SAAS,CAAC,CAAC,GAAG,CAAC,WAAW,KAAK,CAAC,CAAC,AAEzD,0DAAa,CAAC,AACV,kBAAkB,CAAE,GAAG,AAC3B,CAAC,AACD,oBAAK,CAAC,EAAE,WAAW,IAAI,CAAC,CAAC,iBAAE,CAAE,oBAAK,CAAC,AACnC,gBAAgB,CAAE,IAAI,AACtB,CAAC,AAED,oBAAK,CAAC,gCAAE,WAAW,IAAI,CAAC,AAAC,CAAC,AACtB,UAAU,CAAE,IAAI,YAAY,CAAC,AACjC,CAAC,AAED,oDAAO,CAAC,AACJ,qBAAqB,CAAE,IAAI,CAAC,GAAG,AACnC,CAAC,AAED,oBAAK,CAAC,EAAE,WAAW,GAAG,CAAC,CAAC,iBAAE,CAAE,oBAAK,CAAC,AAClC,gBAAgB,CAAE,IAAI;IACtB,CAAC,AAED,kDAAK,CAAC,AACF,UAAU,CAAE,OAAO,CACnB,MAAM,CAAE,OAAO,CACf,eAAe,CAAE,QAAQ,CACzB,aAAa,CAAE,GAAG,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,AAE9B,CAAC,AAED,+CAAE,CAAC,AACC,QAAQ,CAAE,MAAM,CAChB,GAAG,CAAE,CAAC,CACN,OAAO,CAAE,CAAC,CACV,UAAU,CAAE,IAAI,OAAO,CAAC,AAC5B,CAAC,AAED,+CAAE,cAAc,CAAC,AACb,aAAa,CAAE,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,AAC5B,CAAC,AAED,+CAAE,aAAa,CAAC,AACZ,aAAa,CAAE,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,AAC5B,CAAC,AAED,+CAAE,CAAE,+CAAE,CAAC,AACH,SAAS,CAAE,IAAI,CACf,SAAS,CAAE,KAAK,AACpB,CAAC,AAED,+CAAE,MAAM,CAAE,+CAAE,MAAM,CAAC,AACf,UAAU,CAAE,IAAI,QAAQ,CAAC,CAAC,KAAK,AACnC,CAAC,AAGD,EAAE,6CAAC,CAAC,AACA,OAAO,CAAE,SAAS,CAClB,kBAAkB,CAAE,CAAC,AACzB,CAAC,AAID,iBAAE,CAAG,mCAAK,CAAC,AACP,qBAAqB,CAAE,GAAG,AAC9B,CAAC,AAED,iBAAE,CAAG,oBAAK,CAAG,0BAAW,CAAC,AACrB,UAAU,CAAE,QAAQ,CACpB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,GAAG,AACpB,CAAC,AAED,iBAAE,CAAC,mCAAK,CAAC,AACL,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,IAAI,CAAC,CACL,WAAW,CAAE,UAAU,AAC3B,CAAC,AAED,+CAAE,cAAc,CAAE,+CAAE,aAAa,CAAC,AAC9B,aAAa,CAAE,CAAC,AACpB,CAAC,AAED,MAAM,8CAAC,cAAc,CAAC,AAClB,OAAO,CAAE,IAAI,AACjB,CAAC,AAED,+CAAE,CAAC,AACC,MAAM,CAAE,CAAC,AACb,CAAC,AAED,iBAAE,+BAAC,cAAc,CAAC,AACd,aAAa,CAAE,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACxB,QAAQ,CAAE,MAAM,AACpB,CAAC,AAGL,CAAC,AAED,iBAAE,CAAC,KAAK,CAAC,yCAAW,CAAC,AACjB,SAAS,CAAE,KAAK,AACpB,CAAC,AAGD,uDAAU,CAAC,AACP,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,IAAI,CAAC,GAAG,CAAC,IAAI,CACpC,OAAO,CAAE,MAAM,CAAC,CAAC,CACjB,UAAU,CAAE,MAAM,AACtB,CAAC,AAED,yBAAU,CAAG,8BAAC,CAAC,AACX,OAAO,CAAE,KAAK,AAClB,CAAC,AAED,yBAAU,CAAC,kCAAI,CAAC,AACZ,SAAS,CAAE,OAAO,AACtB,CAAC,AAED,kDAAK,CAAE,mDAAM,CAAC,AACV,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,AAC3B,CAAC,AAED,4DAAe,CAAC,AACZ,UAAU,CAAE,IAAI,UAAU,CAAC,CAC3B,QAAQ,CAAE,MAAM,CAChB,GAAG,CAAE,CAAC,CACN,OAAO,CAAE,CAAC,AACd,CAAC,AAED,0DAAa,CAAC,AACV,UAAU,CAAE,IAAI,WAAW,CAAC,CAC5B,UAAU,CAAE,IAAI,AAEpB,CAAC,AACD,OAAO,KAAK,CAAC,AACT,+CAAE,CAAE,+CAAE,CAAC,AACH,UAAU,CAAE,IAAI,QAAQ,CAAC,CAAC,KAAK,CAC/B,QAAQ,CAAE,OAAO,AACrB,CAAC,AACL,CAAC"}`
};
var SortableTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let sort;
  let filteredTable;
  let paginate;
  let { data_id = "id" } = $$props;
  let limit = 15;
  let search = "";
  let page = 0;
  let { row = [] } = $$props;
  let { column = [] } = $$props;
  let { maxHeight = "20rem" } = $$props;
  let sortBy = { col: data_id };
  const capitalize = (string) => string.toUpperCase().replace("_", " ");
  let currentSort = sortBy.col;
  if ($$props.data_id === void 0 && $$bindings.data_id && data_id !== void 0)
    $$bindings.data_id(data_id);
  if ($$props.row === void 0 && $$bindings.row && row !== void 0)
    $$bindings.row(row);
  if ($$props.column === void 0 && $$bindings.column && column !== void 0)
    $$bindings.column(column);
  if ($$props.maxHeight === void 0 && $$bindings.maxHeight && maxHeight !== void 0)
    $$bindings.maxHeight(maxHeight);
  $$result.css.add(css$4);
  sort = (column2) => {
    let col = column2 == sortBy.col ? data_id : column2;
    sortBy.col = col;
    let sortStandard = (a, b) => JSON.stringify(a[col]) < JSON.stringify(b[col]) ? -1 : JSON.stringify(a[col]) > JSON.stringify(b[col]) ? 1 : 0;
    filteredTable = filteredTable.sort(sortStandard);
  };
  filteredTable = row.filter((data) => JSON.stringify(Object.values(data)).includes(search));
  paginate = Math.ceil(filteredTable.length / limit) || 1;
  {
    if (!filteredTable.length || page + 1 > paginate)
      page = 0;
  }
  {
    sort(currentSort);
  }
  return `<section class="${"svelte-1rfaaxn"}">${row.length ? `<div class="${"controlWrapper svelte-1rfaaxn"}">${validate_component(Stack, "Stack").$$render($$result, { gap: "5%" }, {}, {
    default: () => `<div class="${"wrap sorter svelte-1rfaaxn"}"><label for="${"sortBy"}" class="${"svelte-1rfaaxn"}">Urutkan</label>
        <select id="${"sortBy"}" class="${"svelte-1rfaaxn"}"${add_attribute("value", currentSort, 1)}>${each(column, (field) => `<option${add_attribute("value", field, 0)} class="${"svelte-1rfaaxn"}">${escape(capitalize(field))}</option>`)}</select></div>

    <div class="${"wrap sorter svelte-1rfaaxn"}"><label for="${"paginateBy"}" class="${"svelte-1rfaaxn"}">Maximum</label>
        <select id="${"paginateBy"}" class="${"svelte-1rfaaxn"}"${add_attribute("value", limit, 1)}>${each(Array(10), (_, i) => `<option${add_attribute("value", (i + 1) * 5, 0)} class="${"svelte-1rfaaxn"}">${escape((i + 1) * 5)}</option>`)}</select></div>
    
    <div class="${"wrap sorter svelte-1rfaaxn"}"><label for="${"search"}" class="${"svelte-1rfaaxn"}">Pencarian</label>
        <input id="${"search"}" type="${"search"}" class="${"svelte-1rfaaxn"}"${add_attribute("value", search, 1)}></div>`
  })}</div>` : ``}

<div style="${"--maxHeight:" + escape(maxHeight)}" class="${"tableWrapper svelte-1rfaaxn"}">${validate_component(PrintableArea, "PrintableArea").$$render($$result, {}, {}, {
    default: () => `<table class="${"svelte-1rfaaxn"}"><thead class="${"svelte-1rfaaxn"}"><tr class="${"svelte-1rfaaxn"}">${each(column, (field) => `${field != data_id ? `<th title="${"Sort By " + escape(capitalize(field))}" class="${"svelte-1rfaaxn"}"><div class="${"wrap svelte-1rfaaxn"}">${currentSort === field ? `<span class="${"svelte-1rfaaxn"}">\u{1F53A}</span>` : `<span class="${"svelte-1rfaaxn"}">\u{1F536}</span>`}
                            <span class="${"svelte-1rfaaxn"}">${escape(capitalize(field))}
                            </span></div>
                    </th>` : ``}`)}</tr></thead>
            <tbody class="${"svelte-1rfaaxn"}">${filteredTable.length ? `${each(filteredTable.filter((_, i) => i >= limit * page && i < limit * (page + 1)), (data) => `<tr class="${"svelte-1rfaaxn"}">${each(column, (field) => `${field != data_id ? `<td${add_attribute("title", capitalize(field), 0)} class="${"svelte-1rfaaxn"}"><div class="${"wrap svelte-1rfaaxn"}"><span class="${"fake-label svelte-1rfaaxn"}">${escape(field == data_id ? "No." : capitalize(field))}</span>
                            <span class="${"svelte-1rfaaxn"}">${field == "link" ? `<a${add_attribute("href", data[field].href, 0)} class="${"svelte-1rfaaxn"}">${escape(data[field].text)}</a>` : `${escape(data[field])}`}
                            </span></div>
                    </td>` : ``}`)}
                </tr>`)}` : `<tr class="${"svelte-1rfaaxn"}"><td${add_attribute("colspan", column.length, 0)} style="${"text-align:center;border-radius:0;padding:1rem"}" class="${"svelte-1rfaaxn"}">No Data To Show</td></tr>`}</tbody></table>`
  })}</div>

${paginate > 1 ? `<div class="${"paginator svelte-1rfaaxn"}">${page == 0 ? `<button disabled class="${"svelte-1rfaaxn"}">Prev</button>` : `<button class="${"svelte-1rfaaxn"}">Prev</button>`}
            
            <span class="${"svelte-1rfaaxn"}">${escape(page + 1)} / ${escape(paginate)}</span>
            
            ${page + 1 == paginate ? `<button disabled class="${"svelte-1rfaaxn"}">Next</button>` : `<button class="${"svelte-1rfaaxn"}">Next</button>`}</div>` : ``}</section>`;
});
var css$3 = {
  code: ".svelte-1h2d8hz{box-sizing:content-box}.spinner.svelte-1h2d8hz{max-height:min(40vh, 200px);margin:0 auto;padding:1rem}.out.svelte-1h2d8hz,.in.svelte-1h2d8hz{border-width:8px;border-style:solid;height:40%;border-image:linear-gradient(to bottom, var(--secondary, #65b), var(--brand, #66d)) 1 100%;animation-name:svelte-1h2d8hz-spin-out;animation-duration:1500ms}strong.svelte-1h2d8hz{position:absolute;bottom:0;text-align:center;animation:svelte-1h2d8hz-txt 1500ms ease-in-out infinite;animation-direction:alternate;color:#66d}.in.svelte-1h2d8hz{animation-name:svelte-1h2d8hz-spin-in;border-image:linear-gradient(to bottom, var(--secondary, #65b), var(--brand, #66d)) 1 100%;height:calc(100%);transform:rotate(90deg)}div.svelte-1h2d8hz{aspect-ratio:1;display:flex;align-items:center;justify-content:center;position:relative}div.svelte-1h2d8hz:not(.spinner){animation-timing-function:ease-in-out;animation-iteration-count:infinite;animation-direction:alternate}@keyframes svelte-1h2d8hz-spin-out{to{transform:rotate(-90deg )}}@keyframes svelte-1h2d8hz-spin-in{to{transform:rotate(calc(1turn - 90deg) )}}@keyframes svelte-1h2d8hz-txt{to{transform:translateY(50%)}}",
  map: '{"version":3,"file":"Spinner.svelte","sources":["Spinner.svelte"],"sourcesContent":["<div class=\\"spinner\\">\\r\\n    <strong>Please Wait ...</strong>\\r\\n    <div class=\\"out\\">\\r\\n        <div class=\\"in\\">\\r\\n        </div>\\r\\n    </div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\r\\n    *{\\r\\n        box-sizing: content-box;\\r\\n    }\\r\\n    .spinner{\\r\\n        max-height: min(40vh, 200px);\\r\\n        margin: 0 auto;\\r\\n        padding: 1rem;\\r\\n    }\\r\\n    .out, .in{\\r\\n        border-width: 8px;\\r\\n        border-style: solid;\\r\\n        height: 40%;\\r\\n        border-image: linear-gradient(to bottom, var(--secondary, #65b), var(--brand, #66d)) 1 100%;\\r\\n        animation-name: spin-out;\\r\\n        animation-duration: 1500ms;\\r\\n    }\\r\\n    \\r\\n    strong{\\r\\n        position: absolute;\\r\\n        bottom: 0;\\r\\n        text-align: center;\\r\\n        animation: txt 1500ms ease-in-out infinite;\\r\\n        animation-direction: alternate;\\r\\n        color: #66d;\\r\\n    }\\r\\n \\r\\n    .in{\\r\\n        animation-name: spin-in;\\r\\n        border-image: linear-gradient(to bottom, var(--secondary, #65b), var(--brand, #66d)) 1 100%;\\r\\n        height: calc(100%);\\r\\n        transform: rotate(90deg);\\r\\n    }\\r\\n\\r\\n\\r\\n    \\r\\n    div{\\r\\n        aspect-ratio: 1;\\r\\n        display: flex;\\r\\n        align-items: center;\\r\\n        justify-content: center;\\r\\n        position: relative;\\r\\n    }\\r\\n\\r\\n    div:not(.spinner){\\r\\n        animation-timing-function: ease-in-out;\\r\\n        animation-iteration-count: infinite;\\r\\n        animation-direction: alternate;\\r\\n    }\\r\\n    \\r\\n\\r\\n    @keyframes spin-out{\\r\\n        to{\\r\\n            transform: rotate(-90deg );\\r\\n        }\\r\\n    }\\r\\n\\r\\n    @keyframes spin-in{\\r\\n        to{\\r\\n            transform: rotate(calc(1turn - 90deg) );\\r\\n        }\\r\\n    }\\r\\n\\r\\n    @keyframes txt{\\r\\n        to{\\r\\n            transform: translateY(50%);\\r\\n        }\\r\\n    }\\r\\n\\r\\n\\r\\n\\r\\n</style>"],"names":[],"mappings":"AAUI,eAAC,CAAC,AACE,UAAU,CAAE,WAAW,AAC3B,CAAC,AACD,uBAAQ,CAAC,AACL,UAAU,CAAE,IAAI,IAAI,CAAC,CAAC,KAAK,CAAC,CAC5B,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,OAAO,CAAE,IAAI,AACjB,CAAC,AACD,mBAAI,CAAE,kBAAG,CAAC,AACN,YAAY,CAAE,GAAG,CACjB,YAAY,CAAE,KAAK,CACnB,MAAM,CAAE,GAAG,CACX,YAAY,CAAE,gBAAgB,EAAE,CAAC,MAAM,CAAC,CAAC,IAAI,WAAW,CAAC,KAAK,CAAC,CAAC,CAAC,IAAI,OAAO,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAC3F,cAAc,CAAE,uBAAQ,CACxB,kBAAkB,CAAE,MAAM,AAC9B,CAAC,AAED,qBAAM,CAAC,AACH,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,CACT,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,kBAAG,CAAC,MAAM,CAAC,WAAW,CAAC,QAAQ,CAC1C,mBAAmB,CAAE,SAAS,CAC9B,KAAK,CAAE,IAAI,AACf,CAAC,AAED,kBAAG,CAAC,AACA,cAAc,CAAE,sBAAO,CACvB,YAAY,CAAE,gBAAgB,EAAE,CAAC,MAAM,CAAC,CAAC,IAAI,WAAW,CAAC,KAAK,CAAC,CAAC,CAAC,IAAI,OAAO,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAC3F,MAAM,CAAE,KAAK,IAAI,CAAC,CAClB,SAAS,CAAE,OAAO,KAAK,CAAC,AAC5B,CAAC,AAID,kBAAG,CAAC,AACA,YAAY,CAAE,CAAC,CACf,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,QAAQ,CAAE,QAAQ,AACtB,CAAC,AAED,kBAAG,KAAK,QAAQ,CAAC,CAAC,AACd,yBAAyB,CAAE,WAAW,CACtC,yBAAyB,CAAE,QAAQ,CACnC,mBAAmB,CAAE,SAAS,AAClC,CAAC,AAGD,WAAW,uBAAQ,CAAC,AAChB,EAAE,CAAC,AACC,SAAS,CAAE,OAAO,MAAM,EAAE,AAC9B,CAAC,AACL,CAAC,AAED,WAAW,sBAAO,CAAC,AACf,EAAE,CAAC,AACC,SAAS,CAAE,OAAO,KAAK,KAAK,CAAC,CAAC,CAAC,KAAK,CAAC,EAAE,AAC3C,CAAC,AACL,CAAC,AAED,WAAW,kBAAG,CAAC,AACX,EAAE,CAAC,AACC,SAAS,CAAE,WAAW,GAAG,CAAC,AAC9B,CAAC,AACL,CAAC"}'
};
var Spinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `<div class="${"spinner svelte-1h2d8hz"}"><strong class="${"svelte-1h2d8hz"}">Please Wait ...</strong>
    <div class="${"out svelte-1h2d8hz"}"><div class="${"in svelte-1h2d8hz"}"></div></div>
</div>`;
});
var css$2 = {
  code: "div.svelte-x6virq{overflow:auto}.btn-container.svelte-x6virq{display:flex;gap:1rem}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script context=module>\\n    import { loginRequired } from \\"$lib/scripts/helper\\";\\n    export const load = loginRequired\\n<\/script>\\n\\n\\n<script>\\nimport FormControl from \\"$lib/FormControl.svelte\\";\\nimport Modal from \\"$lib/Modal.svelte\\";\\nimport SortableTable from \\"$lib/SortableTable.svelte\\";\\nimport { onMount } from \\"svelte\\";\\nimport { getJSON } from \\"$lib/scripts/helper\\";\\nimport {base} from '$app/paths'\\nimport Page from \\"$lib/Page.svelte\\";\\nimport Spinner from \\"$lib/Spinner.svelte\\";\\n\\n\\nonMount(async ()=>{\\n    let data = await getJSON(base+'/api/lowongan')\\n    row=data.result\\n})\\n\\n\\nlet row \\nlet close\\n\\n$: column = row? Object.keys(row[0]) : []\\n\\nlet modalActive = false\\n\\nlet posisi,perusahaan,alamat,informasi,expired,error\\n\\nfunction add() {\\n    if(posisi && perusahaan && alamat && informasi && expired){\\n        error = ''\\n        let form = {\\n            posisi,\\n            perusahaan,\\n            alamat,\\n            informasi,\\n            expired\\n        }\\n        row = [...row, form] \\n        close()\\n        return\\n    }\\n    error='Please Input All Field' \\n}\\n\\n$: valid = posisi&&perusahaan&&alamat&&informasi&&expired\\n<\/script>\\n\\n<Page title='Info Loker' description='Informai Lowongan Kerja'>\\n    {#if !row}\\n        <Spinner></Spinner>\\n        {:else}        \\n        <div class=btn-container>\\n            <button on:click={()=>modalActive=true}>Tambah</button>\\n            <button on:click={()=>window.print()}>Print</button>\\n        </div>\\n        <SortableTable {row} {column} maxHeight=25rem></SortableTable>\\n    {/if}\\n</Page>\\n\\n\\n<Modal bind:active={modalActive} bind:close>\\n        <div slot=\\"head\\"><h3 style=\\"color: white;\\">Tambah Lowongan Pekerjaan</h3></div>\\n        <div slot=content>\\n\\n            <FormControl>\\n                <label for=\\"posisi\\">Posisi</label>\\n                <input type=\\"text\\" id=\\"posisi\\" placeholder=\\"Posisi Yang Dibutuhkan\\" bind:value={posisi}>\\n            </FormControl>\\n            \\n            <FormControl>\\n                <label for=\\"nama\\">Nama Perusahaan</label>\\n                <input type=\\"text\\" id=\\"nama\\" placeholder=\\"Nama Kantor Perusahaan\\" bind:value={perusahaan}>\\n            </FormControl>\\n                \\n            <FormControl>\\n                <label for=\\"alamat\\">Alamat</label>\\n                <textarea type=\\"text\\" id=\\"alamat\\" placeholder=\\"Alamat Kantor Perusahaan\\" bind:value={alamat} rows=\\"3\\"></textarea>\\n            </FormControl>\\n            \\n            <FormControl>\\n                <label for=\\"info\\">Informasi</label>\\n                <textarea type=\\"text\\" id=\\"info\\" placeholder=\\"Informasi Seputar Deskripsi Pekerjaan Dan Persyaratan\\" bind:value={informasi} rows=\\"3\\"></textarea>\\n            </FormControl>\\n            \\n            <FormControl>\\n                <label for=\\"exp\\">Kadaluarsa</label>\\n                <input type=\\"text\\" id=\\"exp\\" placeholder=\\"Tanggal Ditutupnya Lowongan\\" \\n                onfocus=\\"this.type='date'\\" onblur=\\"if(!this.value) this.type='text'\\" pattern=\\"\\\\d{4}-\\\\d{2}-\\\\d{2}\\" bind:value={expired}>\\n            </FormControl>\\n            \\n            {#if error && !valid}\\n            <div style=\\" text-align: center;\\">\\n                <strong style=\\" color: #d45;\\">{error}</strong>\\n            </div>\\n            {/if}\\n        </div>\\n        \\n        <div slot=action>\\n            <button class=\\"cancel\\" type=\\"button\\" on:click={close}>\\n                batal\\n            </button>\\n            <button class=\\"submit\\" type=\\"submit\\" on:click={add}>\\n                tambah\\n            </button>\\n        </div>\\n        \\n</Modal>\\n\\n<style>\\n    div{\\n        overflow: auto;\\n    }\\n\\n    .btn-container{\\n        display: flex;\\n        gap: 1rem;\\n    }\\n\\n</style>"],"names":[],"mappings":"AAkHI,iBAAG,CAAC,AACA,QAAQ,CAAE,IAAI,AAClB,CAAC,AAED,4BAAc,CAAC,AACX,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IAAI,AACb,CAAC"}`
};
var load$2 = loginRequired;
var Loker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let column;
  onMount(async () => {
    let data = await getJSON(base + "/api/lowongan");
    row = data.result;
  });
  let row;
  let close;
  let modalActive = false;
  let posisi, perusahaan, expired;
  $$result.css.add(css$2);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    column = row ? Object.keys(row[0]) : [];
    $$rendered = `${validate_component(Page, "Page").$$render($$result, {
      title: "Info Loker",
      description: "Informai Lowongan Kerja"
    }, {}, {
      default: () => `${!row ? `${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}` : `<div class="${"btn-container svelte-x6virq"}"><button>Tambah</button>
            <button>Print</button></div>
        ${validate_component(SortableTable, "SortableTable").$$render($$result, { row, column, maxHeight: "25rem" }, {}, {})}`}`
    })}


${validate_component(Modal, "Modal").$$render($$result, { active: modalActive, close }, {
      active: ($$value) => {
        modalActive = $$value;
        $$settled = false;
      },
      close: ($$value) => {
        close = $$value;
        $$settled = false;
      }
    }, {
      action: () => `<div slot="${"action"}" class="${"svelte-x6virq"}"><button class="${"cancel"}" type="${"button"}">batal
            </button>
            <button class="${"submit"}" type="${"submit"}">tambah
            </button></div>`,
      content: () => `<div slot="${"content"}" class="${"svelte-x6virq"}">${validate_component(FormControl, "FormControl").$$render($$result, {}, {}, {
        default: () => `<label for="${"posisi"}">Posisi</label>
                <input type="${"text"}" id="${"posisi"}" placeholder="${"Posisi Yang Dibutuhkan"}"${add_attribute("value", posisi, 1)}>`
      })}
            
            ${validate_component(FormControl, "FormControl").$$render($$result, {}, {}, {
        default: () => `<label for="${"nama"}">Nama Perusahaan</label>
                <input type="${"text"}" id="${"nama"}" placeholder="${"Nama Kantor Perusahaan"}"${add_attribute("value", perusahaan, 1)}>`
      })}
                
            ${validate_component(FormControl, "FormControl").$$render($$result, {}, {}, {
        default: () => `<label for="${"alamat"}">Alamat</label>
                <textarea type="${"text"}" id="${"alamat"}" placeholder="${"Alamat Kantor Perusahaan"}" rows="${"3"}">${""}</textarea>`
      })}
            
            ${validate_component(FormControl, "FormControl").$$render($$result, {}, {}, {
        default: () => `<label for="${"info"}">Informasi</label>
                <textarea type="${"text"}" id="${"info"}" placeholder="${"Informasi Seputar Deskripsi Pekerjaan Dan Persyaratan"}" rows="${"3"}">${""}</textarea>`
      })}
            
            ${validate_component(FormControl, "FormControl").$$render($$result, {}, {}, {
        default: () => `<label for="${"exp"}">Kadaluarsa</label>
                <input type="${"text"}" id="${"exp"}" placeholder="${"Tanggal Ditutupnya Lowongan"}" onfocus="${"this.type='date'"}" onblur="${"if(!this.value) this.type='text'"}" pattern="${"\\d" + escape(4) + "-\\d" + escape(2) + "-\\d" + escape(2)}"${add_attribute("value", expired, 1)}>`
      })}
            
            ${``}</div>`,
      head: () => `<div slot="${"head"}" class="${"svelte-x6virq"}"><h3 style="${"color: white;"}">Tambah Lowongan Pekerjaan</h3></div>`
    })}`;
  } while (!$$settled);
  return $$rendered;
});
var index$3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Loker,
  load: load$2
});
var css$1 = {
  code: ".box.svelte-1lsfq0o.svelte-1lsfq0o{padding:.5rem;border:1px solid #dee2e6;border-radius:0 0 4px 4px;border-top:0}ul.svelte-1lsfq0o.svelte-1lsfq0o{display:flex;padding-left:0;margin-bottom:0;list-style:none;border-bottom:1px solid #dee2e6;flex-wrap:wrap;overflow:hidden}li.svelte-1lsfq0o.svelte-1lsfq0o{margin-bottom:-1px}span.svelte-1lsfq0o.svelte-1lsfq0o{border:1px solid transparent;border-top-left-radius:0.25rem;border-top-right-radius:0.25rem;display:block;padding:0.5rem 1rem;cursor:pointer;position:relative;user-select:none}span.svelte-1lsfq0o.svelte-1lsfq0o:hover{border-color:#e9ecef #e9ecef #dee2e6}li.active.svelte-1lsfq0o>span.svelte-1lsfq0o{color:var(--brand);border-color:#dee2e6 #dee2e6 #fff}li.svelte-1lsfq0o>span.svelte-1lsfq0o::before{content:'';position:absolute;bottom:0;left:0;height:3px;background:var(--brand);width:100%;transform-origin:0 50%;transform:scaleX(0);opacity:0;transition:transform 300ms ease, opacity 200ms ease-out}li.active.svelte-1lsfq0o>span.svelte-1lsfq0o::before{transform:scaleX(1);opacity:1}",
  map: `{"version":3,"file":"Tabs.svelte","sources":["Tabs.svelte"],"sourcesContent":["<script>\\n\\timport {fade, slide} from 'svelte/transition'\\n  export let items = [];\\n  export let activeTabValue = 0;\\n\\n  const handleClick = tabValue => () => (activeTabValue = tabValue);\\n<\/script>\\n\\n<ul>\\n{#each items as item}\\n\\t<li class={activeTabValue === item?.value ? 'active' : ''} transition:fade>\\n\\t\\t<span on:click={handleClick(item?.value)}>{item?.label}</span>\\n\\t</li>\\n{/each}\\n</ul>\\n{#each items as item}\\n\\t{#if activeTabValue == item?.value}\\n\\t<div class=\\"box\\" in:slide={{delay:400, duration:300}} out:slide={{duration:200}}>\\n\\t\\t<svelte:component this={item?.component}  {...item?.props}/>\\n\\t</div>\\n\\t{/if}\\n{/each}\\n<style>\\n\\n\\t.box {\\n    padding: .5rem;\\n\\tborder: 1px solid #dee2e6;\\n    border-radius: 0 0 4px 4px;\\n    border-top: 0;\\n\\t}\\n  ul {\\n    display: flex;\\n    padding-left: 0;\\n    margin-bottom: 0;\\n    list-style: none;\\n    border-bottom: 1px solid #dee2e6;\\n    flex-wrap: wrap;\\n    overflow: hidden;\\n  }\\n\\n\\tli {\\n\\t\\tmargin-bottom: -1px;\\n\\t}\\n\\n  span {\\n    border: 1px solid transparent;\\n    border-top-left-radius: 0.25rem;\\n    border-top-right-radius: 0.25rem;\\n    display: block;\\n    padding: 0.5rem 1rem;\\n    cursor: pointer;\\n\\tposition:relative;\\n\\tuser-select: none;\\n  }\\n\\n  span:hover {\\n    border-color: #e9ecef #e9ecef #dee2e6;\\n  }\\n\\n  li.active > span {\\n    color: var(--brand);\\n    border-color: #dee2e6 #dee2e6 #fff;\\n  }\\n\\t\\n\\tli > span::before{\\n\\t\\tcontent:'';\\n\\t\\tposition:absolute;\\n\\t\\tbottom:0;\\n\\t\\tleft:0;\\n\\t\\theight:3px;\\n\\t\\tbackground: var(--brand);\\n\\t\\twidth:100%;\\n\\t\\ttransform-origin:0 50%;\\n\\t\\ttransform: scaleX(0);\\n\\t\\topacity:0;\\n\\t\\ttransition: transform 300ms ease, opacity 200ms ease-out;\\n\\t}\\n\\t\\n\\tli.active > span::before{\\n\\t\\t\\ttransform: scaleX(1);\\n\\t\\t\\topacity:1;\\n\\t}\\n</style>"],"names":[],"mappings":"AAwBC,IAAI,8BAAC,CAAC,AACH,OAAO,CAAE,KAAK,CACjB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACtB,aAAa,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,GAAG,CAC1B,UAAU,CAAE,CAAC,AAChB,CAAC,AACA,EAAE,8BAAC,CAAC,AACF,OAAO,CAAE,IAAI,CACb,YAAY,CAAE,CAAC,CACf,aAAa,CAAE,CAAC,CAChB,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAChC,SAAS,CAAE,IAAI,CACf,QAAQ,CAAE,MAAM,AAClB,CAAC,AAEF,EAAE,8BAAC,CAAC,AACH,aAAa,CAAE,IAAI,AACpB,CAAC,AAEA,IAAI,8BAAC,CAAC,AACJ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,WAAW,CAC7B,sBAAsB,CAAE,OAAO,CAC/B,uBAAuB,CAAE,OAAO,CAChC,OAAO,CAAE,KAAK,CACd,OAAO,CAAE,MAAM,CAAC,IAAI,CACpB,MAAM,CAAE,OAAO,CAClB,SAAS,QAAQ,CACjB,WAAW,CAAE,IAAI,AAChB,CAAC,AAED,kCAAI,MAAM,AAAC,CAAC,AACV,YAAY,CAAE,OAAO,CAAC,OAAO,CAAC,OAAO,AACvC,CAAC,AAED,EAAE,sBAAO,CAAG,IAAI,eAAC,CAAC,AAChB,KAAK,CAAE,IAAI,OAAO,CAAC,CACnB,YAAY,CAAE,OAAO,CAAC,OAAO,CAAC,IAAI,AACpC,CAAC,AAEF,iBAAE,CAAG,mBAAI,QAAQ,CAAC,AACjB,QAAQ,EAAE,CACV,SAAS,QAAQ,CACjB,OAAO,CAAC,CACR,KAAK,CAAC,CACN,OAAO,GAAG,CACV,UAAU,CAAE,IAAI,OAAO,CAAC,CACxB,MAAM,IAAI,CACV,iBAAiB,CAAC,CAAC,GAAG,CACtB,SAAS,CAAE,OAAO,CAAC,CAAC,CACpB,QAAQ,CAAC,CACT,UAAU,CAAE,SAAS,CAAC,KAAK,CAAC,IAAI,CAAC,CAAC,OAAO,CAAC,KAAK,CAAC,QAAQ,AACzD,CAAC,AAED,EAAE,sBAAO,CAAG,mBAAI,QAAQ,CAAC,AACvB,SAAS,CAAE,OAAO,CAAC,CAAC,CACpB,QAAQ,CAAC,AACX,CAAC"}`
};
var Tabs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { items = [] } = $$props;
  let { activeTabValue = 0 } = $$props;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.activeTabValue === void 0 && $$bindings.activeTabValue && activeTabValue !== void 0)
    $$bindings.activeTabValue(activeTabValue);
  $$result.css.add(css$1);
  return `<ul class="${"svelte-1lsfq0o"}">${each(items, (item) => `<li class="${escape(null_to_empty(activeTabValue === item?.value ? "active" : "")) + " svelte-1lsfq0o"}"><span class="${"svelte-1lsfq0o"}">${escape(item?.label)}</span>
	</li>`)}</ul>
${each(items, (item) => `${activeTabValue == item?.value ? `<div class="${"box svelte-1lsfq0o"}">${validate_component(item?.component || missing_component, "svelte:component").$$render($$result, Object.assign(item?.props), {}, {})}
	</div>` : ``}`)}`;
});
var load$1 = loginRequired;
var Nilai = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let tabs;
  let semester = [1, 2, 3, 4, 5, 6, 7, 8];
  let result = [];
  let column = ["id", "mata_kuliah", "dosen", "tugas", "uts", "uas", "nilai_akhir", "grade"];
  onMount(async () => {
    semester.forEach(async (i) => {
      let data = await getJSON(`${base}/api/nilai/${i}`);
      result = [...result, data.result];
    });
  });
  {
    if (result.length == 8) {
      const all = [...result].flat();
      result = [...result, all];
    }
  }
  tabs = !result.length ? [] : result.map((v, i) => {
    return {
      component: SortableTable,
      value: i,
      props: {
        row: v,
        column: i == 8 ? [...column, "semester"] : column,
        maxHeight: "25rem"
      },
      label: i == 8 ? "Semua Nilai" : `Semester: ${i + 1}`
    };
  });
  return `${validate_component(Page, "Page").$$render($$result, {
    title: "Lihat Nilai",
    description: "Lihat Nilai Hasil Studi"
  }, {}, {
    default: () => `${!result.length ? `${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}` : `${validate_component(Tabs, "Tabs").$$render($$result, { items: tabs }, {}, {})}`}`
  })}`;
});
var index$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Nilai,
  load: load$1
});
var css = {
  code: "ol.svelte-152n3fm{padding:0 1rem}div.svelte-152n3fm{margin-bottom:1rem}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script context=\\"module\\">\\r\\n    import {loginRequired} from '$lib/scripts/helper'\\r\\n    \\r\\n    export const load = loginRequired\\r\\n<\/script>\\r\\n\\r\\n<script>\\r\\nimport Stack from \\"$lib/Stack.svelte\\";\\r\\nimport SortableTable from \\"$lib/SortableTable.svelte\\";\\r\\nimport TitledBox from \\"$lib/TitledBox.svelte\\";\\r\\nimport { onMount } from \\"svelte\\";\\r\\nimport { getJSON } from \\"$lib/scripts/helper\\";\\r\\nimport { base } from \\"$app/paths\\";\\r\\nimport Page from \\"$lib/Page.svelte\\";\\r\\nimport Spinner from \\"$lib/Spinner.svelte\\";\\r\\nimport { session } from '$app/stores';\\r\\n\\r\\n\\r\\nonMount(async ()=>{\\r\\n    const res = await getJSON( base+'/api/info')\\r\\n    data = res.result\\r\\n})\\r\\n\\r\\nlet data\\r\\n\\r\\nlet column = ['id', 'tanggal', 'informasi', 'link']\\r\\n\\r\\n<\/script>\\r\\n\\r\\n<Page title='SIA STTM - Home' description='{$session.user=='admin'?'Fauki Prayitno ':$session.user} / Mahasiswa / Informatika'>\\r\\n    <br>\\r\\n    <Stack template='55% calc(45% - 2em)'>\\r\\n        <TitledBox name='Info Terbaru'>\\r\\n            {#if !data}\\r\\n                <Spinner></Spinner>\\r\\n            {:else} \\r\\n            <SortableTable row={data} {column}></SortableTable>\\r\\n            {/if}\\r\\n        </TitledBox>\\r\\n        <TitledBox name='Visi dan Misi'>\\r\\n            <div>\\r\\n                <b>Visi:</b>\\r\\n                <br>\\r\\n                <p>Menjadi Perguruan Teknik Yang Unggul Berdasarkan Nilai-Nilai Islam</p>\\r\\n            </div>\\r\\n            <div>\\r\\n                <b>Misi:</b>\\r\\n                <ol>\\r\\n                    <li>\\r\\n                        Menyelenggarakan Pendidikan Tinggi dalam bidang teknologi\\r\\n                    </li>\\r\\n                    <li>\\r\\n                        Menyelenggaran Penelitian dan Pengabdian Masyarakat dalam penerapan teknologi\\r\\n                    </li>\\r\\n                    <li>\\r\\n                        Menyelenggarakan Pengelolaan Perguruan Tinggi berdasarkan Al-Qur\u2019an dan As-sunah\\r\\n                    </li>\\r\\n                    <li>\\r\\n                        Mengembangkan peserta didik agar menguasai pengetahuan dan penerapan teknologi yang mempunyai landasan Islam yang kokoh\\r\\n                    </li>\\r\\n                </ol>\\r\\n            </div>\\r\\n        </TitledBox>\\r\\n    </Stack>\\r\\n    <br>\\r\\n</Page>\\r\\n\\r\\n<style>\\r\\n    ol{\\r\\n        padding: 0 1rem;\\r\\n    }\\r\\n    \\r\\n    div{\\r\\n        margin-bottom: 1rem;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAoEI,iBAAE,CAAC,AACC,OAAO,CAAE,CAAC,CAAC,IAAI,AACnB,CAAC,AAED,kBAAG,CAAC,AACA,aAAa,CAAE,IAAI,AACvB,CAAC"}`
};
var load = loginRequired;
var Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $session, $$unsubscribe_session;
  $$unsubscribe_session = subscribe(session, (value) => $session = value);
  onMount(async () => {
    const res = await getJSON(base + "/api/info");
    data = res.result;
  });
  let data;
  let column = ["id", "tanggal", "informasi", "link"];
  $$result.css.add(css);
  $$unsubscribe_session();
  return `${validate_component(Page, "Page").$$render($$result, {
    title: "SIA STTM - Home",
    description: ($session.user == "admin" ? "Fauki Prayitno " : $session.user) + " / Mahasiswa / Informatika"
  }, {}, {
    default: () => `<br>
    ${validate_component(Stack, "Stack").$$render($$result, { template: "55% calc(45% - 2em)" }, {}, {
      default: () => `${validate_component(TitledBox, "TitledBox").$$render($$result, { name: "Info Terbaru" }, {}, {
        default: () => `${!data ? `${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}` : `${validate_component(SortableTable, "SortableTable").$$render($$result, { row: data, column }, {}, {})}`}`
      })}
        ${validate_component(TitledBox, "TitledBox").$$render($$result, { name: "Visi dan Misi" }, {}, {
        default: () => `<div class="${"svelte-152n3fm"}"><b>Visi:</b>
                <br>
                <p>Menjadi Perguruan Teknik Yang Unggul Berdasarkan Nilai-Nilai Islam</p></div>
            <div class="${"svelte-152n3fm"}"><b>Misi:</b>
                <ol class="${"svelte-152n3fm"}"><li>Menyelenggarakan Pendidikan Tinggi dalam bidang teknologi
                    </li>
                    <li>Menyelenggaran Penelitian dan Pengabdian Masyarakat dalam penerapan teknologi
                    </li>
                    <li>Menyelenggarakan Pengelolaan Perguruan Tinggi berdasarkan Al-Qur\u2019an dan As-sunah
                    </li>
                    <li>Mengembangkan peserta didik agar menguasai pengetahuan dan penerapan teknologi yang mempunyai landasan Islam yang kokoh
                    </li></ol></div>`
      })}`
    })}
    <br>`
  })}`;
});
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Home,
  load
});
var Spin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `



${$$result.head += `<link rel="${"stylesheet"}" href="${"/global.css"}" data-svelte="svelte-miccm7"><link rel="${"favicon"}" href="${"/favicon.png"}" data-svelte="svelte-miccm7">${$$result.title = `<title>Landing</title>`, ""}<meta name="${"description"}" content="${"Landing Page"}" data-svelte="svelte-miccm7"><link rel="${"manifest"}" href="${"/manifest.json"}" data-svelte="svelte-miccm7">`, ""}

${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Spin
});

// .svelte-kit/vercel/entry.js
init();
var entry_default = async (req, res) => {
  const { pathname, searchParams } = new URL(req.url || "", "http://localhost");
  let body;
  try {
    body = await getRawBody(req);
  } catch (err) {
    res.statusCode = err.status || 400;
    return res.end(err.reason || "Invalid request body");
  }
  const rendered = await render({
    method: req.method,
    headers: req.headers,
    path: pathname,
    query: searchParams,
    rawBody: body
  });
  if (rendered) {
    const { status, headers, body: body2 } = rendered;
    return res.writeHead(status, headers).end(body2);
  }
  return res.writeHead(404).end();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
