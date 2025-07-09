// src/docs/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Luby Property Management API',
    version: '1.0.0',
    description: 'A comprehensive API for property management system with user authentication, property listings, and vendor management.',
  },
  servers: [
    {
      url: 'http://localhost:8000/api/v1',
      description: 'Local development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token in the format: Bearer <token>'
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'User unique identifier'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address'
          },
          firstName: {
            type: 'string',
            description: 'User first name'
          },
          lastName: {
            type: 'string',
            description: 'User last name'
          },
          phone: {
            type: 'string',
            description: 'User phone number'
          },
          role: {
            type: 'string',
            enum: ['user', 'admin', 'vendor'],
            description: 'User role in the system'
          },
          profilePicture: {
            type: 'string',
            description: 'URL to user profile picture'
          }
        }
      },
      Property: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Property unique identifier'
          },
          title: {
            type: 'string',
            description: 'Property title'
          },
          description: {
            type: 'string',
            description: 'Property description'
          },
          price: {
            type: 'number',
            description: 'Property price'
          },
          type: {
            type: 'string',
            enum: ['apartment', 'house', 'villa', 'office', 'land'],
            description: 'Property type'
          },
          status: {
            type: 'string',
            enum: ['available', 'sold', 'rented'],
            description: 'Property status'
          },
          vendorId: {
            type: 'string',
            description: 'ID of the vendor who owns this property'
          },
          medias: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Array of media URLs for the property'
          },
          ownershipContract: {
            type: 'string',
            description: 'URL to ownership contract document'
          },
          facilityLicense: {
            type: 'string',
            description: 'URL to facility license document'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false
          },
          message: {
            type: 'string',
            description: 'Error message'
          },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: {
                  type: 'string'
                },
                message: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    }
  },
  tags: [
    {
      name: 'Authentication',
      description: 'User authentication and authorization endpoints'
    },
    {
      name: 'Users',
      description: 'User management operations'
    },
    {
      name: 'Properties',
      description: 'Property management operations'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['src/routers/**/*.ts', 'src/controllers/**/*.ts'], // Updated to include router files
};

export const swaggerSpec = swaggerJSDoc(options);
