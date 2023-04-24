// export the model
const resourcedb = require('../models/resource.js');
// const Categorydb = require('../models/Category.js');
const User = require('../models/User.js');
const { createError } = require('../custom_error/error.js');
// const Categoryd = require('../views/resource/resource_home');
// const is_admin=require('../config/auth.js').isAdmin;

module.exports.Resource_get_all = async (req, res, next) => {
  try {
    const resources = await resourcedb.find();
    resources.sort((a, b) => {
      return new String(b.title).localeCompare(a.title);
    });
    if (req.isAuthenticated()) {
      const foundUser = await User.findById(req.user.id);
      if (foundUser) {
        // res.render("../views/resource/resource_home", {
        //   newPost: resources,
        //   authenticated: req.isAuthenticated(),
        //   userLikedPosts: foundUser.likedPosts,
        // });
        res.render('../views/resource/resource_home.ejs', {
          userid: foundUser._id,
          backend_resources: resources,
          is_admin: foundUser.isadmin,
          is_member: foundUser.ismember,
          //authenticated: req.isAuthenticated(),
          // userLikeds: foundUser.likeResource,
        });
      } else {
        res.send('user is not authenticated. Please try again.');
      }
    }
  } catch (error) {
    res.send('There was an error. Please try again.');
  }
};

// module.exports.Resource_get_one=async(req,res,next)=>{
//   try {
//     const perticular_resource=await resourcedb.findById(req.params.id);
//     if(perticular_resource)
//     {
//       res.render("../views/resource/read_resource",{
//         resource:perticular_resource,
//         // authenticated: req.isAuthenticated(),
//       });
//     }
//     else{
//       res.send("cant get a resource. Please try again.");
//     }
//   } catch (error) {
//     res.send("There was an error. Please try again.");
//   }
// };
// module.exports.Resource_get_all = async (req, res, next) => {
//   Post.find((err, posts) => {
//     posts.sort((a, b) => {
//       return new Date(b.timestamp) - new Date(a.timestamp);
//     });

//     if (req.isAuthenticated()) {
//       User.findById(req.user.id, (err, foundUser) => {
//         if (err) {
//           console.log(err);
//           res.send("There was an error. Please try again.");
//         } else {
//           res.render("../views/resource/resource_home", {
//             newPost: posts,
//             authenticated: req.isAuthenticated(),
//             userLikedPosts: foundUser.likedPosts,
//           });
//         }
//       });
//     } else {
//       res.render("../views/resource/resource_home", {
//         newPost: posts,
//         authenticated: req.isAuthenticated(),
//         userLikedPosts: null,
//       });
//     }
//   });
// };

// // get compose
// module.exports.compose_get=async(req,res,next)=>{
//   res.render("../views/resource/compose",{
//     adminId:req.user.id,
//   });
// };

// // post compose
// module.exports.compose_post=async(req,res,next)=>{
//   try {
//     const {title,description,photo,body,username,catagories}=req.body;
//     const newResource=new resourcedb({
//       title:title,
//       description:description,
//       photo:photo,
//       body:body,
//       username:username,
//       catagories:catagories,
//     });
//     const savedResource=await newResource.save();
//     if(savedResource){
//       req.flase('success_msg','Resource added successfully');
//       res.redirect('/resource');
//     }
//   }
//   catch (error) {
//     res.send("There was an error. Please try again.");
//   }
// };

// module.exports.compose_post=async(req,res,next)=>{
//   User.findById(req.user.id, (err, foundUser) => {
//     if (err) {
//       console.log(err);
//       res.send("Please log in to post.");
//     } else {
//       const today = new Date();
//       const dateTime =
//         today.getFullYear() +
//         "-" +
//         (today.getMonth() + 1) +
//         "-" +
//         today.getDate() +
//         " " +
//         today.getHours() +
//         ":" +
//         today.getMinutes() +
//         ":" +
//         today.getSeconds();

//       const post = new Post({
//         title: req.body.postTitle,
//         content: req.body.postBody,
//         markdown: req.body.postMarkdown,
//         // account: foundUser.userHandle,
//         // email: foundUser.username,
//         adminId: req.user.id,
//         // timestamp: dateTime,
//         likes: 0,
//       });

//       post.save();

//       foundUser.posts.push(post);

//       foundUser.save(() => {
//         res.redirect("/");
//       });
//     }
//   });
// };

// //get request

// // get all request
// module.exports.Resource_get_all = async (req, res, next) => {
//   try {
//     const resource = await Resourcedb.find();
//     if (!resource) {
//       return next(createError(400, 'Resource not found'));
//     }
//     res.status(200).json({
//       status: 'success',
//       data: resource,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// //post request
// module.exports.Resource_post = async (req, res, next) => {
//   try {
//     // const {title, description, photo, body, username, catagories}=req.body;
//     const resource = await Resourcedb.create({
//       title:req.body.title,
//       description:req.body.description,
//       photo:req.body.photo,
//       body:req.body.body,
//       username:req.body.username,
//       catagories:req.body.catagories
//     });
//     if (!resource) {
//       return next(createError(400, 'Resource not created'));
//     }
//     res.status(200).json({
//       status: 'success',
//       data: resource,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// //put request
// // delete request
