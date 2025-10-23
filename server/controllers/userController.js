import User from "../models/User.js";


export const getMe = async (req, res) => {

    try{
        const user = await User.findById(req.user.id).select('-password');

        if(!user){
             return res.status(404).json({ message: 'User not found' });
        }

         res.json(user);
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
};