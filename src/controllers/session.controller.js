import * as sessionsDBProvider from "../libs/dynamodb/index.js";
import * as Logger from "../utils/logger.js";


const storeSesion = async (req, res) => {
  try {

    const result = await sessionsDBProvider.putItemHandler(req.body);

    Logger.writeLog({
      url: req.url,
      body: req.body,
      result: result,
    });

    res.status(200).json({
      message: "Session stored successfully!",
    });
  } catch (error) {
    Logger.writeLog({
      url: req.url,
      body: req.body,
      error: error,
    });
    res.status(error.statusCode).json({
      type: error.type,
      message: error.message,
    });
  }
};

const removeSession = async (req, res) => {
  try {
    const { accessToken } = req.body;

    const removeExistingSessions = await sessionsDBProvider.remoteItemHandler(
      accessToken
    );

    Logger.writeLog({
      url: req.url,
      result: "OK",
      session: removeExistingSessions,
    });

    res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    Logger.writeLog({
      url: req.url,
      body: req.body,
      error: error,
    });
    res.status(error.statusCode).json({
      type: error.type,
      message: error.message,
    });
  }
};

const healthCheck = async(req, res) => {
  Logger.writeLog({
    url: req.url,
    result: "OK",
    msg: "Middleware service is healthy",
  });
  res.status(200).json({
    message: "OK",
  });
}

const validateUserSession = async (req, res) => {
  try {
    const { accessToken } = req.body;

    // Gets session in dynamodb
    const result = await sessionsDBProvider.getItemHandler(accessToken);

    // Check validity
    const currentTime = new Date();
    const difference = currentTime - result.item.timestamp;
    const sessionLength = 1000 * 60 * 60;

    if (Math.abs(difference) > sessionLength) {
      return res.status(401).json({
        success: false,
        type: "InvalidTokenException",
        message: "The token has expired, please login again.",
      });
    }

    Logger.writeLog({
      url: req.url,
      body: req.body,
      result: result,
    });

    res.status(200).json({
      userId: result.item.userId,
      email: result.item.email,
      valid: true
    });
  } catch (error) {
    Logger.writeLog({
      url: req.url,
      body: req.body,
      error: error,
    });
    res.status(error.statusCode).json({
      type: error.type,
      message: error.message,
    });
  }
};

export default {
  storeSesion,
  removeSession,
  validateUserSession,
  healthCheck
};
