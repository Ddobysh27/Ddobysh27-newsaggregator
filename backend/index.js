const express = require("express");
const cookieParser = require("cookie-parser");

const authRouter = require("./src/auth");
const { getTokens } = require("./src/auth/utils");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(authRouter);


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/devby', (req, res) => {
    request(
        { url: 'https://devby.io/rss' },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: err.message })
            }
            res.set('Content-Type', 'application/rss+xml')
            res.send(Buffer.from(body))
            console.log(res);
        }
    )
})

// console.log(getTokens("admin"));

const port = 3001;
app.listen(port, () => console.log(`server port: ${port}`));