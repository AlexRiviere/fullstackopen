// const mongoose = require('mongoose')
// // const uniqueValidator = require('mongoose-unique-validator')

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

// const password = process.argv[2]

// const url =
//   `mongodb+srv://alexandermriviere:${password}@part3-3.ggn2p91.mongodb.net/noteApp?retryWrites=true&w=majority`

// mongoose.set('strictQuery',false)
// mongoose.connect(url)

// const userSchema = mongoose.Schema({
//   username: String,
//   name: String,
//   passwordHash: String,
//   notes: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Note'
//     }
//   ],
// })

// // userSchema.plugin(uniqueValidator)

// const User = mongoose.model('User', userSchema)

// const user = new User({
//   name: 'alex',
//   username: 'alexrivi',
//   password: 'wearepennstate'
// })

// user.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

// mongoose.connection.close()

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

const user = new User({
    username: 'alex',
    name: 'alex',
    passwordHash: 'alex',
})
  
user.save();  