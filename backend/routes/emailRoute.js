const express=require('express')
const router=express.Router()

const {findEmail}=require('../controllers/emailController')

//url will have users email that needs to be in req.query.email
router.get('/',findEmail)

module.exports=router