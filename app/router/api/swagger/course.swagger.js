/**
 * @swagger
 *  /api/courses/list:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summary: get all courses
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search in title (course)
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /api/courses/getCourse/{id}:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summary: get One course
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: objectId of course
 *          responses:
 *              200:
 *                  description: success
 */