/**
 * @swagger
 *  components:
 *      schemas:
 *          AddCode:
 *              type: object
 *              required:
 *                  -   percent   
 *              properties:
 *                  percent:
 *                      type: string
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Check:
 *              type: object
 *              required:
 *                  -   code   
 *              properties:
 *                  code:
 *                      type: string
 */

/**
 * @swagger
 *  /admin/code/add:
 *      post:
 *          tags: [Code(AdminPanel)]
 *          summary: create and save discountCode
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddCode'
 *
 *          responses:
 *              201:
 *                  description: created new Book    
 */
/**
 * @swagger
 *  /admin/code/remove/{id}:
 *      delete:
 *          tags: [Code(AdminPanel)]
 *          summary: create and save discountCode
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: objectId of code
 *          responses:
 *              201:
 *                  description: created new Book    
 */

/**
 * @swagger
 *  /admin/code/check:
 *      post:
 *          tags: [Code(AdminPanel)]
 *          summary: create and save discountCode
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Check'
 *
 *          responses:
 *              200:
 *                  description: created new Book    
 */

/**
 * @swagger
 *  /admin/code/list:
 *      get:
 *          tags: [Code(AdminPanel)]
 *          summary: create and save discountCode
 *          responses:
 *              200:
 *                  description: created new Book    
 */