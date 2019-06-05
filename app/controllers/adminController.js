const AdminsModel = require('../models/adminModel');
const status = require('../helpers/statuses');
const messages = require('../helpers/messages');
const errorCodes = require('../helpers/errorCodes');
const validation = require('../helpers/validations');


const signUpAdmin = async (req, res) => {
    try {
        const hashedPassword = await validation.hashPassword(req.body.password);
        const adminDetails = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPassword,
            is_admin: true
        }
        const admin = await  AdminsModel.create(adminDetails);
        const response = admin.toJSON();

        delete response.password;
        console.log(response)
        const token = validation.generateAdminToken(
            response.email,
            response._id,
            response.is_admin
        );
        res.status(200).json({
            status: status.ok,
            message: messages.signUpAdmin.success,
            data: { admin: response, token }
        });
    } catch (err) {
        console.log(err);
        if (err.code === errorCodes.duplicateCode){
            res.status(409).json({
                status: status.conflict,
                message: messages.signUpAdmin.duplicateEmail
            });
        } else {
            res.status(500).json({
                status: status.error,
                message: messages.signUpAdmin.error
            });
        }

    }
};


const signInAdmin = async (req, res) => {
    try {
        const admin = await AdminsModel.findOne(
            { email: req.body.email, is_admin: true },
            '+password'
        );


        if (!admin)
            return res
                .status(404)
                .json({
                    status: status.notfound,
                    message: messages.signInAdmin.notfound
                });

        const isPasswordValid = await validation.comparePassword(
            admin.password,
            req.body.password
        );

        if (!isPasswordValid)
            return res
                .status(401)
                .json({
                    status: status.unauthorized,
                    message: messages.signInAdmin.invalid
                });
        const response = admin.toJSON();
        const token = validation.generateAdminToken(
            response.email,
            response._id,
            response.is_admin
        );
        res.json({
            status: status.ok,
            message: messages.signInAdmin.success,
            data: { token }
        });
    } catch (err) {
        res.status(500).json({ status: status.error, message: messages.signInAdmin.error });
    }
};


module.exports = {
    signUpAdmin,
    signInAdmin
};
