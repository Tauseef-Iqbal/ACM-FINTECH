module.exports = {
  post: {
    tags: ['Course CRUD operations'],
    description: 'Create Course',
    operationId: 'createCourse',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Course',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Course created successfully',
      },
      500: {
        description: 'Server error',
      },
    },
  },
};
