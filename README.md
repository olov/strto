# strto.js
strto is a strict string-to-number conversion library. Works in node and browsers.



## Usage
`var strto = require("strto"); // or include strto.js in a <script> tag`

### `strto.safeint(str: string, errval: any): (number | errval)`

`strto.safeint` converts a string that apart from digits may only contain an optional leading `-`
(no `.`, `+`, whitespace or any other characters). Put another way, `str` must
match `/^-?[0-9]+$/`. If such a string is possible to convert exactly to a JavaScript integer
number, i.e. it fits within the range `[-9007199254740991, 9007199254740991]`, then that number
will be returned. In all other cases (be it out of range or invalid string characters), `errval`
will be returned. The base is always 10. Negative zero (a floating point peculiarity) will be
normalized to integer zero.

### `strto.inexactint(str: string, errval: any): (number | errval)`

`strto.inexactint` is like `strto.safeint` except it does not require the return value to fit within
the range `[-9007199254740991, 9007199254740991]`. This means that
`strto.inexactint("123456789123456789", null)` returns a non-null value that is roughly (but not
exactly) similar to `123456789123456789`. It also means that
`strto.inexactint(new Array(400).join("1"), null)` returns `Infinity`. It can however never
return `NaN` or negative zero.

### `strto.finitefloat(str: string, errval: any): (number | errval)`
`strto.finitefloat` converts a string in scientific notation format to a JavaScript
number. This is the everyday floating point notation you're used to in JavaScript and base-10
integers are a subset of it. Valid examples are `"+1"`, `"-0"`, `"15e4"`, `"0.3"`, `".3"`,
`".3e3"`, `".3e+3"` and `".3e-3"`. The string can't contain whitespace or any other characters
not belonging to the number. Put another way, `str` must match
`/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/`. If such a string is possible to convert to a
finite number, i.e. any number that isn't `-Infinity`, `Infinity` or `NaN`, then that number is
returned. In all other cases, `errval` will be returned.

### `strto.float(str: string, errval: any): (number | errval)`
`strto.float` is like `strto.finitefloat` except it does not require the return value to be finite,
so `-Infinity`, `Infinity` and `NaN` are also possible return values.
Put another way, `str` must match `/^([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?|Infinity|-Infinity|NaN)$/`.



## Installation

### Node
Install using npm

    npm install strto

```javascript
var strto = require("strto");
```

### Browser
Clone the repo and include it in a script tag

    git clone https://github.com/olov/strto.git

```html
<script src="strto/strto.js"></script>
```
