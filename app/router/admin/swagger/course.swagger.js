/**
 * @swagger
 *  components:
 *      schemas:
 *        Course:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   price
 *                  -   urlGoogle
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                      example: عنوان دوره
 *                  urlTitle:
 *                      type: string
 *                      description: the urlTitle of course
 *                  urlGoogle:
 *                      type: string
 *                      description: saberzare.com/id/...
 *                  short_text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن کوتاه شده تستی
 *                  text:
 *                      type: string
 *                      description: the title of product
 *                      example: متن بلد تستی
 *                  category:
 *                      type: string
 *                      description: the title of product
 *                      example: 6279e994c1e47a98d0f356d3
 *                  price:
 *                      type: string
 *                      description: the title of course
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the title of course
 *                      example: 20
 *                  type:
 *                      type: string
 *                      description: the title of course
 *                      example: online
 *                  level:
 *                      type: string
 *                      description: مبتدی |متوسط | پیشرقته
 *                      example: مبتدی
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Course:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of course
 *                      example: عنوان دوره
 *                  urlTitle:
 *                      type: string
 *                      description: the urlTitle of course
 *                  urlGoogle:
 *                      type: string
 *                      description: saberzare.com/id/...
 *                  short_text:
 *                      type: string
 *                      description: the title of course
 *                      example: متن کوتاه شده تستی
 *                  text:
 *                      type: string
 *                      description: the title of course
 *                      example: متن بلد تستی
 *                  category:
 *                      type: string
 *                      description: the title of course
 *                      example: 6279e994c1e47a98d0f356d3
 *                  price:
 *                      type: string
 *                      description: the title of course
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the title of course
 *                      example: 20
 *                  type:
 *                      type: string
 *                      description: the title of course
 *                      example: online
 *                  level:
 *                      type: string
 *                      description: مبتدی |متوسط | پیشرقته
 *                      example: مبتدی
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string            
 */

/**
 * @swagger
 *  /admin/courses/add:
 *      post:
 *          tags: [Course(AdminPanel)]
 *          summary: create and save course
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Course'
 *          
 *          responses:
 *              201:
 *                  description: created new course
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 * 
 */
/**
 * @swagger
 *  /admin/courses/edit/{id}:
 *      patch:
 *          tags: [Course(AdminPanel)]
 *          summary: update course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: id of product for update course
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Course'
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
 *  /admin/courses/remove/{id}:
 *      delete:
 *          tags: [Course(AdminPanel)]
 *          summary: delete One course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: objectId of product
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */
