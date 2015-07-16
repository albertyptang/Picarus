var React = require('react');
var Feed = require('./feed/app-feed');
var Gallery = require('./gallery/app-gallery');
var Header = require('./header/app-header');
var Request = require('./request/app-request');
var Signin = require('./signin/app-signin');
var Template = require('./app-template');
var dbUtils = require('../utils/database-utils');
require('../actions/socket-actions.js');

var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;



var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function(){
    return (
      <Template>
        <RouteHandler />
        <Feed />
      </Template>
    );
  }
});

var routes = (
  <Route handler={App}>
    <Route name="requests" path="/requests/:requestId" handler={Request}/>
    <Route name="gallery" path="/" handler={Gallery} />
  </Route>
);

module.exports = function(){
  Router.run(routes, Router.HashLocation, function(App) {
    React.render(<App />, document.getElementById("main"));
  });
};