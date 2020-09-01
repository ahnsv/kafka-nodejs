import express from 'express';
import {KafkaManager} from "./main";

const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
    const kafkaMgr = new KafkaManager();
    kafkaMgr.initialize();
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});