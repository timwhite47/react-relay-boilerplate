var babelRelayPlugin = require('babel-relay-plugin');
var introspectionQuery = require('graphql/utilities').introspectionQuery;
var request = require('sync-request');

var graphQLEndpoint = 'http://localhost:8081/graphql';
var response = request('GET', graphQLEndpoint, {
  qs: {
    query: introspectionQuery
  }
});

var schema = JSON.parse(response.body.toString('utf-8'));
console.log(schema);
module.exports = babelRelayPlugin(schema.data, {
  abortOnError: true,
});
