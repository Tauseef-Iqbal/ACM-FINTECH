module.exports = {
  get: {
    tags: ['User CRUD operations'],
    description: 'Get Dashboard',
    operationId: 'getDashboard',
    parameters: [],
    responses: {
      200: {
        summary: 'Retrieving dashboard information',
        description: 'Dashboard information is retrieved',
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
