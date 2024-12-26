import bcrypt from 'bcrypt';
import userModel from '../model/Users.js';
import jwt from 'jsonwebtoken';

const createToken = (_id) => {
    return jwt.sign({_id}, "Iamsecret" , {expiresIn: '1h'})
}

const getUser = async (req, res) => {
    const {emailId, password} = req.body;
    try
    {
        const user = await userModel.findOne({emailId});
        if (!user)
        {
            res.status(404).json({message:"User not found"});
        }
        else 
        {
            const matchPassword = await bcrypt.compare(password, user.password);
            if (matchPassword)
            {
                const token = createToken(user._id);
                res.status(202).json({
                    message: "Signing in...", token, userId: user._id, emailId: emailId}); 
            } else {
                res.status(403).json({message: "Wrong Password"});
            }
        }
            
    }
    catch (err)
    {
        console.log("Something went wrong", err);
        res.status(500).send({message: err.message});
    }
}

const createUser = async (req, res) => {
    const {emailId, password} = req.body;
    try
    {
        const existingUser = await userModel.findOne({emailId});
        if (existingUser)
        {
            res.status(404).json({message:"User already registered"});
        }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await userModel.create({
                emailId, password: hashedPassword
            });
            console.log(hashedPassword, user.emailId);
            res.status(201).json({message:"Account created successfully"});

    }
    catch (err)
    {
        console.log("Something went wrong", err);
        res.status(500).send({message: err.message});
    }
}


export {getUser, createUser};
