const { ObjectModel, prepare } = require("../../../../db/object.model");

module.exports = async function (fastify, opts) {
  fastify.register(registerRoutes);
};

async function registerRoutes(fastify, opts) {
  fastify.route({
    method: "GET",
    url: "/stats/buildings/pictured",
    handler: get,
  });

  async function get(request, reply) {
    try {
      reply.type("application/json").code(200);
      return await getPictured();
    } catch (e) {
      reply.type("application/json").code(500);
      console.error(e);
      return { error: `Unable to get: error when finding in db` };
    }
  }
}

async function getPictured() {
  const query = {};
  const result = await ObjectModel.find(query, ["images", "id"]).select({
    _id: 0,
  });
  const filtered = result.map(({ _doc: { id, images } }) => ({
    id,
    images: Boolean(images),
  }));

  return prepare(filtered);
}
