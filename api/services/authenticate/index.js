const fetch = require("node-fetch");
const Timeout = require("await-timeout");
const UserModel = require("../../db/user.model");
const uuidv4 = require("uuid/v4");
const {
  HOST,
  VK_CLIENT_ID,
  VK_CLIENT_SECRET,
  VK_API_VERSION,
} = require("../../config");

module.exports = async function (fastify, opts) {
  fastify.register(registerRoutes);
};

async function registerRoutes(fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/authenticate",
    handler: async function verifyVkAuth(request, reply) {
      let origin = `${HOST}/login`;
      let code = request.query.code;

      if (code) {
        let { accessToken, expiresIn } = await getAccessToken(code, origin);

        if (accessToken) {
          let tokenExpiresIn = Date.now() + expiresIn * 1000;
          let token = uuidv4();
          let { vkId, firstName, lastName, image } = await getUserInfo(
            accessToken
          );
          let user = await UserModel.findOne({ vkId });

          if (user) {
            user.token = token;
            user.tokenExpiresIn = tokenExpiresIn;
            user = await user.save();
          }

          if (!user && vkId && firstName && lastName) {
            user = await UserModel.create({
              id: uuidv4(),
              vkId,
              tokenExpiresIn,
              firstName,
              lastName,
              image,
              token,
              role: "member",
            });
          }

          if (!user && !vkId && !firstName && !lastName) {
            reply.code(401);
            return {
              error:
                "User does not exist, and there is not enough user information to create a new one",
            };
          }

          reply.code(200);
          return {
            vkId: user.vkId,
            firstName: user.firstName,
            lastName: user.lastName,
            token: user.token,
          };
        }

        reply.code(401);
        return {
          error: `Cannot get access token using provided auth code ${code}`,
        };
      }

      reply.code(401);
      return { error: "Auth code is not provided" };
    },
  });
}

async function getAccessToken(code, origin) {
  try {
    let response = await fetch(
      `https://oauth.vk.com/access_token?client_id=${VK_CLIENT_ID}&client_secret=${VK_CLIENT_SECRET}&redirect_uri=${origin}&code=${code}`
    );
    let json = await response.json();

    // console.log(VK_CLIENT_ID, VK_CLIENT_SECRET, origin, code);
    // console.log(json);

    return !json.error
      ? { accessToken: json.access_token, expiresIn: json.expires_in }
      : {};
  } catch (e) {
    // console.error(e);
    return {};
  }
}

async function getUserInfo(accessToken) {
  const timer = new Timeout();
  let response;

  try {
    response = await Promise.race([
      fetch(
        `https://api.vk.com/method/users.get?access_token=${accessToken}&v=${VK_API_VERSION}&fields=photo_100`
      ),
      timer.set(5000, "VK API timeout rejection"),
    ]);
  } catch (e) {
    return {};
  } finally {
    timer.clear();
  }

  let json = await response.json();

  if (!json.error) {
    let userInfo = json.response ? json.response[0] : null;

    if (userInfo) {
      return {
        vkId: userInfo.id,
        firstName: userInfo.first_name,
        lastName: userInfo.last_name,
        image: userInfo.photo_100,
      };
    }
  }

  return {};
}
