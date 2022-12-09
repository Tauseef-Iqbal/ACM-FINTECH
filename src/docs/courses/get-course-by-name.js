module.exports = {
  get: {
    tags: ['Course CRUD operations'],
    description: 'Get a Course',
    operationId: 'getCourse',
    parameters: [
      {
        name: 'name',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/email',
        },
        required: true,
        description: 'A single Course name',
      },
    ],
    responses: {
      200: {
        description: 'Course is obtained',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Course',
            },
          },
        },
      },
      404: {
        description: 'Course is not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
              example: {
                message: "We can't find the Course",
                internal_code: 'Invalid name',
              },
            },
          },
        },
      },
    },
  },
};
