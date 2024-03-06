/**
 * @swagger
 *  components:
 *      schemas:
 *        Image:
 *              type: object
 *              required:
 *                  -   images
 *              properties:
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 */

/**
 * @swagger
 *  /admin/image/add:
 *      post:
 *          tags: [Image(AdminPanel)]
 *          summary: create and save image
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Image'
 *          
 *          responses:
 *              201:
 *                  description: created new image
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 * 
 */

/**
 * @swagger
 *  /admin/image/edit/{id}:
 *      patch:
 *          tags: [Image(AdminPanel)]
 *          summary: update course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: id of product for update image
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Image'
 *          
 *          responses:
 *              200:
 *                  description: updated Course
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/image/remove/{id}:
 *      delete:
 *          tags: [Image(AdminPanel)]
 *          summary: delete One image
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: objectId of image
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/image/list:
 *      get:
 *          tags: [Image(AdminPanel)]
 *          summary: get all image
 *          responses:
 *              200:
 *                  description: success
 */