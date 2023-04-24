// export the model
const resourcedb = require('../models/resource.js');
// const Categorydb = require('../models/Category.js');
const User = require('../models/User.js');
const { createError } = require('../custom_error/error.js');
// const pdfjsLib = require('pdfjs-dist');
// const Categoryd = require('../views/resource/resource_home');
// const is_admin=require('../config/auth.js').isAdmin;

const express = require('express');
const pdfjsLib = require('pdfjs-dist');
const app = express();

// app.get('/pdf', (req, res) => {
//   const url = 'https://www.example.com/path/to/your.pdf';
//   pdfjsLib.getDocument(url).promise.then(doc => {
//     const totalPages = doc.numPages;
//     res.render('pdf-viewer', { pdfUrl: url, totalPages });
//   }).catch(error => {
//     console.log(error);
//     res.send('Error');
//   });
// });
// module.exports.Resource_get_one_pdf=async(req,res,next)=>{

//   res.render("../views/resource/pdf-viewer.ejs",{
//     pdfUrl: req.params.id,
// });
// };
module.exports.Resource_get_all = async (req, res, next) => {
  try {
    const resources = await resourcedb.find();
    resources.sort((a, b) => {
      return String(b.title).localeCompare(a.title);
    });
    if (req.isAuthenticated() && req.user.isadmin) {
      const foundUser = await User.findById(req.user.id);
      if (foundUser) {
        // res.render("../views/resource/resource_home", {
        //   newPost: resources,
        //   authenticated: req.isAuthenticated(),
        //   userLikedPosts: foundUser.likedPosts,
        // });
        res.render('../views/resource/admin_resource_home.ejs', {
          userid: foundUser._id,
          backend_resources: resources,
          is_admin: foundUser.isadmin,
          is_member: foundUser.ismember,
          //authenticated: req.isAuthenticated(),
          userLikedPosts: foundUser.likedPosts,
        });
      } else {
        res.send('user is not authenticated. Please try again.');
      }
    }
  } catch (error) {
    res.send('There was an errorxxxxxxxxx. Please try again.');
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
//     res.send("There was an errorxxxxxxxxxxxxxxxxxxxxxxx. Please try again.");
//   }
// };

// get compose
module.exports.compose_get = async (req, res, next) => {
  res.render('../views/resource/compose', {
    // async: true,
    adminId: req.user.id,
  });
};

// post compose
module.exports.compose_post = async (req, res, next) => {
  let errors = [];
  const { title, markdown, description } = req.body;
  if (!title) {
    errors.push({ msg: 'Please enter the title' });
  }
  if (!description) {
    errors.push({ msg: 'Please enter the description' });
  }
  try {
    // const {title,markdown,description}=req.body;
    const newResource = new resourcedb({
      errors,
      title: req.body.title,
      description: req.body.description,
      link: req.body.link,
      // markdown:req.body.markdown,
      // username:username,
      // catagories:catagories,
    });
    const savedResource = await newResource.save();
    if (savedResource) {
      req.flash('success_msg', 'Resource added successfully');
      res.redirect('/admin/resource');
    }
  } catch (error) {
    res.send('There was an errorrrrrrrrrr. Please try again.');
    console.log(error);
  }
};

//update the resource
module.exports.compose_update_get = async (req, res, next) => {
  try {
    const foundResource = await resourcedb.findById(req.params.id);
    if (foundResource) {
      res.render('../views/resource/update_compose', {
        // async: true,
        adminId: req.params.id,
        title: foundResource.title,
        // markdown:foundResource.markdown,
        description: foundResource.description,
        link: foundResource.link,
      });
    }
  } catch (error) {
    res.send('There was an error. Please try again.');
  }
};
module.exports.compose_update = async (req, res, next) => {
  try {
    // const {title,markdown,description}=req.body;
    const updatedResource = await resourcedb.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          link: req.body.link,
        },
      },
      { new: true }
    );
    if (updatedResource) {
      req.flash('success_msg', 'Resource updated successfully');
      res.redirect('/admin/resource');
    }
  } catch (error) {
    res.send('There was an error. Please try again.');
  }
};

// delete the resource
module.exports.compose_delete = async (req, res, next) => {
  const id = req.body.resource_id;
  try {
    const foundResource = await resourcedb.deleteOne({ _id: id });
    if (foundResource) {
      req.flash('success_msg', 'Resource deleted successfully');
      res.redirect('/admin/resource');
    }
  } catch (error) {
    res.send('There was an error. Please try again.');
  }
};
