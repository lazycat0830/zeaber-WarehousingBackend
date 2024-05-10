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
  Register = async (account, password, name, email, role) => {
    try {
      const result = await AuthRepository.Register(
        account,
        password,
        name,
        email,
        role
      );
      if (!result) {
        return {
          status: 404,
          data: null,
        };
      } else if (typeof result === "string") {
        return {
          status: 500,
          message: result,
        };
      } else if (typeof result === "object") {
        return {
          status: 200,
          data: "註冊成功!",
        };
      }
    } catch (err) {
      return {
        status: 500,
        message: "系統錯誤",
      };
    }
  };
}

module.exports = new AuthService();
