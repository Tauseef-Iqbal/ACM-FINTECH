const { Op } = require('sequelize');
const { hash } = require('../utils/hashing');
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require('../utils/sendResponse');
const DBInitializer = require('../../db/connection');
const CourseModel = require('../utils/courses/courses.model');

/**
 * Description of the auth module.
 * @module course-controller
 * @type {{courses:Function}}
 * @type {{createCourse:Function}}
 * @type {{getCourseById:Function}}
 * @type {{getCourseByName:Function}}
 * @type {{updateCourse:Function}}
 * @type {{deleteCourse:Function}}
 */
module.exports = {
  /**
   * Description of the courses controller.
   * @function courses
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */
  async courses(req, res) {
    try {
      let db = await DBInitializer();
      const Course = new CourseModel(db.models.Course);
      return sendSuccessResponse(
        res,
        201,
        await Course.getCourses(),
        'All registered courses'
      );
    } catch (e) {
      console.error(e);
      return sendErrorResponse(
        res,
        500,
        'Could not perform operation at this time, kindly try again later.',
        e
      );
    }
  },

  /**
   * Description of the createCourse controller.
   * @function createCourse
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */
  async createCourse(req, res) {
    try {
      let db = await DBInitializer();
      const Course = new CourseModel(db.models.Course);
      const { name } = req.body;
      let where = {
        name,
      };
      let course = await Course.getCourse(where);
      if (course && course.length) {
        return sendErrorResponse(
          res,
          422,
          'Course with that email or phone already exists'
        );
      }
      const settings = {
        notification: {
          push: true,
          email: true,
        },
      };
      let newCourse = await Course.createCourse({
        name,
      });
      return sendSuccessResponse(
        res,
        201,
        newCourse.dataValues,
        'Course Created Successfully!'
      );
    } catch (e) {
      console.error(e);
      return sendErrorResponse(
        res,
        500,
        'Could not perform operation at this time, kindly try again later.',
        e
      );
    }
  },

  /**
   * Description of the getCourseById controller.
   * @function getCourseById
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */
  async getCourseById(req, res) {
    try {
      let db = await DBInitializer();
      const Course = new CourseModel(db.models.Course);
      return sendSuccessResponse(
        res,
        201,
        await Course.getCourseById(req.params.id),
        'A Course data'
      );
    } catch (e) {
      console.error(e);
      return sendErrorResponse(
        res,
        500,
        'Could not perform operation at this time, kindly try again later.',
        e
      );
    }
  },

  /**
   * Description of the getUserByName controller.
   * @function getUserByName
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */
  async getCourseByName(req, res) {
    try {
      let db = await DBInitializer();
      const Course = new CourseModel(db.models.Course);
      return sendSuccessResponse(
        res,
        201,
        await Course.getCourse({ name: req.params.name }),
        'A Course data'
      );
    } catch (e) {
      console.error(e);
      return sendErrorResponse(
        res,
        500,
        'Could not perform operation at this time, kindly try again later.',
        e
      );
    }
  },

  /**
   * Description of the updateCourse controller.
   * @function updateCourse
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */
  async updateCourse(req, res) {
    try {
      let db = await DBInitializer();
      const Course = new CourseModel(db.models.Course);
      const { courseName } = req.params;
      const { newName } = req.body;
      let where = {
        name: courseName,
      };
      console.log('where>>>>>', where);
      let course = await Course.getCourse(where);
      if (!course) {
        return sendErrorResponse(
          res,
          422,
          'Course with that name does not exist'
        );
      }
      const toBeUpdated = {
        name: newName,
      };
      console.log('toBeUpdated>>>>>', toBeUpdated);
      const updatedCourse = await Course.updateCourse(toBeUpdated, {
        name: courseName,
      });
      console.log('updatedCourse', updatedCourse);
      if (!updatedCourse.length) {
        return sendErrorResponse(res, 500, 'Error updating Course.', e);
      }
      return sendSuccessResponse(
        res,
        201,
        updatedCourse[1],
        'Course Updated Successfully!'
      );
    } catch (e) {
      console.error(e);
      return sendErrorResponse(
        res,
        500,
        'Could not perform operation at this time, kindly try again later.',
        e
      );
    }
  },

  /**
   * Description of the deleteCourse controller.
   * @function deleteCourse
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */
  async deleteCourse(req, res) {
    try {
      let db = await DBInitializer();
      const Course = new CourseModel(db.models.Course);
      const existedCourse = await Course.getCourseById(req.params.id);
      if (!existedCourse) {
        return sendErrorResponse(res, 422, 'Course does not exist');
      }
      const deletedCourse = await existedCourse.destroy();
      return sendSuccessResponse(
        res,
        201,
        deletedCourse,
        `Course with ID: ${existedCourse.id} Deleted Successfully`
      );
    } catch (e) {
      console.error(e);
      return sendErrorResponse(
        res,
        500,
        'Could not perform operation at this time, kindly try again later.',
        e
      );
    }
  },
};
