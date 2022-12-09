/**
 * COURSE MODEL
 * @module CourseModel
 * @return {sendErrorResponse|next}
 */
module.exports = class CourseModel {
  /**
   *@constructor
   * @param {object} model - The model sent to sequelize
   */
  constructor(model) {
    /**
     * @property {object} model - The model mapped by sequelize
     */
    this.model = model;
  }

  /**
   * Description of the getCourseById.
   * @function getCourseById
   * @param {id} id - id of the course to be retrieved
   * @return {object}
   */
  async getCourseById(id) {
    return this.model.findByPk(id);
  }

  /**
   * Description of the getCourse.
   * @function getCourse
   * @param {object} where - custom condition on which course is to be retrieved
   * @param {Array} attributes - attributes of the course to be retrieved
   * @param {Array} include - models to be included for the joins
   * @return {object}
   */
  async getCourse(where, attributes = null, include = []) {
    const course = await this.model.findOne({ where, attributes, include });
    return course;
  }

  /**
   * Description of the createCourse.
   * @function createCourse
   * @param {object} course - course records to be created
   * @return {object}
   */
  async createCourse(course) {
    const newCourse = await this.model.create(course);
    return newCourse;
  }

  /**
   * Description of the updateCourse.
   * @function updateCourse
   * @param {object} update - course records to be updated
   * @param {object} where - condition on which records are updated
   * @return {object}
   */
  async updateCourse(update, where) {
    return this.model.update(update, { where, returning: true });
  }

  async countCourses(where, include = null) {
    return this.model.count({
      where,
      distinct: true,
      include,
    });
  }

  /**
   * Description of the getCourses.
   * @function getCourses
   * @param {object} where - condition on which records are fetched
   * @param {object} attributes - attributes to be fetched
   * @param {number} limit - maximum number of records to retrieve
   * @param {number} offset - starting point of the records
   * @param {Array} include - models to be included for the joins
   * @param {string} order - how to order the results
   * @return {object}
   */
  async getCourses(
    where = null,
    attributes = null,
    limit = null,
    offset = null,
    include = null,
    order = null
  ) {
    return this.model.findAll({
      where,
      attributes,
      limit,
      offset,
      include,
      order,
      distinct: true,
    });
  }

  /**
   * Description of the deleteCourse.
   * @function deleteCourse
   * @param {object} where - condition on which records are deleted
   * @return {object}
   */
  async deleteCourse(where) {
    return this.model.destroy({ where });
  }
};
