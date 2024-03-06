/**
 * @swagger
 *  components:
 *      schemas:
 *          Payment:
 *              type: object
 *              required:
 *                  -   first_name
 *                  -   last_name
 *                  -   phone
 *              properties:
 *                  sendPrice:
 *                      type: number
 *                      description: the title of blog
 *                  bascket:
 *                      type: array
 *                      description: array object{ id(id product) , item_type, type , if(sendPrice)provice , city , address}
 */

/**
 * @swagger
 *  /api/payment/zarinpal:
 *      post:
 *          tags: [Payment]
 *          summary: create and save blog
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Payment'
 *
 *          responses:
 *              201:
 *                  description: created new Book    
 */

/**
 * @swagger
 *  /api/payment/getAuthority/{authority}:
 *      get:
 *          tags: [Payment]
 *          summary: create and save blog
 *          parameters:
 *              -   in: path
 *                  name: authority
 *                  type: string
 *                  required: true
 *          responses:
 *              201:
 *                  description: created new Book    
 */

/**
 * @swagger
 *  /api/payment/getSale:
 *      get:
 *          tags: [Payment]
 *          summary: create and save blog
 *          responses:
 *              201:
 *                  description: created new Book    
 */