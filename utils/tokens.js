import jwt from 'jsonwebtoken';

export const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "2d",
  });
};


export function createResetToken(data) {
  return jwt.sign(data, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5d' });
}