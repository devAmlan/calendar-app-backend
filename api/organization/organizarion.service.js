const { fetchOrganization } = require("./organization.query");
exports.getOrganizationUser = async (req, res, next) => {
  const { _id } = req.body;
  const { role } = req.auth;
  try {
    const findQuery = {
      _id,
    };

    if (role === "") {
    }
    await fetchOrganization();
  } catch (error) {}
};
