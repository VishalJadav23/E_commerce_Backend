import Jwt from "jsonwebtoken";
class Authentication {
  async CreateOrderAuth(req, res, next) {
    try {
      const { token } = req.headers;
      if (!token) return res.status(401).send({ message: "unAuthorised" });
      return Jwt.verify(token, process.env.JWT_SECRETE, (err, data) => {
        if (data) {
          req.body.userInfo = data;
          return next();
        } 

        if (err) {
          console.log(err);
          return res.status(401).send({ message: "unAuthorised" });
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal server Error" });
    }
  }
}

const authentication = new Authentication();
export default authentication;
