const Cryptr = require("cryptr");

exports.generateInvitecode = (organizationId) => {
  try {
    const orgStrId = String(organizationId);
    const cryptr = new Cryptr(process.env.SECRET_KEY, {
      encoding: "base64",
      pbkdf2Iterations: 10000,
      saltLength: 1,
    });
    const encryptedString = cryptr.encrypt(orgStrId);

    return encryptedString;
  } catch (error) {}
};

exports.validateInviteCode = (inviteCode) => {
  try {
    const decryptedString = cryptr.decrypt(inviteCode);
    return decryptedString;
  } catch (error) {
    return null;
  }
};
