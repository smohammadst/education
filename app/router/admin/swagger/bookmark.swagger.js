

/**
 * @swagger
 *  /admin/bookmark/addordelete/{courseID}:
 *      patch:
 *          tags: [BookMark(AdminPanel)]
 *          summary: delete One course
 *          parameters:
 *              -   in: path
 *                  name: courseID
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