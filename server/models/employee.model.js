const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const EmployeeSchema = new mongoose.Schema({
    firstName: { type: String,
        required: [true, "First Name is required"],
        minLength: [3, "First Name must be at least 3 characters long"] 
    },
    lastName: { type: String,
        required: [true, "Last Name is required"],
        minLength: [3, "Last Name must be at least 3 characters long"] 
    },
    
    username: {
        type: String,
        required: [true, "Create a Username login"],
        minLength: [5, "Username must be at least 5 characters long"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be at least 8 characters long"]
    },
}, { timestamps: true });

EmployeeSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( (value) => this._confirmPassword = value );

EmployeeSchema.pre('validate', function(next) {
if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
}
next();
});
EmployeeSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      });
  });

module.exports = mongoose.model('Employee', EmployeeSchema);