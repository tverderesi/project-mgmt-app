import mongoose from 'mongoose'

const ClientSchema = new mongoose.Schema({ 
    name: { type: String},
   description: { type: String},
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed']
    },
    clientID: {type: mongoose.Schema.Types.ObjectId,}
})

module.exports = mongoose.model('Project', ClientSchema)

