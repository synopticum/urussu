const UserModel = require("../../../db/user.model");
const getAvatarUrlFromVkApi = require("./getAvatarUrlFromVkApi");

module.exports = async function (fastify, opts) {
  fastify.register(registerRoutes);
};

async function registerRoutes(fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/users/:user/avatar",
    handler: getDefault,
  });
}

async function getDefault(request, reply) {
  let id = request.params.user;
  let user = await UserModel.findOne({ id }).select({ _id: 0, __v: 0 });

  if (!user) {
    reply.type("application/json").code(404);
    return { error: "User not found" };
  }

  reply.type("application/json").code(200);
  return await prepareResponse(user);
}

async function prepareResponse(user) {
  const vkId = user._doc.vkId;
  return await getAvatarUrlFromVkApi(vkId);
}
