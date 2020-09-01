import {Consumer, KafkaClient, KeyedMessage, Producer} from 'kafka-node'


const km = new KeyedMessage('key', 'message')
const payloads = [
    {topic: 'topic1', messages: 'hi', partition: 0},
    {topic: 'topic2', messages: ['hello', 'world', km]}
];


export class KafkaManager {
    private client: KafkaClient;
    private producer: Producer;
    // TODO: implement with kue or rxjs
    private static jobQueue: Array<object> = []
    private consumer: Consumer;


    constructor() {
        this.client = new KafkaClient({kafkaHost: 'localhost:9092'});
        this.producer = new Producer(this.client);
        this.consumer = new Consumer(this.client, [
            { topic: 'topic1', partition: 0 }, { topic: 'topic2', partition: 0 }
        ], {});
    }

    initialize() {
        this.initializeProducer()
        this.initializeConsumer()
    }

    private initializeProducer() {
        this.producer.on('ready', () => {
            setInterval(() => {
                    this.producer.send(payloads, function (err, data) {
                        console.log(`[producer] - sent ${JSON.stringify(data)}`);
                    })
                }, 1000
            )
        });

        this.producer.on('error', function (err) {
            console.log(err)
        })
    }

    private initializeConsumer() {
        this.consumer.on('message', function (message) {
            console.log(`[consumer] - received ${JSON.stringify(message)}`);
        });
    }

    static sendMessage(event: object) {
        this.jobQueue.push(event);
    }
}