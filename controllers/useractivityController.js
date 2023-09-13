//Load User model
const User = require('../models/User');
const Event = require('../models/Event');
const Feedback = require('../models/Feedback');

// dashboard page
module.exports.dashboard = (req, res) =>
  res.render('dashboard', {
    user: req.user,
  });

// profile page
module.exports.profile = (req, res) =>
  res.render('profile', {
    user: req.user,
  });

// feedback page
module.exports.feedback = (req, res) =>
  res.render('user_feedback', {
    user: req.user,
  });

// feedback submit
module.exports.feedback_submit = (req, res) => {
  const { title, feedback } = req.body;
  const email = req.user.email;
  const name = req.user.name;

  let errors = [];

  if (!title || !feedback) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (errors.length > 0) {
    res.render('user_feedback', {
      errors,
      title,
      feedback,
    });
  } else {
    const newFeedback = new Feedback({
      title,
      email,
      name,
      feedback,
    });
    newFeedback.save().then((feedback) => {
      req.flash('success_msg', 'Your feedback has been submitted');
      res.redirect('/feedback');
    });
  }
};

// event page
module.exports.event = (req, res) => {
  Event.find().then((data) => {
    res.render('event.ejs', {
      user: req.user,
      practices: data,
    });
  });
};

// event register

module.exports.event_register = (req, res) => {
  const event_id = req.body.event_id;
  const user_id = req.body.user_id;

  Event.findOne({ _id: event_id }).then((event) => {
    if (event.participants.includes(user_id)) {
      // alert('You have already registered for this event');
      //res.send(201);
    } else {
      updatedEvent = async (req, res) => {
        await Event.findByIdAndUpdate(
          event_id,
          {
            $push: { participants: user_id },
          },
          {
            new: true,
          }
        );
      };
      updatedEvent();
    }
  });
};

// event deregister
module.exports.event_deregister = (req, res) => {
  //console.log(req.body.event_id);
  const event_id = req.body.event_id;
  const user_id = req.body.user_id;

  let participantsexist = true;

  Event.findOne({ _id: event_id }).then((event) => {
    if (event.participants.includes(user_id)) {
      Event.findByIdAndUpdate(
        event_id,
        {
          $pull: { participants: user_id },
        },
        {
          new: true, // Return the updated event object
        }
      );
    } else {
      participantsexist = false;
    }
  });

  if (participantsexist == 0) {
    req.flash('error_msg', 'You have not registered for this event');
    res.redirect('/event');
  } else {
    req.flash(
      'success_msg',
      'You have successfully deregistered for the event'
    );
    res.redirect('/event');
  }
};

// edit profile
module.exports.edit_profile = (req, res) =>
  res.render('edit_profile', {
    user: req.user,
  });

// edit profile submit
module.exports.edit_profile_submit = (req, res) => {
  // console.log(req.body);
  const { name, programe, batch, cfprofile, address } = req.body;
  const email = req.user.email;

  User.findOne({ email: email }).then((user) => {
    try {
      change = async (req, res, next) => {
        await User.updateOne(
          {
            _id: user.id,
          },
          {
            $set: {
              name: name,
              programe: programe,
              batch: batch,
              cfprofile: cfprofile,
              address: address,
            },
          }
        );
      };
      change();
      res.redirect('/profile');
    } catch (error) {
      console.log(error);
      res.json({ status: 'Something went wrong' });
    }
  });
  //}
};
