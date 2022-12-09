const helper = require('../utils/helper.util');
const config = require('../configs/general.config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  //query
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(course) {
  //query
  let message = 'Error in creating course';

  if (result.affectedRows) {
    message = 'course created successfully';
  }

  return { message };
}

async function update(id, course) {
  //query

  let message = 'Error in updating course';

  if (result.affectedRows) {
    message = 'course updated successfully';
  }

  return { message };
}

async function remove(id) {
  //query

  let message = 'Error in deleting course';

  if (result.affectedRows) {
    message = 'course deleted successfully';
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
};
