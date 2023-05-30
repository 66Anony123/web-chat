const {register,login,setAvatar,getAllUser} = require('../controllers/usersController');
const router = require('express').Router();

router.post("/register",register);
router.post("/login",login);
router.post("/setAvatar/:id",setAvatar)
router.get("/allusers/:id",getAllUser)
module.exports = router;



//Here to connect backend login we just copy pasted the code
// in userRoute and userController and so we edited just these two components 