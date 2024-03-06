/**
 * @swagger
 *  /api/category/all:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get All Categories
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /api/category/getCategory/{title}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get One category
 *          parameters:
 *              -   in: path
 *                  name: title
 *                  type: string
 *                  description: title of category
 *          responses:
 *              200:
 *                  description: success
 */