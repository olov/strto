// strto.js
// MIT licensed, see LICENSE file
// Copyright (c) 2015 Olov Lassus <olov.lassus@gmail.com>

var strto = (function() {
    "use strict";

    return {
        safeint: safeint,
        inexactint: inexactint,
        finitefloat: finitefloat,
        float: float,
    };

    function safeint(str, errval) {
        if (typeof str !== "string") {
            throw new Error("safeint: expected first argument of type string but got a " + typeof str);
        }
        if (arguments.length < 2) {
            throw new Error("safeint: missing second argument");
        }
        if (!/^-?[0-9]+$/.test(str)) {
            return errval;
        }
        var v = parseInt(str, 10);
        return (v > 9007199254740991 || v < -9007199254740991) ? errval : ((v === 0) ? (v | 0) : v);
    }

    function inexactint(str, errval) {
        if (typeof str !== "string") {
            throw new Error("inexactint: expected first argument of type string but got a " + typeof str);
        }
        if (arguments.length < 2) {
            throw new Error("inexactint: missing second argument");
        }
        if (!/^-?[0-9]+$/.test(str)) {
            return errval;
        }
        var v = parseInt(str, 10);
        return (v === 0) ? (v | 0) : v;
    }

    function finitefloat(str, errval) {
        if (typeof str !== "string") {
            throw new Error("finitefloat: expected first argument of type string but got a " + typeof str);
        }
        if (arguments.length < 2) {
            throw new Error("finitefloat: missing second argument");
        }
        if (!/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/.test(str)) {
            return errval;
        }
        var v = parseFloat(str);
        return isFinite(v) ? v : errval;
    }

    function float(str, errval) {
        if (typeof str !== "string") {
            throw new Error("float: expected first argument of type string but got a " + typeof str);
        }
        if (arguments.length < 2) {
            throw new Error("float: missing second argument");
        }
        if (!/^([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?|Infinity|-Infinity|NaN)$/.test(str)) {
            return errval;
        }
        return parseFloat(str);
    }
})();

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = strto;
}
