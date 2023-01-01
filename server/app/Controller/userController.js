const userService = require('../Service/userService')

let operations = {
    list:async(req,res,next) =>{
        try{
            
            const usersList = await userService.getAllUsers();
            res.status(201).json(usersList);
        }
        catch(err){
            next(err)
        }
    },
    create:async(req,res,next) =>{
        try{
            const userId = await userService.createUser(req.body);
            res.status(201).json({user:userId});
        }
        catch(err){
            next(err)
        }
    },
    getUserById:async(req,res,next) =>{
        try{
            const id = req.params.userId
            const user = await userService.getUserById(id);
            res.status(201).json(user);
        }
        catch(err){
            next(err)
        }
    },
    deleteUserById:async(req,res,next) =>{
        try{
            const id = req.params.userId
            const userId = await userService.deleteUserById(id);
            res.status(201).json({user:userId});
        }
        catch(err){
            next(err)
        }
    },
    getPostByUserId:async(req,res,next) =>{
        try{
            const id = req.params.userId
            const post = await userService.getPostByUserId(id);
            res.status(201).json(post);
        }
        catch(err){
            next(err)
        }  
    },
    createPostByUserId:async(req,res,next) =>{
        try{
            const id = req.params.userId
            const postId = await userService.createPostByUserId(id,req.body);
            res.status(201).json({post:postId});
        }
        catch(err){
            next(err)
        }  
    }
}

module.exports = operations;