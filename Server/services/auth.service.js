import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';

export const register = async (body) => {
    
        const hashedPassword = bcrypt.hashSync(body.password, 10);
        const newUserser = new UserModel({
            username: body.username,
            email: body.email,
            password: hashedPassword,
        });

        
        await newUserser.save();
        return newUserser;
        
   
};


export const loginUser = async (body) => {
    const user = await UserModel.findOne({ email: body.email });
    !user && res.status(404).json("User not found");
    const validPassword = bcrypt.compareSync(body.password, user.password);
    !validPassword && res.status(404).json("Wrong password");
    return user;
};

