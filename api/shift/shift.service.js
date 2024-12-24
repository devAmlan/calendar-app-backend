const { sendSuccess, createError } = require("../../helpers/response");
const { fetchShift } = require("./shift.query");
const { insertShift, updateShift } = require("./shift.query");
const moment = require("moment");
const constants = require("../../utils/constant");

exports.fetchShifts = async (req, res, next) => {
  const { date } = req.query;
  const { organizationId } = req.body;
  const { userId, role } = req.auth;

  if (!date) return createError("Date not found", 404);

  const targetDate = moment(date);

  const startOfDay = targetDate.startOf("day").toDate();
  const endOfDay = targetDate.endOf("day").toDate();

  try {
    const findQuery = {};

    if (role === constants.EMPLOYEE) {
      findQuery.employees = {
        $in: [userId],
      };
    } else if (role === constants.EMPLOYER) {
      findQuery.employer = {
        $in: [userId],
      };
    }

    if (startOfDay && endOfDay) {
      findQuery.start_time = {
        $gte: startOfDay,
        $lte: endOfDay,
      };
    }

    if (organizationId) {
      findQuery.organizationId = organizationId;
    }

    const shifts = await fetchShift(findQuery).populate(
      "employees",
      "email profileImage"
    );

    sendSuccess(
      res,
      {
        shifts: [...shifts],
      },
      201
    );
  } catch (error) {
    createError("Something went wrong", 401);
  }
};

exports.createShift = async (req, res, next) => {
  const { title, organizationId, start_time, end_time, employees } = req.body;
  const { userId, role } = req.auth;

  try {
    if (role === constants.EMPLOYER) {
      const insertData = {
        title,
        organizationId,
        start_time,
        end_time,
        employer: userId,
        employees: [...employees],
      };

      const newShift = await insertShift(insertData);

      sendSuccess(
        res,
        {
          title: newShift.title,
          start_time: newShift.start_time,
          end_time: newShift.end_time,
          employees: newShift.employees,
        },
        200
      );
    } else {
      createError("Unautherized", 401);
    }
  } catch (error) {
    createError("Something went wrong", 401);
  }
};

exports.updateShift = async (req, res, next) => {
  const { _id, start_time, end_time, employees } = req.body;

  try {
    if (role === constants.EMPLOYER) {
      const findQuery = {
        _id,
      };
      const updateQuery = {
        start_time,
        end_time,
        employees,
      };

      await updateShift(findQuery, updateQuery);
    } else {
      createError("Unautherized", 401);
    }
  } catch (error) {
    createError("Something went wrong", 400);
  }
};
