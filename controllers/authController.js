import { comparePassword, hashPassword } from '../helpers/authHelper.js'
import userModel from '../models/userModel.js'
import orderModel from '../models/orderModel.js'
import JWT from 'jsonwebtoken'


//USER REGISTRATION 

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        // validation
        if (!name) {
            return res.send({ message: 'name is required' })
        }
        if (!email) {
            return res.send({ message: 'email is required' })
        }
        if (!password) {
            return res.send({ message: 'password is required' })
        }
        if (!phone) {
            return res.send({ message: 'phone is required' })
        }
        if (!address) {
            return res.send({ message: 'address is required' })
        }
        if (!answer) {
            return res.send({ message: 'answer is required' })
        }

        // existing user

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already registered plese login'
            })
        }
        // register user

        const hashedPassword = await hashPassword(password)

        // save

        const user = await new userModel({ name, email, phone, address, password: hashedPassword, answer }).save()

        res.status(201).send({
            success: true,
            message: 'user registered successfully',
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in registration',
            error
        })
    }
}

// LOGIN

export const loginController = async (req, res) => {

    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email and password'
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: true,
                message: 'email is not registered'
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'invalid password'
            })
        }

        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.status(200).send({
            success: true,
            message: 'login successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in login',
            error
        })
    }
}


export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body

        if (!email) {
            return res.status(400).send({ message: 'email is required' })
        }
        if (!answer) {
            return res.status(400).send({ message: 'question is required' })
        }
        if (!newPassword) {
            return res.status(400).send({ message: 'new password is required' })
        }

        // check

        const user = await userModel.findOne({ email, answer })

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Wrong email or answer'
            })
        }

        const hashed = await hashPassword(newPassword)

        await userModel.findByIdAndUpdate(user._id, { password: hashed })

        res.status(200).send({
            success: true,
            message: 'Password reset successfully',
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'something went wrong',
            error
        })
    }
}


export const testController = (req, res) => {
    res.send('protected route');
}


// update profile

export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body
        const user = await userModel.findById(req.user._id)
        if (password && password.length < 4) {
            return res.json({ error: 'password is required and must containes 6 characters' })
        }

        const hashedPassword = password ? await hashPassword(password) : undefined

        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            email: email || user.email,
            phone: phone || user.phone,
            address: address || user.address,
            password: hashedPassword || user.password
        }, { new: true })

        res.status(200).send({
            success: true,
            message: 'Profile updated successfully',
            updatedUser: {
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                address: updatedUser.address
            }
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'something went wrong in updating profile',
            error
        })
    }
}


// orders

export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({ buyer: req.user._id }).populate('products', '-photo').populate("buyer","name")
        res.status(200).send(orders)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'something went wrong while getting orders',
            error
        })
    }
}



export const getAllOrdersController = async(req,res)=>{
    try {
        const orders = await orderModel.find({}).populate('products', '-photo').populate("buyer","name").sort({createdAt:"-1"})
        res.status(200).send(orders)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'something went wrong while getting All orders',
            error
        })
    }
}


export const orderStatusController = async(req,res)=>{
    try {
        const { orderId } = req.params
        const { status } = req.body 
        
        const orders = await orderModel.findByIdAndUpdate(orderId, {status}, {new:true})
        res.status(200).send(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'something went wrong in order status controller',
            error
        })
    }
}