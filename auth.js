import jwt  from "jsonwebtoken";

export const auth = (request,response,next)=> {

  try{
    const token = request.header('x-auth-token')
  jwt.verify(token , process.env.SECRET_KEY)
  next();
  }
  catch(error){
    response.send({message : "Error"})
  }
}