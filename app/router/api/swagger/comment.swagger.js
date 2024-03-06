

/**
 * @swagger
 *  components:
 *      schemas:
 *        addComment:
 *              type: object
 *              required:
 *                  -   comment
 *                  -   id
 *              properties:
 *                  comment:
 *                      type: string
 *                      description: the comment of product
 *                      example: کامنت محصول
 *                  id:
 *                      type: string
 *                      description: the id of product
 *                      example: id product or course or blog
 *                  parent:
 *                      type: string
 *                      description: the title of product
 *                      example: متن بلد تستی
 *        remove:
 *              type: object
 *              required:
 *                  -   id
 *                  -   type
 *              properties:
 *                  type:
 *                      type: string
 *                      description: the comment of product
 *                      example: کامنت محصول
 *                  id:
 *                      type: string
 *                      description: the id of product
 *                      example: id product or course or blog
 *          
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *        editComment:
 *              type: object
 *              required:
 *                  -   type
 *              properties:
 *                  type:
 *                      type: string
 *                      description: the comment of product
 *                      example: article
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *        sendStatus:
 *              type: object
 *              required:
 *                  -   id
 *                  -   status
 *                  -   isAnswer
 *                  -   type
 *              properties:
 *                  id:
 *                      type: string
 *                      description: the id of product
 *                  status:
 *                      type: bool
 *                      description: the comment of product
 *                  type:
 *                      type: string
 *                      description: the title of product
 */

/**
 * @swagger
 *  /api/comment/addCommentToBook:
 *      post:
 *          tags: [Comment(AdminPanel)]
 *          summary: create and save comment
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addComment'
 *
 *          responses:
 *              201:
 *                  description: created new Product    
 */
/**
 * @swagger
 *  /api/comment/addCommentToBLog:
 *      post:
 *          tags: [Comment(AdminPanel)]
 *          summary: create and save comment
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addComment'
 *
 *          responses:
 *              201:
 *                  description: created new Product    
 */
/**
 * @swagger
 *  /api/comment/sendstatus:
 *      post:
 *          tags: [Comment(AdminPanel)]
 *          summary: create and save comment
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/sendStatus'
 *          responses:
 *              201:
 *                  description: created new Product    
 */

/**
 * @swagger
 *  /api/comment/addCommentTocourse:
 *      post:
 *          tags: [Comment(AdminPanel)]
 *          summary: create and save comment
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addComment'
 *          responses:
 *              201:
 *                  description: created new Product    
 */

/**
 * @swagger
 *  /api/comment/remove:
 *      delete:
 *          tags: [Comment(AdminPanel)]
 *          summary: create and save comment
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/remove'
 *          responses:
 *              201:
 *                  description: created new Product    
 */