
// -------------------------------------------------------------------------
// Mongo db scripts for testing purposes.
//
// Also a convient place to hold the scripts for the 
// creating the collections in the database.
// -------------------------------------------------------------------------

db.createCollection("users", { validator:
  { $and:
    [
      { "email": { $type: "string" } },
      { "password": { $type: "string" } }
    ]
  },
  validationAction: "error"
})
// users insert scrap
db.users.insert([{ email: "test1@test1.test1", username: "test1user", password: "test1password", firstname: "te1", lastname: "st1" },
{ email: "test2@test2.test2", username: "test2user", password: "test2password", firstname: "te2", lastname: "st2" }])

// Show validators and other info
db.getCollectionInfos()