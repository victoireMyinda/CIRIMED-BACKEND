require('dotenv').config({ path: './config/.env' });

const express = require("express");
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: [process.env.CLIENT_URL1, process.env.CLIENT_URL2, process.env.CLIENT_URL3, process.env.CLIENT_URL4,
    process.env.CLIENT_URL5, process.env.CLIENT_URL6,],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRouter = require("./routes/users.routes");
const postsRouter = require("./routes/posts.routes");
const formationRouter = require("./routes/formation.routes");
const candidatsRouter = require("./routes/candidat.routes");

app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/formations", formationRouter);
app.use("/api/candidats", candidatsRouter);

app.use("/api/uploads", express.static('./uploads'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("APP ecoute sur le port ", + PORT);
});
