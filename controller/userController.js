const User = require('../model/users');
const bcrypt = require('bcryptjs');
const jsontoken = require('jsonwebtoken');

const multer = require('multer')

exports.validate = (req, res, next) => {
    if (req.body.first_name.length == 0) {
        res.send("First name is required");
    }
    else if (req.body.last_name.length == 0) {
        res.send("Last Name is required");
    }
    else if (req.body.email.length == 0) {
        res.send("Email is required");
    }
    else if (req.body.password.length == 0) {
        res.send("Password is required");
    }
    // else if (valEmail.length > 0) {
    //     res.send("Email already exist");
    // }
    
    else {
        next();
    }
    
}

exports.signup = (req, res, next) => {
console.log(req.body);
    bcrypt.hash(req.body.password, 10, (err, password) => {
        if (err) {
            let err = new Error("Invalid password 123");
            err.status = 500;
            return next(err);
        }

        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            user_image:req.body.user_image,
            gender: req.body.gender,
            password: password,
        })

        user.save().then(
            user => {
                token = jsontoken.sign({ _id: user._id, email: user.email }, process.env.TOKEN)

                res.status(201).send({
                    status: "Success",
                    token: token,
                    admin:user.admin
                })
            }

        ).catch(err => {
            res.send(err)
        })
    })

}
exports.login = (req, res, next) => {
 
    User.findOne({email:req.body.email})
    .then(user => {
      if (user == null) {
        res.send({
            status: "Failed",
            message: "Invalid Password"
          })
          return;
      }
      
      else {  
        bcrypt
          .compare(req.body.password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              res.send({
                  status: "Failed",
                  message: "Invalid Password"
                })
                return;
            }
            let token = jsontoken.sign(
              { email: user.email, _id: user._id },
              process.env.TOKEN
            );
            res.json({
              status: "Login success!",
              token: token,
              id:user._id,
              admin:user.admin
            });
          })
          .catch(next);
      }
    })
    .catch(next);
}

exports.update=(req,res,next)=>{
    uid=req.params._id;
    console.log(uid)
    console.log(req.body)
    User.update(
        {_id:uid},
        {
            $set:{
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                image:req.body.image,
            }
        }
    )
    .then(function(user){
        console.log("User Updated");
        res.status(201).json({
            message:"User updated"
        });


    });
}
exports.delete=(req, res,next) => {
    User.findById(req.params._id).then(user => {
          user
        .delete()
        .then(function(result) {
          res.status(201).json({
            message: "user Deleted Successfully"
          });
        })
        .catch(function(e) {
          console.log(e);
        });
    });
  }

  
exports.me = async (req, res, next) => {
    try {
      res.status(200).json(req.user);
    } catch (err) {
      res.status(400).json({
        status: "Failure",
        message: err
      });
    }
  };

