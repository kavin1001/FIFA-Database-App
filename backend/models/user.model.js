var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
var db = new AWS.DynamoDB();


function cleanUser(obj) {
    var cleaned = {};
    cleaned['username'] = obj.username.S;
    cleaned['salt'] = obj.salt.S;
    cleaned['hash_pw'] = obj.hash_pw.S;
    cleaned['email'] = obj.email.S;
    cleaned['first'] = obj.first.S;
    cleaned['last'] = obj.last.S;
    cleaned['birth'] = obj.birth.S;
    const new_list = []
    for (var i = 0; i < obj.interests.L.length; i++) {
        new_list.push(obj.interests.L[i].S)
    }
    cleaned['interests'] = new_list;
    cleaned['numPosts'] = obj.numPosts.N;
    const new_list_chats = []
    for (var i = 0; i < obj.chats.L.length; i++) {
        new_list_chats.push(obj.chats.L[i].S)
    }
    cleaned['chats'] = new_list_chats;
    cleaned['last_login'] = obj.last_login.S;
    return cleaned;
}
// get user from users table
var myDB_getUser = async function(user) {
    var params = {
		KeyConditionExpression: "username = :k",
		ExpressionAttributeValues: {
			":k" : {S: user}
		},
		TableName: "users"
  	};
    
    const data = await db.query(params).promise();
    if (data.Items.length == 0) {
        return null;
    } else {
        var obj = data.Items[0];
        var cleaned = cleanUser(obj);
        return cleaned;
    }
}

// get chats for a particular user
var myDB_getChannels = async function(username) {
    myDB_getUser(username).then(function(data) {
        return data.chats;
    });
}

// get all users
var myDB_allusers = async function() {
    const params = {
        TableName: "users",
    };

    const scanResults = [];
    let items = [];
    do{
        items = await db.scan(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey !== "undefined");
    const results = [];
    for (var i = 0; i < scanResults.length; i++) {
        results.push(cleanUser(scanResults[i]))
    }
    return results;
}

var myDB_createUser = async function(userDict) {
    const new_list = []
    for (var i = 0; i < userDict.interests.length; i++) {
        new_list.push({"S": userDict.interests[i]})
    }
    var params = {
        Item: {
            'username' : {S: userDict.username}, 
            'salt' : {S : userDict.salt}, 
            'hash_pw' : {S : userDict.hash_pw},
            'email' : {S : userDict.email},
            'first' : {S: userDict.first},
            'last' : {S: userDict.last},
            'affiliation' : {S: userDict.affiliation},
            'birth' : {S: userDict.birth},
            'interests': {L: new_list},
            'numPosts' : {N: userDict.numPosts.toString()},
            'last_login' : {S: userDict.last_login},
            'chats' : {L: userDict.chats}
        },
        TableName: 'users',
        ConditionExpression: 'attribute_not_exists(username)'
    };
    try { // putItem doesn't return anything if successful/unsuccessful
        const data = await db.putItem(params).promise();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

var myDB_updateLogin = async function(username, login) {
    var params = {
        Key: {
            username : {S: username}, 
        },
        UpdateExpression : 'SET last_login = :login',
        ExpressionAttributeValues: {
            ':login' : {S: login},
        },
        TableName: 'users',
        ReturnValues: 'ALL_NEW' // should return dict of all attributes of item, may need to double check what is returned
    }

    const data = await db.updateItem(params).promise();
    if (data.Attributes) {
        return cleanUser(data.Attributes);
    } else {
        return null;
    }
}



// email salt hash affiliation interests
var myDB_updateUser = async function(dict) {
    var params = {
        Key: {
            username : dict.user
        },
        UpdateExpression : 'SET email :email, salt :salt, hash :hash, affiliation :affiliation, interests :interests',
        ExpressionAttributeValues: {
            ':email' : dict.email,
            ':salt' : dict.salt,
            ':hash' : dict.hash,
            ':affiliation' : dict.affiliation,
            ':interests' : dict.interests
        },
        TableName: 'users',
        ReturnValues: 'ALL_NEW' // should return dict of all attributes of item, may need to double check what is returned
    }
    const data = await db.updateItem(params).promise();
    if (data) {
        var obj = data.Attributes;
        return cleanUser(obj);
    } else {
        return null;
    }
}

// update affiliations
var myDB_updateAffiliation = async function(username, affiliation) {
    var params = {
        Key: {
            username : {S: username}, 
        },
        UpdateExpression : 'SET affiliation = :affiliation',
        ExpressionAttributeValues: {
            ':affiliation' : {S: affiliation},
        },
        TableName: 'users',
        ReturnValues: 'ALL_NEW' // should return dict of all attributes of item, may need to double check what is returned
    }
    const data = await db.updateItem(params).promise();
    if (data) {
        var obj = data.Attributes;
        return cleanUser(obj);
    } else {
        return null;
    }
}

// update email
var myDB_updateEmail = async function(username, email) {


    var params = {
        Key: {
            username : {S: username}, 
        },
        UpdateExpression : 'SET email = :email',
        ExpressionAttributeValues: {
            ':email' : {S: email},
        },
        TableName: 'users',
        ReturnValues: 'ALL_NEW' // should return dict of all attributes of item, may need to double check what is returned
    }
    const data = await db.updateItem(params).promise();
    if (data) {
        var obj = data.Attributes;
        return cleanUser(obj);
    } else {
        return null;
    }
}

// update password
var myDB_updatePassword= async function(username, hash, salt) {

    var params = {
        Key: {
            username : {S: username}, 
        },
        UpdateExpression : 'SET hash_pw = :h, salt = :salt',
        ExpressionAttributeValues: {
            ':h' : {S: hash},
            ':salt' : {S: salt},
        },
        TableName: 'users',
        ReturnValues: 'ALL_NEW' // should return dict of all attributes of item, may need to double check what is returned
    }
    const data = await db.updateItem(params).promise();
    if (data) {
        var obj = data.Attributes;
        return cleanUser(obj);
    } else {
        return null;
    }
}

// update tags
var myDB_updateTags= async function(username, tags) {
    const new_list = []
    for (var i = 0; i < tags.length; i++) {
        new_list.push({"S": tags[i]})
    }

    var params = {
        Key: {
            "username": {S: username},
        },
        UpdateExpression : 'SET interests = :tags',
        TableName: 'users',
        ReturnValues: 'ALL_NEW', // should return dict of all attributes of item, may need to double check what is returned
        ExpressionAttributeValues: {
            ":tags": {
                "L": new_list
            }
        },
    }
    const data = await db.updateItem(params).promise();
    if (data) {
        var obj = data.Attributes;
        return cleanUser(obj);
    } else {
        return null;
    }

}

// add channel
var myDB_addChannel = async function(username, channel_id) {
    var params = {
        Key: {
            username : {S: username}, 
        },
        UpdateExpression : 'SET chats = list_append(chats, :channel)',
        ExpressionAttributeValues: {
            ':channel' : {L: [{S: channel_id}]},
        },
        TableName: 'users',
        ReturnValues: 'ALL_NEW' // should return dict of all attributes of item, may need to double check what is returned
    }
    const data = await db.updateItem(params).promise();
    if (data) {
        var obj = data.Attributes;
        return cleanUser(obj);
    } else {
        return null;
    }

}

// remove channel
var myDB_removeChannel = async function(username, channel) {
    const user = await myDB_getUser(username);
    const new_list = []
    console.log(user);
    for (var i = 0; i < user.chats.length; i++) {
        if (user.chats[i] !== channel) {
            new_list.push({"S": user.chats[i]})
        }
    }

    var params = {
        Key: {
            username : {S: username}
        },
        UpdateExpression : 'SET chats = :channel',
        ExpressionAttributeValues: {
            ':channel' : {L: new_list},
        },
        TableName: 'users',
        ReturnValues: 'ALL_NEW' // should return dict of all attributes of item, may need to double check what is returned
    }
    const data = await db.updateItem(params).promise();
    if (data) {
        var obj = data.Attributes;
        return cleanUser(obj);
    } else {
        return null;
    }
}



var database = { 
    getUser : myDB_getUser,
    createUser : myDB_createUser,
    updateUser : myDB_updateUser,
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
  