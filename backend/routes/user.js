import { signup, login, getUser, deleteUser, updateUser } from "../controller/user.js";
import express from "express";

const route = express.Router();

route.post("/signup", signup)
route.post("/login", login)
route.post("/profile", getUser)
route.delete("/userDelete", deleteUser)
route.put("/updateUser", updateUser)

export default route;
