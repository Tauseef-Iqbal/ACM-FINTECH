module.exports = {
  get: {
    tags: ['User CRUD operations'],
    description: 'Get users',
    operationId: 'getUsers',
    parameters: [],
    responses: {
      200: {
        summary: 'Retrieve a list of users',
        description: 'Users were obtained',
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
