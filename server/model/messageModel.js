const mongoose =require('mongoose');

const messageSchema = new  mongoose.Schema(
    {
message:{
    text:{
        type: String,
        required:true,
    },
},
    users:Array,
    sender:{
        type:mongoose.Schema.Types.ObjectId,  // This property specifies that the sender field expects an ObjectId value. An ObjectId is a unique identifier assigned to each document in a MongoDB collection. It is typically used as the primary key for documents.
        ref: "Users", // This property indicates that the sender field references the "User" model or collection. It establishes a relationship between the sender field and the "User" collection, allowing you to populate the sender field with actual user documents.
        required: true,
    },
},
{
    timestamps:true,
}
)

module.exports = mongoose.model("Messages",messageSchema);