const { httpGet } = require('./mock-http-interface');

const extractMessages = (data) => 
  data.map(({ status, body }) => ({
    [status === 200 ? "Arnie Quote" : "FAILURE"]: JSON.parse(body).message
  }));

const getArnieQuotes = async (urls) => {
  const requests = urls.map(async (x) => await httpGet(x));
  const responses = await Promise.all(requests);
  const results = extractMessages(responses);

  return results;
};

module.exports = {
  getArnieQuotes,
};
