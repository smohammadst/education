/**
 * @swagger
 *  /api/book/list:
 *      get:
 *          tags: [Book(AdminPanel)]
 *          summary: get all books
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search in title (book)
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /api/book/getBook/{id}:
 *      get:
 *          tags: [Book(AdminPanel)]
 *          summary: get One book
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: objectId of book
 *          responses:
 *              200:
 *                  description: success
 */