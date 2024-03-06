/**
 * @swagger
 *  components:
 *      schemas:
 *        User:
 *              type: object
 *              properties:
 *                  phone:
 *                      type: string
 *                      description: the title of blog
 *                      example: عنوان محصول
 *                  email:
 *                      type: string
 *                      description: the short_text of blog
 *                      example: متن کوتاه شده تستی
 *                  address:
 *                      type: string
 *                      description: the text of blog
 *                      example: متن بلد تستی
 *                  first_name:
 *                      type: string
 *                      description: the text of blog
 *                      example: متن بلد تستی
 *                  last_name:
 *                      type: string
 *                      description: the text of blog
 *                      example: متن بلد تستی
 *                  codePostal:
 *                      type: string
 */

/**
 * @swagger
 *  /api/user/getUser:
 *      get:
 *          tags: [User(User)]
 *          summary: get all blogs
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /api/user/editUser:
 *      patch:
 *          tags: [User(User)]
 *          summary: get One blog
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /api/user/getBook:
 *      get:
 *          tags: [User(User)]
 *          summary: get One blog
 *          parameters:
 *              -   in: path
 *                  name: limit
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /api/user/getVideOnline:
 *      get:
 *          tags: [User(User)]
 *          summary: get One blog
 *          parameters:
 *              -   in: path
 *                  name: limit
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /api/user/getVideOffline:
 *      get:
 *          tags: [User(User)]
 *          summary: get One blog
 *          parameters:
 *              -   in: path
 *                  name: limit
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /api/user/getVideInPerson:
 *      get:
 *          tags: [User(User)]
 *          summary: get One blog
 *          parameters:
 *              -   in: path
 *                  name: limit
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /api/user/list:
 *      get:
 *          tags: [User(User)]
 *          summary: get all user
 *          responses:
 *              200:
 *                  description: success
 */