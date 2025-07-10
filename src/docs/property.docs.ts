/**
 * @swagger
 * /properties:
 *   get:
 *     summary: Get all properties with pagination
 *     description: Retrieves a paginated list of all properties in the system
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Properties retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     properties:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Property'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         total:
 *                           type: integer
 *                         pages:
 *                           type: integer
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     summary: Get property by ID
 *     description: Retrieves a specific property by its ID
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Property retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Property'
 *       404:
 *         description: Property not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /properties:
 *   post:
 *     summary: Create a new property
 *     description: Creates a new property (Vendor only)
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - price
 *               - type
 *             properties:
 *               title:
 *                 type: string
 *                 description: Property title
 *               description:
 *                 type: string
 *                 description: Property description
 *               price:
 *                 type: number
 *                 description: Property price
 *               type:
 *                 type: string
 *                 enum: [apartment, house, villa, office, land]
 *                 description: Property type
 *               status:
 *                 type: string
 *                 enum: [available, sold, rented]
 *                 default: available
 *                 description: Property status
 *               ownershipContract:
 *                 type: string
 *                 format: binary
 *                 description: Ownership contract document
 *               facilityLicense:
 *                 type: string
 *                 format: binary
 *                 description: Facility license document
 *               medias:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Property media files (max 3)
 *     responses:
 *       201:
 *         description: Property created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Property'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Vendor access required
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /properties/{id}:
 *   put:
 *     summary: Update property
 *     description: Updates an existing property's information (Vendor only)
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Property title
 *               description:
 *                 type: string
 *                 description: Property description
 *               price:
 *                 type: number
 *                 description: Property price
 *               type:
 *                 type: string
 *                 enum: [apartment, house, villa, office, land]
 *                 description: Property type
 *               status:
 *                 type: string
 *                 enum: [available, sold, rented]
 *                 description: Property status
 *     responses:
 *       200:
 *         description: Property updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Property'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Vendor access required
 *       404:
 *         description: Property not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /properties/{id}:
 *   delete:
 *     summary: Delete property
 *     description: Deletes a property from the system (Vendor only)
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Property deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Vendor access required
 *       404:
 *         description: Property not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /properties/available:
 *   get:
 *     summary: Get available properties
 *     description: Retrieves all properties with status 'available'
 *     tags: [Properties]
 *     responses:
 *       200:
 *         description: Available properties retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Property'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /properties/type/{type}:
 *   get:
 *     summary: Get properties by type
 *     description: Retrieves all properties of a specific type
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [apartment, house, villa, office, land]
 *         description: Property type to filter by
 *     responses:
 *       200:
 *         description: Properties retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Property'
 *       400:
 *         description: Invalid property type
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /properties/vendor/{vendorId}:
 *   get:
 *     summary: Get properties by vendor
 *     description: Retrieves all properties owned by a specific vendor
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Vendor ID
 *     responses:
 *       200:
 *         description: Properties retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Property'
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /properties/search:
 *   get:
 *     summary: Search properties
 *     description: Search properties by title or description
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: Properties found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Property'
 *       400:
 *         description: Search query required
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /properties/price-range:
 *   get:
 *     summary: Get properties by price range
 *     description: Retrieves properties within a specific price range
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: min
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: max
 *         schema:
 *           type: number
 *         description: Maximum price
 *     responses:
 *       200:
 *         description: Properties retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Property'
 *       400:
 *         description: Invalid price range
 *       500:
 *         description: Server error
 */ 