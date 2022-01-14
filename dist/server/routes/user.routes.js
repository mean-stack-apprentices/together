import express from "express";
import { UserModel } from "../schemas/user.schema.js";
export const userRouter = express.Router();
userRouter.post('/create', async function (req, res, next) {
    console.log('create user route');
    try {
        const user = await new UserModel(req.body);
        await user.save();
        console.log('user?');
        res.locals.data = user;
        next();
    }
    catch (err) {
        next(err);
    }
});
userRouter.get('/all', async function (req, res) {
    const users = await UserModel.find({});
    res.json({ data: users });
});
//# sourceMappingURL=user.routes.js.map