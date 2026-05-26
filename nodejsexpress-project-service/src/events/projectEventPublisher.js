const { sendEvent } = require('./kafkaProducer');

class ProjectEventPublisher {

    projectCreated(project) {
        sendEvent("project.created", project);
    }

    taskCreated(task) {
        sendEvent("task.created", task);
    }

    taskNotificationCreated(task) {
        sendEvent("task.notification.created", task);
    }
}

module.exports = new ProjectEventPublisher();