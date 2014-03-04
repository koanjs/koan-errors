'use strict';

/**
 * Dependencies
 */
var should = require('should');
var request = require('supertest');
var koa = require('koa');
var errors = require('../');
var app;

describe('Error middleware', function() {
  beforeEach(function(done) {
    app = koa();
    app.use(errors());

    done();
  });

  it('should display the default file if the template is not set', function(done) {
    app.use(function *(next) {
      throw new Error('Some troubles in paradise!');
    });
    
    request(app.listen())
      .get('/')
      .expect(500)
      .expect(/Error - 500/)
      .end(function(err, res) {
        should(err).not.be.ok;

        done();
      });
  });
});
