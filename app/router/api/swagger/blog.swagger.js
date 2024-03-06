/**
 * @swagger
 *  /api/blog/list:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summary: get all blogs
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search in title (blog)
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /api/blog/getBlog/{id}:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summary: get One blog
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: objectId of blog
 *          responses:
 *              200:
 *                  description: success
 */