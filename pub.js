const aws = require('aws-sdk')
const uuid = require('uuid');
aws.config.setPromisesDependency(require('bluebird'));

const client = new aws.EventBridge({
    region: 'us-east-1',
    logger: console,
  });

const main = async () => {
  const params = {
    Entries: [{
      EventBusName: 'eb-cwl-cwemf-stg-bus',
      Source: 'custom',
      DetailType: 'thing-created',
      Detail: JSON.stringify({
        id: uuid.v1(),
        type: 'thing-created',
        timestamp: Date.now(),
        thing: {
          id: uuid.v4(),
          name: 'thingN',
        }
      }),
    }],
  };

  try {
    await client.putEvents(params).promise().tap(console.log);
  } catch (err) {
    console.error(err);
  }
};

main();
