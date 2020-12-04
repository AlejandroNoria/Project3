const auth = require("../controllers/authController")

const express = require('express');
const {body, validationResult} = require('express-validator');
const router = express.Router();

router.get('/',auth.getAll)
router.post('/signup',auth.create)
router.route('/:id').get(auth.getOne).patch(auth.update).delete(auth.delete)
router.post('/login',auth.login)
router.get('/logout',auth.logOut)



module.exports = router;