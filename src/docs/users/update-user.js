module.exports = {
  post: {
    tags: ['User CRUD operations'],
    description: 'Update user',
    operationId: 'updateUser',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            allOf: {
              $ref: '#/components/schemas/UserInput'}
            }
        },
      },
    },
    responses: {
      201: {
        description: 'User updated successfully',
      },
      500: {
        description: 'Server error',
      },
    },
  },
};
