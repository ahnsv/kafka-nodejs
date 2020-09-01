import express, {} from 'express';
import {KafkaManager} from "./main";
import {ProduceRequest} from "kafka-node";

const app = express();
app.use(express.json())

const kafkaMgr = new KafkaManager();
kafkaMgr.initialize();

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
});

app.post('/ingest', (req: express.Request, res: express.Response) => {
    try {
        const body = req.body;
        const payload: ProduceRequest = {
            topic: 'topic1',
            messages: body
        };
        kafkaMgr.sendMessage(payload);
        res.send('OK')
    } catch (e) {
        console.log(e)
    }
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});