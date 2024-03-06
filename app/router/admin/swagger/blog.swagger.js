/**
 * @swagger
 *  components:
 *      schemas:
 *        Blog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *                  -   urlGoogle
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of blog
 *                      example: عنوان محصول
 *                  urlTitle:
 *                      type: string
 *                      description: the urlTitle of blog
 *                  urlGoogle:
 *                      type: string
 *                      description: saberzare.com/id/...
 *                  short_text:
 *                      type: string
 *                      description: the short_text of blog
 *                      example: متن کوتاه شده تستی
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                      example: متن بلد تستی
 *                  category:
 *                      type: string
 *                      description: the category of blog
 *                      example: 6279e994c1e47a98d0f356d3
 *                  status:
 *                      type: boolean
 *                      description: status of blog
 *                      example: false
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Blog:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of blog
 *                      example: عنوان محصول
 *                  urlTitle:
 *                      type: string
 *                      description: the urlTitle of blog
 *                  urlGoogle:
 *                      type: string
 *                      description: saberzare.com/id/...
 *                  short_text:
 *                      type: string
 *                      description: the short_text of blog
 *                      example: متن کوتاه شده تستی
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                      example: متن بلد تستی
 *                  category:
 *                      type: string
 *                      description: the category of blog
 *                      example: 6279e994c1e47a98d0f356d3
 *                  status:
 *                      type: boolean
 *                      description: status of blog
 *                      example: false
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string            
*/
/**
 * @swagger
 *  components:
 *      schemas:
 *          Sort-Blog:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                  sortByNumber:
 *                      type: number    
*/

/**
 * @swagger
 *  /admin/blog/add:
 *      post:
 *          tags: [Blog(AdminPanel)]
 *          summary: create and save blog
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *
 *          responses:
 *              201:
 *                  description: created new Book    
 */
/**
 * @swagger
 *  /admin/blog/remove/{blogID}:
 *      delete:
 *          tags: [Blog(AdminPanel)]
 *          summary: delete One blog
 *          parameters:
 *              -   in: path
 *                  name: blogID
 *                  type: string
 *                  description: objectId of blog
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
 *  /admin/blog/edit/{blogID}:
 *      put:
 *          tags: [Blog(AdminPanel)]
 *          summary: update blog
 *          parameters:
 *              -   in: path
 *                  name: blogID
 *                  type: string
 *                  required: true
 *                  description: id of book for update blog
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Blog'
 *          
 *          responses:
 *              200:
 *                  description: updated Blog
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */
/**
 * @swagger
 *  /admin/blog/sortByNumber:
 *      put:
 *          tags: [Blog(AdminPanel)]
 *          summary: add number for sort
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Sort-Blog'
 *          
 *          responses:
 *              200:
 *                  description: updated Blog
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */