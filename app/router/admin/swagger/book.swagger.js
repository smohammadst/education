/**
 * @swagger
 *  components:
 *      schemas:
 *        Book:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   numberOfPages
 *                  -   yearOfPublication
 *                  -   urlGoogle
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of book
 *                      example: عنوان محصول
 *                  urlTitle:
 *                      type: string
 *                      description: the urlTitle of book
 *                  urlGoogle:
 *                      type: string
 *                      description: saberzare.com/id/...
 *                  short_text:
 *                      type: string
 *                      description: the short_text of book
 *                      example: متن کوتاه شده تستی
 *                  text:
 *                      type: string
 *                      description: the text of book
 *                      example: متن بلد تستی
 *                  category:
 *                      type: string
 *                      description: the category of book
 *                      example: 6279e994c1e47a98d0f356d3
 *                  pricePhysical:
 *                      type: string
 *                      description: the price of physical book
 *                      example: 2500000
 *                  priceVirtual:
 *                      type: string
 *                      description: the price of virtual book
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the discount of book
 *                      example: 20
 *                  numberOfPages:
 *                      type: string
 *                      description: Number of book pages
 *                      example: 40
 *                  yearOfPublication:
 *                      type: string
 *                      description: The year the book was published
 *                      example: سال 1400
 *                  link:
 *                      type: string
 *                      description: link pdf book
 *                      example: https://www.ketabrah.ir/%DA%A9%D8%AA%D8%A7%D8%A8-%D9%81%DB%8C%D9%84-%D8%A8%DB%8C%D8%A7%D9%86/book/66864
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Book:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of book
 *                      example: عنوان محصول
 *                  urlTitle:
 *                      type: string
 *                      description: the urlTitle of book
 *                  short_text:
 *                      type: string
 *                      description: the short_text of book
 *                      example: متن کوتاه شده تستی
 *                  text:
 *                      type: string
 *                      description: the text of book
 *                      example: متن بلد تستی
 *                  category:
 *                      type: string
 *                      description: the category of book
 *                      example: 6279e994c1e47a98d0f356d3
 *                  pricePhysical:
 *                      type: string
 *                      description: the price of physical book
 *                      example: 2500000
 *                  priceVirtual:
 *                      type: string
 *                      description: the price of virtual book
 *                      example: 2500000
 *                  discount:
 *                      type: string
 *                      description: the discount of book
 *                      example: 20
 *                  numberOfPages:
 *                      type: string
 *                      description: Number of book pages
 *                      example: 40
 *                  yearOfPublication:
 *                      type: string
 *                      description: The year the book was published
 *                      example: سال 1400
 *                  link:
 *                      type: string
 *                      description: link pdf book
 *                      example: https://www.ketabrah.ir/%DA%A9%D8%AA%D8%A7%D8%A8-%D9%81%DB%8C%D9%84-%D8%A8%DB%8C%D8%A7%D9%86/book/66864
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string         
*/

/**
 * @swagger
 *  /admin/book/add:
 *      post:
 *          tags: [Book(AdminPanel)]
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Book'
 *
 *          responses:
 *              201:
 *                  description: created new Book    
 */

/**
 * @swagger
 *  /admin/book/remove/{id}:
 *      delete:
 *          tags: [Book(AdminPanel)]
 *          summary: delete One book
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: objectId of book
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
 *  /admin/book/edit/{id}:
 *      patch:
 *          tags: [Book(AdminPanel)]
 *          summary: update  book
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *                  description: id of book for update book
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit-Book'
 *          
 *          responses:
 *              200:
 *                  description: updated Book
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */