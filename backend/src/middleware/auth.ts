import type { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export const authenticate = async(req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization
  if (!bearer) {
    const error = new Error('No Autorizado')
    return res.status(401).json({ error: error.message })
  }

  const [, token] = bearer.split(' ')
  if (!token) {
    const error = new Error('Token no válido')
    return res.status(401).json({ error: error.message })
  }

  // verificar que el token sea nuestro y no haya expirado
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    // { "id": 5, "iat":19283019, "exp":19283019 }
    if (typeof decode === 'object' && decode.id) {
      req.user = await User.findByPk(decode.id, {
        attributes: ['id', 'name', 'email']
      })

      next()
    }
  } catch (error) {
    // console.log(error)
    res.status(500).json({ error: 'Token no válido' })
  }
}