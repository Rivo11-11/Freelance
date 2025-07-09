import { Router } from "express";
import { PropertyController } from "../controllers/PropertyController";
import  isAuth from "../middleware/isAuth";
import { uploadMultipleMediaMiddleware } from "../middleware/uploadMiddleware";
import { createPropertyValidator } from "../validators/PropertyValidator";
import { isVendor } from "../middleware/authorization";
const router = Router();
const propertyController = new PropertyController();

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
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           description:
 *                             type: string
 *                           price:
 *                             type: number
 *                           type:
 *                             type: string
 *                           status:
 *                             type: string
 *                           vendorId:
 *                             type: string
 *                           medias:
 *                             type: array
 *                             items:
 *                               type: string
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
router.get("/", propertyController.getAllPaginated.bind(propertyController));

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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     type:
 *                       type: string
 *                     status:
 *                       type: string
 *                     vendorId:
 *                       type: string
 *                     medias:
 *                       type: array
 *                       items:
 *                         type: string
 *                     ownershipContract:
 *                       type: string
 *                     facilityLicense:
 *                       type: string
 *       404:
 *         description: Property not found
 *       500:
 *         description: Server error
 */
router.get("/:id", propertyController.getById.bind(propertyController));

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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     type:
 *                       type: string
 *                     status:
 *                       type: string
 *                     vendorId:
 *                       type: string
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Vendor access required
 *       500:
 *         description: Server error
 */
router.post("/",isAuth, isVendor, uploadMultipleMediaMiddleware([
    { name: 'ownershipContract' },
    { name: 'facilityLicense' },
    { name: 'medias', maxCount: 3 }
]), createPropertyValidator, propertyController.create.bind(propertyController));

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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     type:
 *                       type: string
 *                     status:
 *                       type: string
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
router.put("/:id",isAuth, isVendor, propertyController.update.bind(propertyController));

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
router.delete("/:id",isAuth, isVendor, propertyController.delete.bind(propertyController));

router.get("/available", propertyController.getAvailableProperties.bind(propertyController));
router.get("/type/:type", propertyController.getPropertiesByType.bind(propertyController));
router.get("/vendor/:vendorId", propertyController.getPropertiesByVendor.bind(propertyController));
router.get("/search", propertyController.searchProperties.bind(propertyController));
router.get("/price-range", propertyController.getPropertiesByPriceRange.bind(propertyController));

export default router; 