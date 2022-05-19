import pkg from 'firebase-admin';
import User from '../modals/user.js';
const { messaging } = pkg;

const sendPushNotification = async (body, teamId) => {
  const users = await User.find({ teamId: teamId });
  let tokens = users.map((user) => user.firebaseToken);
  tokens = tokens.filter((token) => token);
  if (tokens?.length < 1) {
    return;
  }
  const payload = {
    notification: {
      title: 'Octane',
      body: body,
    },
  };
  const options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24,
  };
  return await messaging().sendToDevice(tokens, payload, options);
};
const sendPushChatNotification = async (body, token) => {
  if (!token || token?.length < 1) return;
  const payload = {
    notification: {
      title: 'Octane',
      body: body,
    },
  };
  const options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24,
  };
  return await messaging().sendToDevice(token, payload, options);
};

export { sendPushNotification, sendPushChatNotification };
