'use strict';

/**
 * Dependencies
 */
var should = require('should');
var request = require('supertest');
var path = require('path');
var koa = require('koa');
var errors = require('../');
var app;

describe('Error middleware', function() {
  beforeEach(function(done) {
    app = koa();

    done();
  });

  it('should be able to use custom templates', function(done) {
    app.use(errors({
      template: path.join(__dirname, 'fixtures', 'custom.html')
    }));

    request(app.listen())
      .get('/nowhere')
      .expect(/Custom error: 404!/)
      .end(function(err, res) {
        should(err).not.be.ok;

        done();
      });
  });

  it('should display the default file if the template is not set', function(done) {
    app.use(errors());
    
    request(app.listen())
      .get('/nowhere')
      .expect(/Error - 404/)
      .end(function(err, res) {
        should(err).not.be.ok;

        done();
      });
  });

  it('should return 404 if no matching route found', function(done) {
    app.use(errors());
    
    request(app.listen())
      .get('/nowhere')
      .expect(404)
      .end(function(err, res) {
        should(err).not.be.ok;

        done();
      });
  });

  it('should return 500 as default error', function(done) {
    app.use(errors());
    app.use(function *(next) {
      throw new Error('Some troubles in paradise!');
    });

    request(app.listen())
      .get('/')
      .expect(500)
      .end(function(err, res) {
        should(err).not.be.ok;

        done();
      });
  });

  it('should be able to accept templating engine as a parameter', function(done) {
    app.use(errors({
      template: path.join(__dirname, 'fixtures', 'custom.ejs'),
      engine: 'ejs'
    }));

    request(app.listen())
      .get('/nowhere')
      .expect(/Custom error: 404!/)
      .end(function(err, res) {
        should(err).not.be.ok;

        done();
      });
  });

  it('should work with JSON', function(done) {
    app.use(errors());
    app.use(function *(next) {
      throw new Error('JSONg!');
    });

    request(app.listen())
      .get('/')
      .set('Accept', 'application/json')
      .expect(500)
      .expect('Content-Type', /json/)
      .expect('{"error":"Internal Server Error (500)"}')
      .end(function(err, res) {
        should(err).not.be.ok;

        done();
      });
  });
});
