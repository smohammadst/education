/**
 * @swagger
 *  components:
 *      schemas:
 *        AddFaq:
 *              type: object
 *              required:
 *                  -   question
 *                  -   answer
 *              properties:
 *                  question:
 *                      type: string
 *                      description: the id of course
 *                      example: این دوره مناسب چ کسانی است
 *                  answer:
 *                      type: string
 *                      description: the title of chapter
 *                      example: همه افراد
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *        EditFaq:
 *              type: object
 *              properties:   
 *                  question:
 *                      type: string
 *                      description: the title of chapter
 *                      example: این دوره مناسب چ کسانی است
 *                  answer:
 *                      type: string
 *                      description: the describe about this chapter
 *                      example: متن بلد تستی
 */
/**
 * @swagger
 *  /admin/faq/add/{courseID}:
 *      post:
 *          tags: [Faq(AdminPanel)]
 *          summary: create and save FAQ
 *          parameters:
 *              -   in: path
 *                  name: courseID
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddFaq'
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
 *  /admin/faq/edit/{id}:
 *      patch:
 *          tags: [Faq(AdminPanel)]
 *          summary: update detail of FAQ
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/EditFaq'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/EditFaq'
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
 *  /admin/faq/remove/{id}:
 *      patch:
 *          tags: [Faq(AdminPanel)]
 *          summary: remove a Faq
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/publicDefinition'
 */