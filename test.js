"use strict";
const strto = require("./strto")
const assert = require("assert");
const nil = {};

t(isposzero(strto.safeint("0", nil)));
t(isposzero(strto.safeint("-0", nil)));
f(isnegzero(strto.safeint("0", nil)));
f(isnegzero(strto.safeint("-0", nil)));
eq(strto.safeint("0", nil), 0);
eq(strto.safeint("-0", nil), 0);

eq(strto.safeint("9007199254740991", nil), 9007199254740991); // MAX_SAFE_INTEGER
eq(strto.safeint("-9007199254740991", nil), -9007199254740991); // MIN_SAFE_INTEGER
eq(strto.safeint("9007199254740992", nil), nil); // MAX_SAFE_INTEGER + 1
eq(strto.safeint("-9007199254740992", nil), nil); // MIN_SAFE_INTEGER - 1

const manyones = "11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111";
const negmanyones = "-11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111";
eq(strto.safeint(manyones, nil), nil);
eq(strto.safeint(negmanyones, nil), nil);

neq(strto.inexactint(manyones, nil), nil);
t(strto.inexactint(manyones, nil) === Infinity);
neq(strto.inexactint(negmanyones, nil), nil);
t(strto.inexactint(negmanyones, nil) === -Infinity);
t(strto.inexactint("9007199254740992", nil) > 0 && strto.inexactint("9007199254740992", nil) < Infinity);
t(strto.inexactint("-9007199254740992", nil) < 0 && strto.inexactint("-9007199254740992", nil) > -Infinity);

t(isposzero(strto.inexactint("0", nil)));
t(isposzero(strto.inexactint("-0", nil)));
f(isnegzero(strto.inexactint("0", nil)));
f(isnegzero(strto.inexactint("-0", nil)));
eq(strto.inexactint("0", nil), 0);
eq(strto.inexactint("-0", nil), 0);

eq(strto.safeint("+", nil), nil);
eq(strto.safeint("-", nil), nil);
eq(strto.safeint("", nil), nil);
eq(strto.safeint("x", nil), nil);
eq(strto.safeint(" ", nil), nil);
eq(strto.safeint(" 1 ", nil), nil);
eq(strto.safeint("0x1", nil), nil);
eq(strto.safeint("0b1", nil), nil);
eq(strto.safeint("0o1", nil), nil);
eq(strto.safeint(".0", nil), nil);
eq(strto.safeint("0.1", nil), nil);
eq(strto.safeint("1.0", nil), nil);
eq(strto.safeint("1e3", nil), nil);
throws(function() { strto.safeint(undefined, nil) });
throws(function() { strto.safeint(0, nil) });
throws(function() { strto.safeint({}, nil) });
throws(function() { strto.safeint("1") });
throws(function() { strto.safeint() });

eq(strto.safeint("1", nil), 1);
eq(strto.safeint("-1", nil), -1);
eq(strto.safeint("01", nil), 1);
eq(strto.safeint("-01", nil), -1);

eq(strto.safeint("+01", nil), nil);

eq(strto.float("+", nil), nil);
eq(strto.float("-", nil), nil);
eq(strto.float("", nil), nil);
eq(strto.float("x", nil), nil);
eq(strto.float(" ", nil), nil);
eq(strto.float(" 1 ", nil), nil);
eq(strto.float("0x1", nil), nil);
eq(strto.float("0b1", nil), nil);
eq(strto.float("0o1", nil), nil);
eq(strto.float("0", nil), 0);
eq(strto.float("0.1", nil), 0.1);
eq(strto.float(".1", nil), 0.1);
eq(strto.float("1234", nil), 1234);
eq(strto.float("+123.4e4", nil), 123.4e4);
eq(strto.float("123.4e4", nil), 123.4e4);
eq(strto.float("123.4e+4", nil), 123.4e4);
eq(strto.float("123.4e-4", nil), 123.4e-4);
eq(strto.float("+123.4e-4", nil), 123.4e-4);
eq(strto.float("-123.4e-4", nil), -123.4e-4);
eq(strto.float("-123.4e4", nil), -123.4e4);
eq(strto.float("-123.4e+4", nil), -123.4e+4);
eq(strto.float("-12345e-4", nil), -12345e-4);
eq(strto.float("-12345e4", nil), -12345e4);
eq(strto.float("12345e-4", nil), 12345e-4);
eq(strto.float("12345e4", nil), 12345e4);
eq(strto.float("+12345e-4", nil), 12345e-4);
eq(strto.float("+12345e4", nil), 12345e4);
neq(strto.float(manyones, nil), nil);
t(strto.float(manyones, nil) === Infinity);
neq(strto.float(negmanyones, nil), nil);
t(strto.float(negmanyones, nil) === -Infinity);
t(strto.float("9007199254740992", nil) > 0 && strto.float("9007199254740992", nil) < Infinity);
t(strto.float("-9007199254740992", nil) < 0 && strto.float("-9007199254740992", nil) > -Infinity);

t(isNaN(strto.float("NaN", nil)));
eq(strto.float("Infinity", nil), Infinity);
eq(strto.float("-Infinity", nil), -Infinity);
eq(strto.float(manyones, nil), Infinity);
eq(strto.float(negmanyones, nil), -Infinity);
eq(strto.float("1e10000", nil), Infinity);
eq(strto.float("-1e10000", nil), -Infinity);

eq(strto.finitefloat("NaN", nil), nil);
eq(strto.finitefloat("Infinity", nil), nil);
eq(strto.finitefloat("-Infinity", nil), nil);
eq(strto.finitefloat(manyones, nil), nil);
eq(strto.finitefloat(negmanyones, nil), nil);
eq(strto.finitefloat("1e10000", nil), nil);
eq(strto.finitefloat("-1e10000", nil), nil);
t(strto.finitefloat("9007199254740992", nil) > 0 && strto.finitefloat("9007199254740992", nil) < Infinity);
t(strto.finitefloat("-9007199254740992", nil) < 0 && strto.finitefloat("-9007199254740992", nil) > -Infinity);

t(isposzero(strto.finitefloat("0", nil)));
t(isnegzero(strto.finitefloat("-0", nil)));
t(isposzero(strto.finitefloat("0.1e-1000", nil)));
t(isnegzero(strto.finitefloat("-0.1e-1000", nil)));
eq(strto.finitefloat("0", nil), 0);
eq(strto.finitefloat("-0", nil), 0);

t(isposzero(strto.float("0", nil)));
t(isnegzero(strto.float("-0", nil)));
t(isposzero(strto.float("0.1e-1000", nil)));
t(isnegzero(strto.float("-0.1e-1000", nil)));
eq(strto.float("0", nil), 0);
eq(strto.float("-0", nil), 0);


console.log("all ok");



// ---
function eq(a, b) {
    assert(a === b);
}
function neq(a, b) {
    assert(a !== b);
}

function t(v) {
    assert(v);
}
function f(v) {
    assert(!v);
}
function throws(fn) {
    try {
        fn();
    } catch(e) {
        return;
    }
    assert(false);
}

function isposzero(v) {
    return v === 0 && (1 / v === Infinity);
}
assert(isposzero(0)); // self-test
assert(!isposzero(-0)); // self-test
function isnegzero(v) {
    return v === 0 && (1 / v === -Infinity);
}
assert(!isnegzero(0)); // self-test
assert(isnegzero(-0)); // self-test
