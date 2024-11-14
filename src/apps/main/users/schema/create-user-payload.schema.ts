export const ajvCreateUserPayloadSchema = {
  type: 'object',
  required: ['username', 'password'],
  additionalProperties: false,
  properties: {
    username: {
      type: 'string',
      minLength: 1,
      errorMessage: 'Username is required and cannot be empty',
    },
    password: {
      type: 'string',
      minLength: 6,
      errorMessage: 'Password is required and cannot be empty',
    },
  },
  errorMessage: {
    required: {
      username: 'Username is required',
      password: 'Password is required',
    },
    additionalProperties: 'No additional properties are allowed',
  },
};
