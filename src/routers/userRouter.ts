import routes from "../routes";
import { Router } from "express";
import {
  signUp,
  emailSend,
  emailAuth,
  signIn
} from "../controllers/userController";
import { tokenVerify } from "../middlewares/jwtHelper";

const router = Router();

router.post(routes.emailsend, emailSend); // 인증 문자 email 보내기
router.post(routes.emailauth, emailAuth); // 인증 문자 비교하기
router.post(routes.signup, signUp); // 회원 가입

router.post(routes.signin, signIn); // 로그인

router.get("/", tokenVerify); // 토큰 검증

export default router;
