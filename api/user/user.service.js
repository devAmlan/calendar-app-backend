const { fetchUser } = require("./user.query");
const { sendSuccess, createError } = require("../../helpers/response");
const { findUser, updateUser, removeUser } = require("./user.query");
const {
  findOrganization,
  updateOrganization,
  insertOrganization,
  fetchOrganization,
} = require("../organization/organization.query");
const { generateInvitecode } = require("../../helpers/code");
exports.getUserProfile = async (req, res, next) => {
  const { userId } = req.auth;
  try {
    const userProfile = await fetchUser({
      _id: userId,
    });

    const { name, profileImage, role } = userProfile;

    sendSuccess(
      res,
      {
        name,
        profileImage,
        role,
      },
      "",
      201
    );
  } catch (error) {}
};

exports.registerUser = async (req, res, next) => {
  const { userId } = req.auth;
  const { organizationName } = req.body;

  try {
    const user = await findUser({ _id: userId });
    const organization = await findOrganization({ name: organizationName });
    if (!user) {
      // return 404 error ( User not found )
      createError("User not found", 404);
    } else if (organization) {
      // return error with proper code, (Organization name already exist.Try something different)
      createError(
        "Organization name already exist.Try something different",
        400
      );
    }

    const insertOrganizationData = {
      name: organizationName,
      employers: [userId],
    };

    const newOrganization = await insertOrganization(insertOrganizationData);

    const userFindQuery = {
      _id: userId,
    };
    const userUpdateQuery = {
      isNew: false,
      organizationId: newOrganization._id,
    };
    await updateUser(userFindQuery, userUpdateQuery);

    // write a function to create unique code using crypto. and save in db also send in response
    // response -> organization ID, invite code.

    const inviteCode = generateInvitecode(newOrganization._id);
    const organizationFindQuery = {
      _id: newOrganization._id,
    };
    const organizationUpdateQuery = {
      inviteCode,
    };

    await updateOrganization(organizationFindQuery, organizationUpdateQuery);

    sendSuccess(
      res,
      {
        inviteCode,
      },
      "",
      201
    );
  } catch (error) {
    console.log(error);
  }
};

exports.joinUser = async (req, res, next) => {
  try {
  } catch (error) {}
};

exports.getOrganization = async (req, res, next) => {
  const { userId, role } = req.auth;

  let fetchQuery;

  if (role === "employer") {
    fetchQuery = { employers: { $in: [userId] } };
  } else if (role === "employee") {
  }

  const organization = await fetchOrganization(fetchQuery);
  sendSuccess(
    res,
    {
      name: organization.name,
    },
    200
  );
};

exports.removeUserFromOrganization = async (req, res, next) => {
  const { id } = req.params;
  const { role, userId } = req.auth;

  const fetchQuery = { employers: { $in: [userId] } };
  const isUserAdmin = await fetchOrganization(fetchQuery);

  if (role === "employer" && isUserAdmin) {
    // also add a condition of admin ID is in employers list of that organization or not
    const deleteQuery = {
      _id: id,
    };
    removeUser(deleteQuery);

    sendSuccess(res, {}, "User Deleted successfully", 200);
  }
};
