import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
   
     try{

        const { email, password, role } = req.body;

       const existingUser = await User.findOne({ email });
        if (existingUser)
        {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            role: role || 'student',
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });

     } catch(error)
     {
        res.status(500).json({ message: 'Server error', error });
     }
}



export const login = async (req, res) => {

    try{

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
        {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
        {
            return res.status(400).json({ message: 'Invalid credentials' });
        }


        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        jwt.sign(
            payload, 
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, role: user.role  });
            }
        );

    } catch(error)
    {
        res.status(500).json({ message: 'Server error', error });
    }

    
}



