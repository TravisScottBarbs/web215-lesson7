import express from "express";
import mongoose from "mongoose";
import data from './data.js';
import Videos from './dbModel.js'

//app config
const app = express();
const port = 9000;
const connection_url = 'mongodb+srv://admin:6z6ag24re@cluster0.blddu.mongodb.net/tinderdb?retryWrites=true&w=majority';

//middlewares
app.use(express.json());
app.use(Cors());

//db config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

//api endpoints
app.get('/', (req, res) => res.status(200).send('Hello world'));
app.get('/v1/posts', (req, res) => res.status(200).send(Data));
app.get('/v2/posts', (req, res) => {
    Videos.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data);
        }
    })
})

app.post('/v2/posts', (req, res) => {
    const dbVideos = req.body

    Videos.create(dbVideos, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data);
        }
    })
})

//listener
app.listen(port, ()=> console.log('listening on localhost:${port}'));
