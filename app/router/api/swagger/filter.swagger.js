
/**
 * @swagger
 *  /api/filter/{search}/{query}/{type}:
 *      get:
 *          tags: [Filter(Api)]
 *          summary: filter
 *          parameters:
 *              -   in: path
 *                  name: search
 *                  type: string
 *                  description: search
 *              -   in: path
 *                  name: query
 *                  type: string
 *                  description: filter type
 *              -   in: path
 *                  name: type
 *                  type: string
 *                  description: type model
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /api/filter/search:
 *      get:
 *          tags: [Filter(Api)]
 *          summary: get all 
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search in title 
 *          responses:
 *              200:
 *                  description: success
 */