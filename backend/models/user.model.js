var AWS = require("aws-sdk");
require("dotenv").config();

console.log(process.env.AWS_REGION);
console.log(process.env.AWS_ACCESS_KEY_ID);
console.log(process.env.AWS_SECRET_ACCESS_KEY);

const config = {
  region: "us-east-1",
  accessKeyId: "ASIATB245AOUET4EUOOT",
  secretAccessKey: "2ek03qSTOo5PL1rEC2MBsDyajYhHPZabomlPVfO4",
  sessionToken:
    "FwoGZXIvYXdzELD//////////wEaDFHpbzftdTm0jw9mZCLGAeJk0bqly+CnVqLlxA2OYuOj2AkS9E2DZy+5mvljgeoEg0Flbf8NN0F+XPIevRsmgIQwilq8pf8vylZ6bDtkeLnQYqya/u+pzeRr2OPwtec1dGtmxM1NAdyiv00HIGGKsaTkfFI98RQvGTCYBoGKXIcvFkviKLQaQU49IEEkC/GUt6O1eloBJjMT1d0FaE0ZaodPm+cuqYKAF/Tuq7+nZJLiA/tO8t7RoRvAzk8KnBioe7c7Abo6I9CXYatYeHQhoTtQxAq0HyjrhoeiBjItcyl57grsKXDLnQaJzJVkJ1aDGGXL7KmOqZVgVzCIcUHkfE5z2vKKETS96DvY",
};

var db = new AWS.DynamoDB(config);

function cleanUser(obj) {
  var cleaned = {};
  cleaned["username"] = obj.username.S;
  cleaned["salt"] = obj.salt.S;
  cleaned["hash_pw"] = obj.hash_pw.S;
  cleaned["email"] = obj.email.S;
  cleaned["first"] = obj.first.S;
  cleaned["last"] = obj.last.S;
  cleaned["birth"] = obj.birth.S;
  cleaned["last_login"] = obj.last_login.S;
  return cleaned;
}
// get user from users table
var myDB_getUser = async function (user) {
  var params = {
    KeyConditionExpression: "username = :k",
    ExpressionAttributeValues: {
      ":k": { S: user },
    },
    TableName: "users",
  };

  const data = await db.query(params).promise();
  if (data.Items.length == 0) {
    return null;
  } else {
    var obj = data.Items[0];
    var cleaned = cleanUser(obj);
    return cleaned;
  }
};

// get chats for a particular user
var myDB_getChannels = async function (username) {
  myDB_getUser(username).then(function (data) {
    return data.chats;
  });
};

// get all users
var myDB_allusers = async function () {
  const params = {
    TableName: "users",
  };

  const scanResults = [];
  let items = [];
  do {
    items = await db.scan(params).promise();
    items.Items.forEach((item) => scanResults.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey !== "undefined");
  const results = [];
  for (var i = 0; i < scanResults.length; i++) {
    results.push(cleanUser(scanResults[i]));
  }
  return results;
};

var myDB_createUser = async function (userDict) {
  var params = {
    Item: {
      username: { S: userDict.username },
      salt: { S: userDict.salt },
      hash_pw: { S: userDict.hash_pw },
      email: { S: userDict.email },
      first: { S: userDict.first },
      last: { S: userDict.last },
      birth: { S: userDict.birth },
      numPosts: { N: userDict.numPosts.toString() },
      last_login: { S: userDict.last_login },
      chats: { L: userDict.chats },
    },
    TableName: "users",
    ConditionExpression: "attribute_not_exists(username)",
  };
  try {
    // putItem doesn't return anything if successful/unsuccessful
    const data = await db.putItem(params).promise();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

var myDB_updateLogin = async function (username, login) {
  var params = {
    Key: {
      username: { S: username },
    },
    UpdateExpression: "SET last_login = :login",
    ExpressionAttributeValues: {
      ":login": { S: login },
    },
    TableName: "users",
    ReturnValues: "ALL_NEW", // should return dict of all attributes of item, may need to double check what is returned
  };

  const data = await db.updateItem(params).promise();
  if (data.Attributes) {
    return cleanUser(data.Attributes);
  } else {
    return null;
  }
};

// email salt hash affiliation interests
var myDB_updateUser = async function (dict) {
  var params = {
    Key: {
      username: dict.user,
    },
    UpdateExpression:
      "SET email :email, salt :salt, hash :hash, affiliation :affiliation, interests :interests",
    ExpressionAttributeValues: {
      ":email": dict.email,
      ":salt": dict.salt,
      ":hash": dict.hash,
    },
    TableName: "users",
    ReturnValues: "ALL_NEW", // should return dict of all attributes of item, may need to double check what is returned
  };
  const data = await db.updateItem(params).promise();
  if (data) {
    var obj = data.Attributes;
    return cleanUser(obj);
  } else {
    return null;
  }
};

// update affiliations
var myDB_updateAffiliation = async function (username, affiliation) {
  var params = {
    Key: {
      username: { S: username },
    },
    UpdateExpression: "SET affiliation = :affiliation",
    ExpressionAttributeValues: {
      ":affiliation": { S: affiliation },
    },
    TableName: "users",
    ReturnValues: "ALL_NEW", // should return dict of all attributes of item, may need to double check what is returned
  };
  const data = await db.updateItem(params).promise();
  if (data) {
    var obj = data.Attributes;
    return cleanUser(obj);
  } else {
    return null;
  }
};

// update email
var myDB_updateEmail = async function (username, email) {
  var params = {
    Key: {
      username: { S: username },
    },
    UpdateExpression: "SET email = :email",
    ExpressionAttributeValues: {
      ":email": { S: email },
    },
    TableName: "users",
    ReturnValues: "ALL_NEW", // should return dict of all attributes of item, may need to double check what is returned
  };
  const data = await db.updateItem(params).promise();
  if (data) {
    var obj = data.Attributes;
    return cleanUser(obj);
  } else {
    return null;
  }
};

// update password
var myDB_updatePassword = async function (username, hash, salt) {
  var params = {
    Key: {
      username: { S: username },
    },
    UpdateExpression: "SET hash_pw = :h, salt = :salt",
    ExpressionAttributeValues: {
      ":h": { S: hash },
      ":salt": { S: salt },
    },
    TableName: "users",
    ReturnValues: "ALL_NEW", // should return dict of all attributes of item, may need to double check what is returned
  };
  const data = await db.updateItem(params).promise();
  if (data) {
    var obj = data.Attributes;
    return cleanUser(obj);
  } else {
    return null;
  }
};

// update tags
var myDB_updateTags = async function (username, tags) {
  const new_list = [];
  for (var i = 0; i < tags.length; i++) {
    new_list.push({ S: tags[i] });
  }

  var params = {
    Key: {
      username: { S: username },
    },
    UpdateExpression: "SET interests = :tags",
    TableName: "users",
    ReturnValues: "ALL_NEW", // should return dict of all attributes of item, may need to double check what is returned
    ExpressionAttributeValues: {
      ":tags": {
        L: new_list,
      },
    },
  };
  const data = await db.updateItem(params).promise();
  if (data) {
    var obj = data.Attributes;
    return cleanUser(obj);
  } else {
    return null;
  }
};

// add channel
var myDB_addChannel = async function (username, channel_id) {
  var params = {
    Key: {
      username: { S: username },
    },
    UpdateExpression: "SET chats = list_append(chats, :channel)",
    ExpressionAttributeValues: {
      ":channel": { L: [{ S: channel_id }] },
    },
    TableName: "users",
    ReturnValues: "ALL_NEW", // should return dict of all attributes of item, may need to double check what is returned
  };
  const data = await db.updateItem(params).promise();
  if (data) {
    var obj = data.Attributes;
    return cleanUser(obj);
  } else {
    return null;
  }
};

// remove channel
var myDB_removeChannel = async function (username, channel) {
  const user = await myDB_getUser(username);
  const new_list = [];
  console.log(user);
  for (var i = 0; i < user.chats.length; i++) {
    if (user.chats[i] !== channel) {
      new_list.push({ S: user.chats[i] });
    }
  }

  var params = {
    Key: {
      username: { S: username },
    },
    UpdateExpression: "SET chats = :channel",
    ExpressionAttributeValues: {
      ":channel": { L: new_list },
    },
    TableName: "users",
    ReturnValues: "ALL_NEW", // should return dict of all attributes of item, may need to double check what is returned
  };
  const data = await db.updateItem(params).promise();
  if (data) {
    var obj = data.Attributes;
    return cleanUser(obj);
  } else {
    return null;
  }
};

var database = {
  getUser: myDB_getUser,
  createUser: myDB_createUser,
  updateUser: myDB_updateUser,
  getAllUser: myDB_allusers,
  updateAffiliation: myDB_updateAffiliation,
  updateEmail: myDB_updateEmail,
  updatePassword: myDB_updatePassword,
  updateTags: myDB_updateTags,
  updateLogin: myDB_updateLogin,
  addChannel: myDB_addChannel,
  removeChannel: myDB_removeChannel,
  getChannels: myDB_getChannels,
};

module.exports = database;
