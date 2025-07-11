/**
 * @swagger
 * /activities:
 *   get:
 *     summary: Get all activities with pagination
 *     description: Retrieves a paginated list of all activities in the system
 *     tags: [Activities]
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
 *         description: Activities retrieved successfully
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
 *                     activities:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Activity'
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
 * /activities/{id}:
 *   get:
 *     summary: Get activity by ID
 *     description: Retrieves a specific activity by its ID
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Activity ID
 *     responses:
 *       200:
 *         description: Activity retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Activity'
 *       404:
 *         description: Activity not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /activities:
 *   post:
 *     summary: Create a new activity
 *     description: Creates a new activity (Vendor only)
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - details
 *               - tags
 *               - price
 *               - date
 *               - time
 *               - activityTime
 *             properties:
 *               name:
 *                 type: string
 *                 description: Activity name
 *               address:
 *                 type: string
 *                 description: Activity address
 *               details:
 *                 type: string
 *                 description: Activity details
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Activity tags
 *               price:
 *                 type: number
 *                 description: Activity price
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Activity date
 *               time:
 *                 type: string
 *                 description: Activity time
 *               activityTime:
 *                 type: string
 *                 description: Activity duration
 *               medias:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Activity media files
 *     responses:
 *       201:
 *         description: Activity created successfully
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
 *                   $ref: '#/components/schemas/Activity'
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
 * /activities/{id}:
 *   put:
 *     summary: Update activity
 *     description: Updates an existing activity's information (Vendor only)
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Activity ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Activity name
 *               address:
 *                 type: string
 *                 description: Activity address
 *               details:
 *                 type: string
 *                 description: Activity details
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Activity tags
 *               price:
 *                 type: number
 *                 description: Activity price
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Activity date
 *               time:
 *                 type: string
 *                 description: Activity time
 *               activityTime:
 *                 type: string
 *                 description: Activity duration
 *     responses:
 *       200:
 *         description: Activity updated successfully
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
 *                   $ref: '#/components/schemas/Activity'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Vendor access required
 *       404:
 *         description: Activity not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /activities/{id}:
 *   delete:
 *     summary: Delete activity
 *     description: Deletes an activity from the system (Vendor only)
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Activity ID
 *     responses:
 *       200:
 *         description: Activity deleted successfully
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
 *         description: Activity not found
 *       500:
 *         description: Server error
 */ 