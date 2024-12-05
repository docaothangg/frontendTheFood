import express from 'express'
import { addUser, listUser, loginUser,registerUser,removeUser, updateUser ,getUserInfo, changePassword } from '../controllers/userControllers.js'
import authMiddleware from '../middleware/auth.js'

const userRouter=express.Router()
userRouter.post('/register',registerUser)
userRouter.get('/list',listUser)
userRouter.post('/remove',removeUser)
userRouter.post('/login',loginUser)
userRouter.post('/add',addUser)
userRouter.get('/:id', getUserInfo);
userRouter.put('/update/:id', updateUser);
userRouter.post('/change-password',authMiddleware, changePassword);
export default userRouter;