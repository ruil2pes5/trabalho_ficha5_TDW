const User = require('../Models/user');

const basicAuth = function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Acesso Restrito"');
        return res.status(401).send("Autenticação necessária.");
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
    const [username, password] = credentials.split(':');

    User.findOne({ username: username, password: password })
        .then(user => {
            if (!user) {
                res.setHeader('WWW-Authenticate', 'Basic realm="Acesso Restrito"');
                return res.status(401).send("Credenciais inválidas.");
            }
            next();
        })
        .catch(err => {
            return res.status(500).send("Erro no servidor: " + err.message);
        });
};

module.exports = basicAuth;