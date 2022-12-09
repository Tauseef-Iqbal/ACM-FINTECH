module.exports = {
  delete: {
    tags: ['Course CRUD operations'],
    description: 'Deleting a Course',
    operationId: 'deleteCourse',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id',
        },
        required: true,
        description: 'Deleting a Course',
      },
    ],
    responses: {
      200: {
        description: 'Course deleted successfully',
      },
      404: {
        description: 'Course not found',
      },
      500: {
        description: 'Server error',
      },
    },
  },
};
