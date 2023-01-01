const User = require('../Model/Users');

module.exports.getAllUsers = async() =>{
    return await User.find({}).populate('posts')
}

module.exports.createUser =async(data) =>{
    console.log(data);
    return await User.create(data);
}

module.exports.getUserById =async(id) =>{
    return await User.findById(id).populate('posts');
}

module.exports.deleteUserById =async(id) =>{
    return await User.findByIdAndDelete(id)
}

module.exports.getPostByUserId =async(id) =>{
    return await User.findById(id).populate('posts')
}

module.exports.createPostByUserId =async(id,data) =>{
    const user = await User.findById(id);
    
    if(user){
        let posts = user.posts;
        posts.push(data);
        user.posts = posts;
        return await user.save()

    }
}



