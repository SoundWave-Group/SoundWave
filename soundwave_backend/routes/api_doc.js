/**
 * @swagger
 * components:
 *   schemas:
 *      User:
 *       type: object
 *       required:
 *         - fullName
 *         - username
 *         - email
 *         - password
 *       properties:
 *         googleId:
 *           type: string
 *           description: The id of Google users
 *         fullName:
 *           type: string
 *           description: The full name of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         profilePicture:
 *           type: string
 *           description: The url to the profile picture of the user
 *         location:
 *           type: string
 *           description: The location of the user
 *         bio:
 *           type: string
 *           description: The bio of the user
 *         following:
 *           type: number
 *           description: The number of other users the user is following
 *         following:
 *           type: number
 *           description: The number of followers of the user
 *         tracks:
 *           type: array
 *           description: The user's tracks
 *         playlists:
 *           type: array
 *           description: The user's playlists
 *         createdAt:
 *           type: date
 *           description: The date the user was added
 * 
 */
/**
 * @swagger
 * tags:
 *   name: User
 *   description: The books managing API
 * /book:
 *   get:
 *     summary: Lists all the books
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a new book
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 * /book/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Books'
 *       404:
 *         description: The book was not found
 *   put:
 *    summary: Update the book by the id
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Books'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Books'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */

const express = require('express');
const swaggerjsdoc = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express');

const apiDoc = express.Router();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SoundWave API',
            version: '0.1.0',
        },
        servers: [
            {
                url: 'https://soundwave-56af.onrender.com'
            }
        ]
    },
    apis: ['./api_doc.js']
}

const spacs = swaggerjsdoc(options);

apiDoc.use(
    '/docs',
    swaggerui.serve,
    swaggerui.setup(spacs)
);

module.exports = apiDoc;