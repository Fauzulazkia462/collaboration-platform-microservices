const kafka = require('kafka-node');

const client = new kafka.KafkaClient({
    kafkaHost: process.env.KAFKA_BROKER
});

const producer = new kafka.Producer(client);

producer.on('ready', () => {
    console.log('Kafka Producer ready');
});

function sendEvent(topic, message) {
    const payloads = [
        {
            topic,
            messages: JSON.stringify(message)
        }
    ];

    producer.send(payloads, (err, data) => {
        if (err) console.error(err);
        else console.log('Event sent:', data);
    });
}

module.exports = { sendEvent };