/**
 * @swagger
 *  components:
 *      schemas:
 *        addView:
 *              type: object
 *              required:
 *                  -   type
 *                  -   id
 *                  -   ip
 *              properties:
 *                  type:
 *                      type: string
 *                      description: blog course book
 *                  id:
 *                      type: string
 *                      description: id (blog course book)
 *                  ip:
 *                      type: string
 *                      description: the title of product
 */
/**
 * @swagger
 *  /view/add:
 *      post:
 *          tags: [View(View)]
 *          summary: create and save comment
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addView'
 *
 *          responses:
 *              201:
 *                  description: created new Product    
 */