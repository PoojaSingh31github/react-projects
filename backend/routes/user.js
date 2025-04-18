import { signup, login, getUser, deleteUser, updateUser, getAllUser } from "../controller/user.js";
import express from "express";

const route = express.Router();

route.post("/signup", signup)
route.post("/login", login)
route.get("/profile/:id", getUser)
route.get("/allusers", getAllUser)
route.delete("/userDelete/:id", deleteUser)
route.put("/updateUser/:id", updateUser)

export default route;
