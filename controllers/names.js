const getName = require("../scrappers/getnames");
const getVideoLink = require("../scrappers/serialLink");

const getNames = async (req, res) => {
  try {
    const channelName = req.params.channelname;
    const value = await getName(channelName);
    console.log('hehe')
    res.status(200).send(value);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getLink = async (req, res) => {
  try {
    const channelName = req.body.channelname;
    const serialName = req.body.serialname;
    const link = await getVideoLink(channelName, serialName);
    res.status(200).send(link);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
module.exports = { getNames, getLink };
