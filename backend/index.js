const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { Word } = require("./models/word");
require("dotenv").config();

const APP_PORT = process.env.PORT || 8081;

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
    console.log("connected to mongodb");
});

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/", (_, res) => {
    res.send("Welcome to Incubyte challenge");
});

app.post("/create-word", async (req, res) => {
    let newWord = new Word({
        word: req?.body?.word,
    });
    newWord.save(function (err, wordSaved) {
        if (!err) {
            res?.status(201)?.json({ id: wordSaved._id });
        } else {
            res?.sendStatus(409);
        }
    });
});

app.get("/all-words", async (req, res) => {
    try {
        let allWords = await Word?.find({})?.exec();
        res?.status(200)?.json(allWords);
    } catch (error) {
        res?.sendStatus(404);
    }
});

app.patch("/update-word", async (req, res) => {
    try {
        const updatedWord = await Word?.findOneAndUpdate(
            { word: req?.query?.existingWord },
            { word: req?.query?.newWord },
            { new: true }
        );
        if (updatedWord) {
            res?.status(201)?.json(updatedWord);
        } else {
            res?.sendStatus(404);
        }
    } catch (error) {
        res?.sendStatus(404);
    }
});

app.delete('/delete-word/:word', async (req, res) => {
    try {
        const deletedWord = await Word?.findOneAndDelete({ word: req?.params?.word })?.exec();
        if (deletedWord) {
            res?.status(204)?.json(deletedWord);
        }
        else {
            res?.sendStatus(404);
        }
    }
    catch (error) {
        res?.sendStatus(404);
    }
})

app.listen(APP_PORT, () => {
    console.log(`Server listening on port ${APP_PORT}`);
});
