import express from 'express' ;
import { isAuth } from '../middlewares/isAuth.js';
import { getAllMessages, sendMessage } from '../controllers/messageControllers.js';

const router = express.router() ;

router.post("/" , isAuth , sendMessage) ;
router.get("/:id" , isAuth , getAllMessages) ;

export default router ;