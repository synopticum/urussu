const { ObjectModel, prepare } = require("../../../../db/object.model");

module.exports = async function (fastify, opts) {
  fastify.register(registerRoutes);
};

async function registerRoutes(fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/stats/buildings/addresses",
    handler: get,
  });

  async function get(request, reply) {
    try {
      reply.type("application/json").code(200);
      return await getAddresses();
    } catch (e) {
      reply.type("application/json").code(500);
      console.error(e);
      return { error: `Unable to get addresses: error when finding in db` };
    }
  }
}

async function getAddresses() {
  const query = {
    house: { $nin: ["", undefined] },
    street: { $nin: ["", undefined] },
  };
  const raw = await ObjectModel.find(query, ["street", "house", "id"]).select({
    _id: 0,
  });
  return prepare(raw);
}
