import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{type:String,require:true},
    email: { type: String,require:true, unique: true },
    password: {type:String,require:true}
},{
    versionKey:false,timestamps:true
});

const User= mongoose.model('users', userSchema);
export default User;
