"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  Connections singleton instance.
 *  This class should be used to setup connection during the boot process
 */
class Connections {
    /**
     * The Connections's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    constructor() { }
    static set(key, connection) {
        Connections.connections[key] = connection;
    }
    static get(key) {
        return Connections.connections[key] ? Connections.connections[key] : false;
    }
}
exports.default = Connections;
Connections.connections = {};
