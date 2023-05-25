const { Kafka } = require("kafkajs");


const USER_TOPIC = "user-topic"
const GROUP_ID = "user-group"
const kafka = new Kafka({
	clientId: "user-service-kubernetes",
	brokers: [`${process.env.KAFKA_SERVER || "localhost:29092"}`],
});

const producer = kafka.producer();
// const consumer = kafka.consumer({ groupId: GROUP_ID });

const run = async (payload) => {
	await producer.connect();
	await producer.send({
		topic: USER_TOPIC,
		messages: [{ value: payload }],
	});

	// await consumer.connect();
	// await consumer.subscribe({ topic: USER_TOPIC, fromBeginning: true });

	// await consumer.run({
	// 	eachMessage: async ({ topic, partition, message }) => {
	// 		console.log({
	// 			partition,
	// 			offset: message.offset,
	// 			value: message.value.toString(),
	// 		});
	// 	},
	// });
};


module.exports = {
    run
};