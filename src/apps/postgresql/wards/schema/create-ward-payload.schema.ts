export const ajvCreateWardPayloadSchema = {
  type: 'object',
  required: ['wardName', 'location', 'active'],
  additionalProperties: false,
  properties: {
    wardName: {
      type: 'string',
      minLength: 5,
      maxLength: 50,
      errorMessage:
        'Ward name must be a string with a minimum length of 5 and a maximum length of 50',
    },
    location: {
      type: 'string',
      minLength: 3,
      maxLength: 100,
      errorMessage:
        'Location must be a string with a minimum length of 3 and a maximum length of 100',
    },
    beds: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id'], // Assuming each bed is referenced by an ID
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            errorMessage: 'Each bed ID must be a valid UUID',
          },
        },
      },
      errorMessage:
        'Beds must be an array of objects containing valid UUIDs for each bed',
    },
    active: {
      type: 'integer',
      enum: [1, 0],
      errorMessage: 'Active status must be either 1 (Yes) or 0 (No)',
    },
  },
  errorMessage: {
    required: {
      wardName: 'Ward name is required',
      location: 'Location is required',
      active: 'Active status is required',
    },
    additionalProperties: 'No additional properties are allowed',
  },
};
