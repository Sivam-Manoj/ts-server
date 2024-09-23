import { Router } from "express";
import {
  Login,
  Logout,
  Register,
} from "../../controller/auth.contoller/auth.controller";

const router = Router();

router.post("/login", Login);
router.post("/register", Register);
router.get("/logout", Logout);

export default router;