/**
 * @swagger
 *  components:
 *      schemas:
 *        addContact:
 *              type: object
 *              required:
 *                  -   comment
 *                  -   id
 *              properties:
 *                  phone:
 *                      type: string
 *                      description: the comment of product
 *                      example: کامنت محصول
 *                  text:
 *                      type: string
 *                      description: the id of product
 *                      example: id product or course or blog
 *                  subject:
 *                      type: string
 *                      description: the title of product
 *                      example: متن بلد تستی
 *                  name:
 *                      type: string
 *                      description: the title of product
 *                      example: متن بلد تستی
 *                  time:
 *                      type: string
 *                      description: the title of product
 *                      example: متن بلد تستی
 */

/**
 * @swagger
 *  /api/contact/add:
 *      post:
 *          tags: [Contact(Api)]
 *          summary: create and save comment
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addContact'
 *          responses:
 *              201:
 *                  description: created new Product    
 */

/**
 * @swagger
 *  /api/contact/getAll:
 *      get:
 *          tags: [Contact(Api)]
 *          summary: get One book
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /api/contact/sendStatus/{id}:
 *      get:
 *          tags: [Contact(Api)]
 *          summary: get One book
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: objectId of book
 *          responses:
 *              200:
 *                  description: success
 */