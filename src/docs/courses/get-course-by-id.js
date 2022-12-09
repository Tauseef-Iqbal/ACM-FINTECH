module.exports = {
  get: {
    tags: ['Course CRUD operations'],
    description: 'Get a Course',
    operationId: 'getCourse',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id',
        },
        required: true,
        description: 'A single Course id',
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
                internal_code: 'Invalid id',
              },
            },
          },
        },
      },
    },
  },
};
