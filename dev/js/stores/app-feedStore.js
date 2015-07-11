var AppDispatcher = require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
var assign = require("react/lib/Object.assign");
var EventEmitter = require('events').EventEmitter;



//  all or most recent photo requests
var _requestList = {};

var _receiveRequests = function(requests) {
  for (var i = 0; i < requests.length; i++) {
    _requestList[requests[i].id] = requests[i];
  }
};

var FeedStore = assign({},EventEmitter.prototype, {
  getAllRequests: function() {
    return _requestList;
  },

  getRequest: function(id) {
    return _requestList[id];
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

FeedStore.dispatchToken = AppDispatcher.register(function(action) {
  
  switch(action.type) {

    case AppConstants.RECEIVE_REQUESTS:
      _receiveRequests(action.data.data);
      FeedStore.emitChange();
      break;



    default:
  }
});


module.exports = FeedStore;

