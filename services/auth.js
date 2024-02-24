import JWT from "jsonwebtoken";
const { sign, verify } = JWT;

const secretKey =
    "*c<o6#[/&(9wK=eCk<3a_sGpjWvBbg3<I6;=#RZ8)9a}cE6IC9crgJd&QZB4[!";

class Auth {
    /**
     * create user JWT Token
     **/
    createUser(user) {
        const userData = {
            _id: user._id,
            email: user.email,
            password: user.password,
            role: user.role.name,
        };
        return sign(userData, secretKey);
    }

    /**
     * verify user JWT Token
     */
    getUser(token) {
        if (!token) return null;

        const user = verify(token, secretKey);
        return user;
    }
}

export const auth = new Auth();
