/**
 * @swagger
 *  components:
 *      schemas:
 *        Event:
 *              type: object
 *              required:
 *                  -   title
 *                  -   text
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of event
 *                      example: عنوان دوره
 *                  text:
 *                      type: string
 *                      description: the title of event
 *                      example: متن بلد تستی
 *                  courses:
 *                      type: array
 *                      description: the title of courses
 *                  books:
 *                      type: array
 *                      description: the title of books
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 */

/**
 * @swagger
 *  /admin/event/add:
 *      post:
 *          tags: [Event(AdminPanel)]
 *          summary: create and save course
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Event'
 *          
 *          responses:
 *              201:
 *                  description: created new enent
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 * 
 */
/**
 * @swagger
 *  /admin/event/edit/{id}:
 *      patch:
 *          tags: [Event(AdminPanel)]
 *          summary: create and save course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required : true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Event'
 *          
 *          responses:
 *              200:
 *                  description: created new enent
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 * 
 */
/**
 * @swagger
 *  /admin/event/remove/{id}:
 *      delete:
 *          tags: [Event(AdminPanel)]
 *          summary: delete One event
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: objectId of event
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
 *  /admin/event/list:
 *      get:
 *          tags: [Event(AdminPanel)]
 *          summary: get all event
 *          responses:
 *              200:
 *                  description: success
 */