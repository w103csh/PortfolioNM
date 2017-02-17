
// -------------------------------------------------------------------------
// Mongo db scripts for testing purposes.
//
// Also a convient place to hold the scripts for the 
// creating the collections in the database.
// -------------------------------------------------------------------------



// users collection creation with validation
db.createCollection("users", { validator:
  { $and:
    [
      { "password": { $type: "string" } },
      { $or:
        [
          { "username": { $type: "string" } },
          { "email": { $type: "string" } }
        ]
      }
    ]
  },
  validationAction: "error"
})
// users insert scrap
db.users.insert([{ email: "test1@test1.test1", username: "test1user", password: "test1password", firstname: "te1", lastname: "st1" },
{ email: "test2@test2.test2", username: "test2user", password: "test2password", firstname: "te2", lastname: "st2" }])



// rememberMeTokens collection creation with validation
db.createCollection("rememberMeTokens", { validator:
  { $and:
    [ 
      { "token": { $type: "string" } },
      { "user_id": { $type: "objectId" } },
      { "createdDate": { $type: "date" } }
    ]
  },
  validationAction: "error"
})
// TTL index so that the left over tokens are automatically deleted from the database
// 604800 is 7 days in seconds
db.rememberMeTokens.createIndex({"createdDate": 1 }, { "expireAfterSeconds": 604800 })
// rememberMeTokens insert scrap
db.rememberMeTokens.insert([{
	"user_id" : ObjectId("58a3b1070b2b8d2bafcdcd33"),
	"token" : "uctZutq7Ah3cgPzEnNFgGE"
},{
	"user_id" : ObjectId("58a3b1070b2b8d2bafcdcd33"),
	"token" : "vctZutq7Ah3cgPzEnNFgGE"
}])




