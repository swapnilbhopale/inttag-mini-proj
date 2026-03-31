const {body, param} = require('express-validator')

exports.createEmpValidator = [
    body('name').notEmpty().withMessage('Name is required.'),
    body('designation').notEmpty().withMessage('designation is required.'),
    body('email').notEmpty().withMessage("valid email is required."),
    body('phone').notEmpty().withMessage('valid phone number required.'),
    body('address').notEmpty().withMessage('address is required.')

];

exports.updateEmpVlaidator = [
    body('name').notEmpty().withMessage('Name is required.'),
    body('designation').notEmpty().withMessage('designation is required.'),
    body('email').notEmpty().withMessage("valid email is required."),
    body('phone').notEmpty().withMessage('valid phone number required.'),
    body('address').notEmpty().withMessage('address is required.')
];

exports.deleteEmpValidator = [
    param('email').notEmpty().withMessage('valid email is required.')
]