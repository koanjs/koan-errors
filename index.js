/**
 * Dependencies
 */
var render = require('co-render');
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

  // Template
  var template = opts.template || __dirname + '/errors.html';
  var engine = opts.engine || 'swig';

  // Environment
  var env = process.env.NODE_ENV || 'development';

  return function *errors(next){
    try {
      yield next;
      if (this.status == null) this.throw(404);
    }
    catch (error) {
      this.status = error.status || 500;

      // Error event
      this.app.emit('error', error, this);

      // Accepted types
      switch (this.accepts('html', 'json')) {
        case 'json':
          if (env == 'development')
            this.body = { error: error.message };
          else
            this.body = { error: http.STATUS_CODES[this.status] }
          break;

        default:
          this.body = yield render(template, {
            env: env,
            ctx: this,
            request: this.request,
            response: this.response,
            error: error.message,
            stack: error.stack,
            status: error.status,
            code: error.code,
            engine: engine
          });
          break;
      }
    }
  }
}
