import {Request, Response } from 'express';
import bcrypt from 'bcryptjs'
import User  from '../../models/user';
import jwt  from 'jsonwebtoken';

export default class AuthController {
    static async authenticate( req: Request, res: Response) {
                
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
         
        if (!user) {
            return res.sendStatus(401)
        }
        
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if(!isValidPassword){
            return res.sendStatus(401)
        }

        const token = jwt.sign( { id: user.id }, ''+process.env.JWT, {expiresIn: '1d'})
       
        //setando o passoword para não retornar no response da requisição
        user.password = '';

        return res.json({
            user,
            token,
        })
    }
}