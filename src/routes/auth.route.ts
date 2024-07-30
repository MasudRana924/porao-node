import { createUser } from "../controllers/user.controller";

const { Router } = require('express');
const router = Router();
router.post("/register", createUser);
module.exports = router;