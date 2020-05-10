const { DocumentClient } = require("aws-sdk/clients/dynamodb");
const ddb = new DocumentClient();
const { to } = require("await-to-js");

const get = async (TableName, id) => {
  const [error, result] = await to(
    ddb
      .get({
        TableName,
        Key: {
          id
        }
      })
      .promise()
  );

  if (error) {
    throw error;
  }

  return [null, result.Item];
};

const list = async (TableName, params = {}) => {
  const [error, result] = await to(
    ddb
      .scan({
        TableName,
        Limit: params.limit,
        ExclusiveStartKey: params.nextToken
      })
      .promise()
  );

  if (error) {
    throw error;
  }

  return [
    null,
    {
      items: result.Items,
      nextToken: result.LastEvaluatedKey,
      total: result.ScannedCount
    }
  ];
};

const create = async (TableName, Item) => {
  const [error] = await to(ddb.put({ TableName, Item }).promise());

  if (error) {
    throw error;
  }

  return [null, Item];
};

const update = async (TableName, Item) => {
  const AttributeUpdates = {};

  for (let i in Item) {
    if (i !== "id") {
      AttributeUpdates[i] = {
        Action: "PUT",
        Value: Item[i]
      };
    }
  }

  const [error] = await to(
    ddb
      .update({
        TableName,
        Key: {
          id: Item.id
        },
        AttributeUpdates
      })
      .promise()
  );

  if (error) {
    throw error;
  }

  return get(TableName, Item.id);
};

module.exports = {
  get,
  list,
  create,
  update
};
