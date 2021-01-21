const { body } = require('express-validator');


const registerValidation = [
    body('first_name').isAlpha().isLength({ min: 2, max: 255 }),
    body('last_name').isAlpha().isLength({ min: 2, max: 255 }),
    body('email').isEmail().isLength({ max: 255 }),
    body('password').isLength({ min: 6, max: 255 })
  ];

const loginValidation = [
    body('email').isEmail().isLength({ max: 255 }),
    body('password').isLength({ min: 6 })
  ];

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;