import { register as registerUserService } from "../services/auth.service.js";

export const register = async (req, res) => {
    
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const newUser = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const { password, ...data } = newUser._doc;
          await registerUserService(req.body);

    
        res.status(200).json({
            data,
            message: "User has been registered",
        });
    } catch (error) {
        res.status(500).json(error);
        "User has not been registered";
    }
};


export const login = async (req, res) => {
    try {
        const loggedInUser = await loggedInUser(req.body);
        const { password, ...data } = loggedInUser._doc;
        res.status(200).json({
            loggedInUser,
            message: "User has been logged in",
            data,
        });
       
    } catch (error) {
        res.status(500).json
        ({
        error: error,
        message: "User has not been logged in",
        });
        console.log(error);
    }
};