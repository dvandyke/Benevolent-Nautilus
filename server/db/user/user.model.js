//Create user schema using mongoose
//author: Dennis Yang
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    first: {type: String},
    last: {type: String}
  },
  emailAddress: {type: String, unique: true},
  fitnessDevice: {
    deviceType: {type: String},
    token: {type: String},
    tokenSecret: {type: String},
  },
  oauth: {
    facebook: {
      id: {type: String, sparse: true},
      token: {type: String},
      tokenSecret: {type: String}
    },
    google: {
      id: {type: String, sparse: true},
      token: {type: String},
      tokenSecret: {type: String}
    },
    twitter: {
      id: {type: String, sparse: true},
      token: {type: String},
      tokenSecret: {type: String}
    }
  },
  session: {type: String},
  activity: {
    dailyGoal: {type: Number},
    dailySteps: {type: Number},
    totalSteps: {type: Number}
  },
  friendRequests:[{
    id: {type:Schema.Types.ObjectId, ref: 'User'},
    isAccepted: {type: Boolean}
  }],
  friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
  challenges: [{type: Schema.Types.ObjectId, ref: 'Challenge'}]
});


module.exports = mongoose.model('User', userSchema);
