const { check, validationResult } = require('express-validator');
const commonQueryModel = require('../models/commonQueryModel');

exports.registerValidation = [
    check('username').trim().notEmpty().withMessage('Name is required'),
    check('email').trim().notEmpty().withMessage('E-mail is required').isEmail().withMessage('Please enter valid E-mail').custom(value => {
        return commonQueryModel.get_data_by_field('user', 'email', value).then(user => {
            if (user[0]) {
                return Promise.reject('E-mail already in use');
            }
        });
    }),
    check('password').trim().notEmpty().withMessage('Password is required').isLength({ min: 5 }).withMessage('Password should be at least 5 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errors_array = errors.array();
            return res.status(422).json({ errors: errors_array });
        }
        else next();
    }
];

exports.createValidation = [
    check('username').trim().notEmpty().withMessage('Name is required'),
    check('mobile').trim().notEmpty().withMessage('Mobile is required').custom(value => {
        return commonQueryModel.get_data_by_field('user', 'mobile', value).then(user => {
            if (user[0]) {
                return Promise.reject('Mobile No. already in use');
            }
        });
    }),
    check('email').trim().notEmpty().withMessage('E-mail is required').isEmail().withMessage('Please enter valid E-mail').custom(value => {
        return commonQueryModel.get_data_by_field('user', 'email', value).then(user => {
            if (user[0]) {
                return Promise.reject('E-mail already in use');
            }
        });
    }),
    check('password').trim().notEmpty().withMessage('Password is required').isLength({ min: 5 }).withMessage('Password should be at least 5 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errors_array = errors.array();
            return res.status(422).json({ errors: errors_array });
        }
        else next();
    }
]

exports.deleteValidation = [
    check('id').trim().notEmpty().withMessage('User id is required').custom((value, { req }) => {
        return commonQueryModel.get_data_by_field('user', 'id', req.params.id).then(user => {
            if (user[0] == undefined) {
                return Promise.reject('User id is not valid');
            }
        });
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errors_array = errors.array();
            return res.status(422).json({ errors: errors_array[0] });
        }
        else next();
    }
];

exports.refreshTokenValidation = [
    check('refresh_token').trim().notEmpty().withMessage('Refresh token is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errors_array = errors.array();
            return res.status(422).json({ errors: errors_array });
        }
        else next();
    }
];