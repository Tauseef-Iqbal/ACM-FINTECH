/**
 * USER MODEL
 * @module UserModel
 * @return {sendErrorResponse|next}
 */
module.exports = class UserModel {
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
   * Description of the getUserById.
   * @function getUserById
   * @param {id} id - id of the user to be retrieved
   * @return {object}
   */
  async getUserById(id) {
    return this.model.findByPk(id);
  }

  /**
   * Description of the getUser.
   * @function getUser
   * @param {object} where - custom condition on which user is to be retrieved
   * @param {Array} attributes - attributes of the user to be retrieved
   * @param {Array} include - models to be included for the joins
   * @return {object}
   */
  async getUser(where, attributes = null, include = []) {
    const user = await this.model.findOne({ where, attributes, include });
    return user;
  }

  /**
   * Description of the createUser.
   * @function createUser
   * @param {object} user - user records to be created
   * @return {object}
   */
  async createUser(user) {
    const newUser = await this.model.create(user);
    return newUser;
  }

  /**
   * Description of the updateUser.
   * @function updateUser
   * @param {object} update - user records to be updated
   * @param {object} where - condition on which records are updated
   * @return {object}
   */
  async updateUser(update, where) {
    return this.model.update(update, { where, returning: true });
  }

  async countUsers(where, include = null) {
    return this.model.count({
      where,
      distinct: true,
      include,
    });
  }

  /**
   * Description of the getUsers.
   * @function getUsers
   * @param {object} where - condition on which records are fetched
   * @param {object} attributes - attributes to be fetched
   * @param {number} limit - maximum number of records to retrieve
   * @param {number} offset - starting point of the records
   * @param {Array} include - models to be included for the joins
   * @param {string} order - how to order the results
   * @return {object}
   */
  async getUsers(
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
   * Description of the deleteUser.
   * @function deleteUser
   * @param {object} where - condition on which records are deleted
   * @return {object}
   */
  async deleteUser(where) {
    return this.model.destroy({ where });
  }
};
