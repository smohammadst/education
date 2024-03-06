/**
 * @swagger
 *  components:
 *      schemas:
 *        View:
 *              type: object
 *              properties:
 *                  nameUser:
 *                      type: string
 *                      description: the name of user
 *                  description:
 *                      type: string
 *                      description: Description...
 *                  nameCourse:
 *                      type: string
 *                      description: the name of course
 */

/**
 * @swagger
 *  /admin/view/add:
 *      post:
 *          tags: [View(AdminPanel)]
 *          summary: create and save view
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/View'
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
 *  /admin/view/edit/{id}:
 *      patch:
 *          tags: [View(AdminPanel)]
 *          summary: update view
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: id of product for update view
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/View'
 *          
 *          responses:
 *              200:
 *                  description: updated view
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */


/**
 * @swagger
 *  /admin/view/remove/{id}:
 *      delete:
 *          tags: [View(AdminPanel)]
 *          summary: delete One view
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: objectId of view
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
 *  /admin/view/getAllView:
 *      get:
 *          tags: [View(AdminPanel)]
 *          summary: delete One view
 *          responses:
 *              200:
 *                  description: success
 */