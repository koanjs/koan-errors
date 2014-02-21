/**
 * Dependencies
 */
var swig = require('swig');
var http = require('http');

/**
 * Expose `error`
 */
module.exports = errors;

/**
 * Error middleware
 *
 *  - `template` defaults to ./errors.html
 *
 * @param {Object} opts
 */
function errors(opts) {
  opts = opts || {};

  // template
  var path = opts.template || __dirname + '/errors.html';
  var render = swig.compileFile(path);

  // env
  var env = process.env.NODE_ENV || 'development';

  return function *errors(next){
    try {
      yield next;
      if (null == this.status) this.throw(404);
    }
    catch (err) {
      this.status = err.status || 500;

      // Error event
      this.app.emit('error', err, this);

      // Accepted types
      switch (this.accepts('html', 'json')) {
        case 'json':
          if ('development' == env) this.body = { error: err.message }
          else if (err.expose) this.body = { error: err.message }
          else this.body = { error: http.STATUS_CODES[this.status] }
          break;

        default:
          this.body = render({
            env: env,
            ctx: this,
            request: this.request,
            response: this.response,
            error: err.message,
            stack: err.stack,
            status: err.status,
            code: err.code
          });
          break;
      }
    }
  }
}
