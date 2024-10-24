import { updateUser } from "../services/user.service.js";

export const updateUserController = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            if (req.body.password) {
                req.body.password = bcrypt.hashSync(req.body.password, 10);
            }
            const updatedUser = await updateUser(req.params.id, req.body);
            res.status(200).json({
                updatedUser,
                message: "User has been updated",
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: error,
                message: "User can only be updated",
            });
        }

    try {
        const updatedUser = await updateUser(req.params.id, req.body);
        res.status(200).json({
            updatedUser,
            message: "User has been updated",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
            message: "User has not been updated",
        });
    }
}
};