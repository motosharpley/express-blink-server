"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _express = _interopRequireDefault(require("express"));
var _pay = require("@solana/pay");
var _web = require("@solana/web3.js");
var _bignumber = _interopRequireDefault(require("bignumber.js"));
var _splToken = require("@solana/spl-token");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; } // @ts-check
// @ts-check
// Removed unused import 'links' from 'express/lib/response'
//Initialize the app
var app = (0, _express["default"])();
var connection = new _web.Connection('https://api.devnet.solana.com', 'confirmed');
//Use JSON middleware to parse JSON request bodies
app.use(_express["default"].json());

//Start the server
var PORT = 0;
app.listen(PORT, function () {
  console.log("Server is running on http://localhost:".concat(PORT));
});
app.get('/', function (req, res) {
  res.status(200).send('Hello, Blink Server!');
});

//Define a Solana Pay Transaction Request GET endpoint
app.get('/pay', function (req, res) {
  var label = 'Hello, Solana Pay!';
  var icon = '🌍';
  res.status(200).json({
    label: label,
    icon: icon
  });
});

//Define a Solana Pay Transaction Request POST endpoint
app.post('/pay', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body;
    var accountField, sender, splToken, MERCHANT_WALLET, createSplTransferIx, _createSplTransferIx, splTransferIx, blockhash, transaction, serializedTransaction, base64Transaction, message;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _createSplTransferIx = function _createSplTransferIx3() {
            _createSplTransferIx = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(sender, connection) {
              var senderInfo, senderATA, senderAccount, merchantATA, merchantAccount, mint, amount, tokens, splTransferIx, references, _i, _references, pubkey;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return connection.getAccountInfo(sender);
                  case 2:
                    senderInfo = _context.sent;
                    if (senderInfo) {
                      _context.next = 5;
                      break;
                    }
                    throw new Error('sender not found');
                  case 5:
                    _context.next = 7;
                    return (0, _splToken.getAssociatedTokenAddress)(splToken, sender);
                  case 7:
                    senderATA = _context.sent;
                    _context.next = 10;
                    return (0, _splToken.getAccount)(connection, senderATA);
                  case 10:
                    senderAccount = _context.sent;
                    if (senderAccount.isInitialized) {
                      _context.next = 13;
                      break;
                    }
                    throw new Error('sender not initialized');
                  case 13:
                    if (!senderAccount.isFrozen) {
                      _context.next = 15;
                      break;
                    }
                    throw new Error('sender frozen');
                  case 15:
                    _context.next = 17;
                    return (0, _splToken.getAssociatedTokenAddress)(splToken, MERCHANT_WALLET);
                  case 17:
                    merchantATA = _context.sent;
                    _context.next = 20;
                    return (0, _splToken.getAccount)(connection, merchantATA);
                  case 20:
                    merchantAccount = _context.sent;
                    if (merchantAccount.isInitialized) {
                      _context.next = 23;
                      break;
                    }
                    throw new Error('merchant not initialized');
                  case 23:
                    if (!merchantAccount.isFrozen) {
                      _context.next = 25;
                      break;
                    }
                    throw new Error('merchant frozen');
                  case 25:
                    _context.next = 27;
                    return (0, _splToken.getMint)(connection, splToken);
                  case 27:
                    mint = _context.sent;
                    if (mint.isInitialized) {
                      _context.next = 30;
                      break;
                    }
                    throw new Error('mint not initialized');
                  case 30:
                    // You should always calculate the order total on the server to prevent
                    // people from directly manipulating the amount on the client
                    amount = 10; // Check that the sender has enough tokens
                    tokens = BigInt(String(amount));
                    if (!(tokens > senderAccount.amount)) {
                      _context.next = 34;
                      break;
                    }
                    throw new Error('insufficient funds');
                  case 34:
                    // Create an instruction to transfer SPL tokens, asserting the mint and decimals match
                    splTransferIx = (0, _splToken.createTransferCheckedInstruction)(senderATA, splToken, merchantATA, sender, tokens, mint.decimals); // Create a reference that is unique to each checkout session
                    references = [new _web.Keypair().publicKey]; // add references to the instruction
                    for (_i = 0, _references = references; _i < _references.length; _i++) {
                      pubkey = _references[_i];
                      splTransferIx.keys.push({
                        pubkey: pubkey,
                        isWritable: false,
                        isSigner: false
                      });
                    }
                    return _context.abrupt("return", splTransferIx);
                  case 38:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return _createSplTransferIx.apply(this, arguments);
          };
          createSplTransferIx = function _createSplTransferIx2(_x3, _x4) {
            return _createSplTransferIx.apply(this, arguments);
          };
          // Account provided in the transaction req.body by the wallet.
          accountField = (_req$body = req.body) === null || _req$body === void 0 ? void 0 : _req$body.account;
          if (accountField) {
            _context2.next = 5;
            break;
          }
          throw new Error('missing account');
        case 5:
          if (!(typeof accountField !== 'string')) {
            _context2.next = 7;
            break;
          }
          throw new Error('invalid account');
        case 7:
          sender = new _web.PublicKey(accountField);
          splToken = new _web.PublicKey('Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr');
          MERCHANT_WALLET = new _web.PublicKey('5CfEty3pffxuWVhRg9VaJjdZ9TBfgHxgPMceEhuikuap'); // create spl transfer instruction
          _context2.next = 12;
          return createSplTransferIx(sender, connection);
        case 12:
          splTransferIx = _context2.sent;
          _context2.next = 15;
          return connection.getLatestBlockhash();
        case 15:
          blockhash = _context2.sent;
          // create the transaction
          transaction = new _web.VersionedTransaction(new _web.TransactionMessage({
            payerKey: sender,
            recentBlockhash: blockhash.blockhash,
            // add the instruction to the transaction
            instructions: [splTransferIx]
          }).compileToV0Message());
          serializedTransaction = transaction.serialize();
          base64Transaction = Buffer.from(serializedTransaction).toString('base64');
          message = 'Thank you for your purchase!';
          res.status(200).json({
            transaction: base64Transaction,
            message: message
          });
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

/*
// Define a Solana Actions GET endpoint
export interface ActionGetResponse {
  // image url that represents the source of the action request
  icon: string;
  // describes the source of the action request
  title: string;
  // brief summary of the action to be performed
  description: string;
  // button text rendered to the user
  label: string;
  // UI state for the button being rendered to the user
  disabled?: boolean;
  links?: {
    // list of related Actions a user could perform
    actions: LinkedAction[],
  };
  // non-fatal error message to be displayed to the user
  error?: ActionError;
}
*/

app.get('/actions/vote', function (req, res) {
  var title = 'Hello Solana Actions!';
  var icon = '🌍';
  res.status(200).json({
    title: 'GigL Meme Contest',
    icon: '<url-to-image>',
    description: 'Vote on the top meme of the week!',
    label: 'Vote',
    links: {
      actions: [{
        label: 'Vote MEME1',
        // button text
        href: '/actions/memes/vote?choice=meme1'
      }, {
        label: 'Vote MEME2',
        // button text
        href: '/actions/memes/vote?choice=meme2'
      }]
    }
  });
});

// Define a Solana Actions POST endpoint
app.post('/actions/vote', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var accountField, sender, base64TX;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          // Account provided in the transaction request body by the wallet.
          accountField = req.body.account;
          if (accountField) {
            _context3.next = 3;
            break;
          }
          throw new Error('missing account');
        case 3:
          sender = new _web.PublicKey(accountField); // TODO Build a transaction object
          // TODO base64 encoded transaction
          base64TX = req.body;
          res.status(200).json({
            transaction: base64TX,
            message: 'Hello, Vote POST request!'
          });
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());