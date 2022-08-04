const express = require("express");
const cookie = require("cookie");
const {
    getTokens,
    refreshTokenTokenAge,
    getHashPassword,
} = require("./utils");
const { adminUser } = require("./data");

const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
    const { login, password } = req.body;

    const hash = getHashPassword(password);
    const isVerifiedPassword = hash === adminUser.passwordHash;

    if (login !== adminUser.login || !isVerifiedPassword) {
        return res.status(401).send("Login fail");
    }

    const { accessToken, refreshToken } = getTokens(login);
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: refreshTokenTokenAge,
        })
    );
    res.send({ accessToken });
});

authRouter.get("/logout", (req, res) => {
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("refreshToken", "", {
            httpOnly: true,
            maxAge: 0,
        })
    );
    res.sendStatus(200);

});

module.exports = authRouter;