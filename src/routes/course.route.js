const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courses.controller');
const Auth = require('../middlewares/Auth');
const can = require('../middlewares/canAccess');
const Constants = require('../utils/constants');

router.get(
  '/courses',
  Auth,
  can(Constants.PERMISSION_VIEW_ALL_COURSES),
  courseController.courses
);
router.get(
  '/get-course-by-id/:id',
  Auth,
  can(Constants.PERMISSION_VIEW_A_COURSE),
  courseController.getCourseById
);
router.get(
  '/get-course-by-name/:name',
  Auth,
  can(Constants.PERMISSION_VIEW_A_COURSE),
  courseController.getCourseByName
);
router.post(
  '/create-course',
  Auth,
  can(Constants.PERMISSION_ADD_A_COURSE),
  courseController.createCourse
);
router.put(
  '/update-course/:courseName',
  Auth,
  can(Constants.PERMISSION_UPDATE_A_COURSE),
  courseController.updateCourse
);
router.delete(
  '/delete-course/:id',
  Auth,
  can(Constants.PERMISSION_VIEW_ALL_COURSES),
  courseController.deleteCourse
);

module.exports = router;
