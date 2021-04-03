const fetch = require("node-fetch");
const Timeout = require("await-timeout");
const { VK_SERVICE_KEY, VK_API_VERSION } = require("../../../config");

async function getAvatarUrlFromVkApi(vkId) {
  const timer = new Timeout();
  let response;

  try {
    response = await Promise.race([
      await fetch(
        `https://api.vk.com/method/users.get?access_token=${VK_SERVICE_KEY}&v=${VK_API_VERSION}&user_ids=${vkId}&fields=photo_100`
      ),
      timer.set(5000, "VK API timeout rejection"),
    ]);
  } catch (e) {
    return "";
  } finally {
    timer.clear();
  }

  let json = await response.json();
  const avatarUrl =
    json.response && json.response[0] ? json.response[0].photo_100 : null;

  return avatarUrl;
}

module.exports = getAvatarUrlFromVkApi;
