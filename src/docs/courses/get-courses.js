module.exports = {
  get: {
    tags: ['User CRUD operations'],
    description: 'Get Courses',
    operationId: 'getCourses',
    parameters: [],
    responses: {
      200: {
        summary: 'Retrieve a list of Courses',
        description: 'Courses were obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
          },
        },
      },
    },
  },
};
