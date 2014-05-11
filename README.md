# Koa.js error handling middleware for Koan.js

[![Build Status](https://travis-ci.org/koanjs/koan-errors.png?branch=master)](https://travis-ci.org/koanjs/koan-errors)
[![Dependency Status](https://gemnasium.com/bredikhin/koan-errors.png)](https://gemnasium.com/bredikhin/koan-errors)
[![Coverage Status](https://coveralls.io/repos/bredikhin/koan-errors/badge.png?branch=master)](https://coveralls.io/r/bredikhin/koan-errors?branch=master)
[![NPM version](https://badge.fury.io/js/koan-errors.png)](http://badge.fury.io/js/koan-errors)

Based on [`koa-error`](https://github.com/koajs/error).

Supported content types:

- json
- html

## Installation

```js
$ npm install koan-errors
```

## Options

- `template`: path to template (defaults to the `errors.html` from the package),
- `engine`: templating engine to use (defaults to [`swig`](http://paularmstrong.github.io/swig/)).

## Custom templates

Following local variables are available within a custom template:

- `env`,
- `ctx`,
- `request`,
- `response`,
- `error`,
- `stack`,
- `status`,
- `code`.

## Contributions

* are welcome;
* should be tested;
* should follow [Koa.js](https://github.com/koajs/koa) coding style.

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2014 [Ruslan Bredikhin](http://ruslanbredikhin.com/)
