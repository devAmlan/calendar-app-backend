const config = require("../../config/config");
const { OAuth2Client } = require("google-auth-library");
const { findUser, insertUser } = require("./auth.query");
const { sendSuccess } = require("../../helpers/response");
const { issueToken } = require("../../helpers/auth");

exports.postLoginGoogle = async (req, res, next) => {
  // const { googleClientId } = config;

  const { email, picture, name, role } = req.body;
  // const client = new OAuth2Client();

  // const ticket = await client.verifyIdToken({
  //   idToken: token,
  //   audience: googleClientId,
  // });

  // const payload = ticket.getPayload();
  // console.log(payload);

  // const { email, name, picture } = payload;

  try {
    // const response = await fetch(
    //   `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //     method: "POST",
    //   }
    // );
    // console.log(response);
    // const { email, picture, name } = response.data;

    const result = await findUser({ email: email.toLowerCase() });
    if (!result) {
      const newData = {
        email,
        name,
        profileImage: picture,
        lastLoginAt: new Date(),
        role,
      };
      const insertData = await insertUser(newData);
      const token = issueToken({
        _id: insertData._id,
        email: insertData.email,
        role: insertData.role,
      });
      sendSuccess(
        res,
        {
          token,
          lastLoginAt: new Date(),
          isNew: insertData.isNew,
          picture,
          name: insertData.name,
        },
        "",
        201
      );
    } else {
      const token = issueToken({
        _id: result._id,
        email: result.email,
        role: result.role,
      });
      return sendSuccess(res, {
        token,
        lastLoginAt: new Date(),
        isNew: false,
        picture,
        name: result.name,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
