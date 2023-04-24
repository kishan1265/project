// export mongoose model
const mongoose = require('mongoose');
const conn = require('../db/connectdb.js').connectdb;
// const marked = require('marked');

// // const mongoose = require('mongoose');
// // const mongoose = require('mongoose');
// const marked = require('marked');
// const dompurify = require('dompurify');
// const { JSDOM } = require('jsdom');

// const resourceSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, 'Please enter resource name'],
//       trim: true,
//       maxlength: [100, 'Resource name cannot exceed 100 characters']
//     },
//     markdown: {
//       type: String,
//       required: false
//     },
//     description: {
//       type: String,
//       required: [true, 'Please enter resource description'],
//       maxlength: [5000, 'Resource description cannot exceed 5000 characters']
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now
//     },
//     user: {
//       type: mongoose.Schema.ObjectId,
//       ref: 'User',
//       required: true
//     }
//   },
//   { timestamps: true }
// );

// // Convert Markdown to HTML before saving
// resourceSchema.pre('save', function (next) {
//   if (this.description) {
//     const window = new JSDOM('').window;
//     const sanitizedHtml = dompurify.sanitize(marked(this.description));
//     this.description = sanitizedHtml;
//   }
//   next();
// });

// const resourcedb = mongoose.model('resourceSchema', resourceSchema);

// module.exports = resourcedb;

const ResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'resource title cannot exceed 100 characters'],
    },
    // markdown: {
    //     type: String,
    //     required: false,

    // },
    description: {
      type: String,
      required: true,
      maxlength: [5000, 'resource description cannot exceed 5000 characters'],
    },
    link: {
      type: String,
      required: true,
    },

    // likes: {
    //     type: Number,
    //     required: false,
    // },
    // sanitizedHtml:{
    //     type: String,
    //     required: true
    //   },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // sanitizedHtml: {
    //     type: String,
    //     required: true
    // },
    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
  },
  { timestamps: true }
);
// postSchema.pre("validate", function(next){
//     if(this.markdown){
//       this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
//     }
//     next();
//   })
// ResourceSchema.pre('save', function (next) {
//     this.description = marked(this.description);
//     next();
//   });
// ResourceSchema.pre("validate", function (next) {
//     if (this.markdown) {
//         this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
//     }
//     next();
// })
const resourcedb = conn.model('ResourceSchema', ResourceSchema);

module.exports = resourcedb;
