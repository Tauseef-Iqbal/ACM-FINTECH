const getCourses = require('./get-courses');
const getCourseById = require('./get-course-by-id');
const getCourseByName = require('./get-course-by-name');
const createCourse = require('./create-course');
const updateCourse = require('./update-course');
const deleteCourse = require('./delete-course');
module.exports = {
  paths: {
    '/courses': {
      ...getCourses,
    },
    '/get-course-by-name/{name}': {
      ...getCourseByName,
    },
    '/get-course-by-id/{id}': {
      ...getCourseById,
    },
    '/create-course': {
      ...createCourse,
    },
    '/update-course': {
      ...updateCourse,
    },
    '/delete-course': {
      ...deleteCourse,
    },
  },
};
