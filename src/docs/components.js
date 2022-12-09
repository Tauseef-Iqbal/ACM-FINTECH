module.exports = {
  components: {
    schemas: {
      id: {
        type: 'string',
        description: 'An id of the record',
        example: 'xyz',
      },
      email: {
        type: 'string',
        description: 'An email of a user',
        example: 'xyz@gmail.com',
      },
      name: {
        type: 'string',
        description: 'An name of a course',
        example: 'Data Science',
      },
      User: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: "User's email",
            example: 'xyz@gmail.com',
          },
          phone: {
            type: 'string',
            description: "User's phone",
            example: '+923031234567',
          },
          firstName: {
            type: 'string',
            description: "User's firstName",
            example: 'tauseef iqbal -> tauseef',
          },
          lastName: {
            type: 'string',
            description: "User's lastName",
            example: 'tauseef iqbal -> iqbal',
          },
          username: {
            type: 'string',
            description: "User's username",
            example: 'sufi',
          },
          settings: {
            type: 'json',
            description: "User's settings",
          },
          isActive: {
            type: 'boolean',
            description: 'The status of the user',
          },
        },
      },
      UserInput: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: "User's email",
            example: 'xyz@gmail.com',
          },
          password: {
            type: 'string',
            description: "User's password",
            example: 'xyz123',
          },
          phone: {
            type: 'string',
            description: "User's phone",
            example: '+923031234567',
          },
          firstName: {
            type: 'string',
            description: "User's firstName",
            example: 'tauseef iqbal -> tauseef',
          },
          lastName: {
            type: 'string',
            description: "User's lastName",
            example: 'tauseef iqbal -> iqbal',
          },
          username: {
            type: 'string',
            description: "User's username",
            example: 'sufi',
          },
          settings: {
            type: 'json',
            description: "User's settings",
          },
        },
      },
      Course: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: "User's name",
            example: 'Data Science',
          },
        },
      },
      UserUpdateInput: {
        allOf: {
          $ref: '#/UserInput',
        },
        type: 'object',
        properties: {
          isActive: {
            type: 'boolean',
            description: 'The status of the user',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
          internal_code: {
            type: 'string',
          },
        },
      },
    },
  },
};
