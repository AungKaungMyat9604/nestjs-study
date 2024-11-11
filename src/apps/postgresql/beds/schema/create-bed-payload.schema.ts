export const ajvCreateBedPayloadSchema = {
  type: 'object',
  required: ['bedNo', 'ward', 'active'],
  additionalProperties: false,
  properties: {
    bedNo: {
      type: 'integer',
      minimum: 1,
      errorMessage: 'Bed number must be an integer and greater than or equal to 1',
    },
    ward: {
      type: 'object',
      required: ['id'], // Assuming `ward` is referenced by a UUID
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          errorMessage: 'Ward ID must be a valid UUID',
        },
      },
      errorMessage: 'Ward must be an object containing a valid UUID',
    },
    active: {
      type: 'integer',
      enum: [1, 0],
      errorMessage: 'Active must be either 1 (Yes) or 0 (No)',
    },
  },
  errorMessage: {
    required: {
      bedNo: 'Bed number is required',
      ward: 'Ward is required',
      active: 'Active status is required',
    },
    additionalProperties: 'No additional properties are allowed',
  },
};
