"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var misc_1 = require("@winkgroup/misc");
var console_log_1 = __importDefault(require("@winkgroup/console-log"));
var lodash_1 = __importDefault(require("lodash"));
var EventQueue = /** @class */ (function () {
    function EventQueue() {
        this.list = [];
        this.consoleLog = new console_log_1.default({ prefix: 'EventQueue' });
    }
    EventQueue.prototype.add = function (listener) {
        var id = (0, uuid_1.v4)();
        this.list.push({
            id: id,
            func: listener
        });
        var listenerStr = (0, misc_1.collapse)(listener.toString(), 50);
        this.consoleLog.debug("added ".concat(id, ": ").concat(listenerStr));
    };
    EventQueue.prototype.remove = function (id) {
        var prevNumber = this.list.length;
        if (prevNumber === 0)
            return;
        this.list = lodash_1.default.remove(this.list, function (el) { return el.id === id; });
        if (this.list.length === prevNumber)
            this.consoleLog.warn("listener with id \"".concat(id, "\", not found and not removed"));
    };
    EventQueue.prototype.fire = function (params) {
        var el = this.list.shift();
        if (el)
            el.func(params);
    };
    return EventQueue;
}());
exports.default = EventQueue;
