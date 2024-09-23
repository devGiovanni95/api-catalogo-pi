import { Router } from 'express'
import AuthenticationController from '../../controllers/authenticate/auth.controller'

const authRoutes = Router()
authRoutes.post('/', AuthenticationController.authenticate)

export default authRoutes