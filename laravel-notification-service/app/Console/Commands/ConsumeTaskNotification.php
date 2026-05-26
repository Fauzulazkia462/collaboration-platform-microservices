<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use RdKafka\Conf;
use RdKafka\KafkaConsumer;

class ConsumeTaskNotification extends Command
{
    protected $signature = 'kafka:consume-tasks';
    protected $description = 'Consume task.notification.created events from Kafka and send notifications';

    public function handle()
    {
        $this->info("Starting Kafka consumer...");

        $conf = new Conf();

        $conf->set('group.id', 'notification-service');
        $conf->set('metadata.broker.list', env('KAFKA_BROKER', 'kafka:9092'));
        $conf->set('auto.offset.reset', 'earliest');

        $consumer = new KafkaConsumer($conf);

        $consumer->subscribe([
            'task.notification.created'
        ]);

        while (true) {
            $message = $consumer->consume(120 * 1000);

            switch ($message->err) {
                case RD_KAFKA_RESP_ERR_NO_ERROR:

                    $payload = json_decode($message->payload, true);

                    $this->info("Received task.notification.created event");

                    $this->sendNotification($payload);

                    break;

                case RD_KAFKA_RESP_ERR__TIMED_OUT:
                    // just continue listening
                    break;

                default:
                    $this->error($message->errstr());
                    break;
            }
        }
    }

    private function sendNotification(array $payload)
    {
        $taskName = $payload['title'] ?? 'Unknown Task';
        $email = $payload['assigned_to'] ?? null;

        $this->info("Sending email to: $email");
        $this->info("Task: $taskName");

        // simulate email
        logger()->info("EMAIL SENT", [
            'to' => $email,
            'task' => $taskName,
        ]);
    }
}