import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

export const updateUser = async (userId, updateData) => {
    if (updateData.password) {
        try {
            updateData.password = bcrypt.hashSync(updateData.password, 10);
        } catch (error) {
            throw error;
        }
    }
    try {
        const User = await UserModel.findByIdAndUpdate(userId, {
            $set: updateData
        }, { new: true });
        return User;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (userId) => {
        try {
             await UserModel.findByIdAndDelete(userId);
        } catch (error) {
            throw error;
        }
    };
    