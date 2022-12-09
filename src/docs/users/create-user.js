module.exports = {
  post: {
    tags: ['User CRUD operations'],
    description: 'Create user',
    operationId: 'createUser',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UserInput',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'User created successfully',
      },
      500: {
        description: 'Server error',
      },
    },
  },
};
