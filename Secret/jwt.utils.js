let jwt = require('jsonwebtoken');

const JWT_SING_SECRET = "HANCHI21081996AHMED2406Admin5231WEB0TOKEN1SECRTE5KEY7THIS89IS4NOT46DAT8SECURE"

module.exports = {
    generateTokenForUser: function(userData){
        return jwt.sign({
            UserId: userData.id
        },
        JWT_SING_SECRET,{
            expiresIn: '1h'
        }
    
    )},
    verifUserToken : function(data){
        return jwt.verify(data.token)
    }
}