console.log('Loading function');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = (event, context, callback) => {
    console.log(JSON.stringify(event, null, '  '));
    var params = {
        'TableName': 'Message',
        'Item' : { "messageid": {
                                S: event.Records[0].Sns.MessageId
                                 },
                                 "message": {
                                S: event.Records[0].Sns.Message
                                 }
        }
    };
    
    dynamodb.putItem(params, function(err, data) {
        if (err) {
            console.log('Error putting item into dynamodb failed: '+err);
            context.done('error');
        }
        else {
            console.log('great success: '+JSON.stringify(data, null, '  '));
            context.done('Done');
        }
    });
};
