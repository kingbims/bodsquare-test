require('dotenv')
const amqp = require('amqplib/callback_api')


exports.producer = async () => {
    try {
        //Create connection
        amqp.connect(process.env.RABBITMQ_URL, (error, connection) => {
            if (error) {
                throw error
            }
            
            //Create channel
            connection.createChannel((error, channel) => {
                if (error) {
                    throw error
                }
        
                const queueName = 'AirTableExchange'
                let message = 'Task Created Successfully'
                
                //Assert queue
                channel.assertQueue(queueName)
        
                //Send message to queue
                channel.sendToQueue(
                    queueName,
                    Buffer.from(message)
                )
                console.log(`Message Sent: ${message}`)
            })
        })
        return
    } catch (error) {
        error.source = 'Producer Queue Message Function'
        throw error
    }
}

exports.receiver = async () => {
    try {
        //Create connection
        amqp.connect(process.env.RABBITMQ_URL, (error, connection) => {
            if (error) {
                throw error
            }
        
            //Create channel
            connection.createChannel((error, channel) => {
                if (error) {
                    throw error
                }
        
                const queueName = 'AirTableExchange'
        
                //Assert queue
                channel.assertQueue(queueName)
        
                //Receive message
                channel.consume(queueName, (msg) => {
                    setTimeout(() => {
                        console.log(`Message Received: ${msg.content}`)
                    }, 10000)
                }, {
                    noAck: true
                })
            })
        })
        return
    } catch (error) {
        error.source = 'Receiver Queue Message Function'
        throw error
    }
}