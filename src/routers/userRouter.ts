import routes from "../routes";
import { Router } from "express";
import { signUp, emailSend, emailAuth } from "../controllers/userController";

const router = Router();

router.post(routes.emailsend, emailSend); // 인증 문자 email 보내기
router.post(routes.emailauth, emailAuth);
router.post(routes.signup, signUp); // 회원 가입

export default router;
