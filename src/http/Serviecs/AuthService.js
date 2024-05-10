var _ = require("lodash");
var configPassport = require("../../config/passport");
var jwt = require("jsonwebtoken");
var { jwtDecode } = require("jwt-decode");
var AuthRepository = require("../repositories/AuthRepository");

class AuthService {
  Login = async (accountname) => {
    try {
      const result = await AuthRepository.Login(accountname);
      const accountt = _.first(result);
      const { user_id, account, name, email, role } = accountt;
      const token = jwt.sign(
        {
          id: user_id,
          name,
          role,
        },
        configPassport.jwt.secretOrKey,
        { expiresIn: "24h" }
      );
      return {
        status: 200,
        data: {
          Token: "Bearer " + token,
          Account: account,
          Name: name,
          Email: email,
          RoleName: role,
        },
      };
    } catch (err) {
      return {
        status: 500,
        message: "輸入資料錯誤",
      };
    }
  };
}

module.exports = new AuthService();
