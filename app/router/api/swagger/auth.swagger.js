/**
 * @swagger
 *  components:
 *      schemas:
 *          Register:
 *              type: object
 *              required:
 *                  -   first_name
 *                  -   last_name
 *                  -   phone
 *              properties:
 *                  first_name:
 *                      type: string
 *                      description: the title of blog
 *                  last_name:
 *                      type: string
 *                      description: the title of blog
 *                  phone:
 *                      type: string
 *                      description: the title of blog
 *          Login:
 *              type: object
 *              required:
 *                  -   code
 *                  -   phone
 *              properties:
 *                  code:
 *                      type: string
 *                  phone:
 *                      type: string
 *          checkuser:
 *              type: object
 *              required:
 *                  -   phone
 *              properties:
 *                  phone:
 *                      type: string
 *                      description: the title of blog
 *          refreshToken:
 *              type: object
 *              required:   
 *                  -   refreshtoken
 *              properties:
 *                  refreshtoken:
 *                      type: string
 *                      description: the title of blog
 *          refreshCode:
 *              type: object
 *              required:   
 *                  -   phone
 *              properties:
 *                  phone:
 *                      type: string
 *                      description: the title of blog
 */

/**
 * @swagger
 *  /auth/refreshcode:
 *      post:
 *          tags: [AuthUser(Auth)]
 *          summary: create and save blog
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/refreshCode'
 *
 *          responses:
 *              201:
 *                  description: created new Book    
 */

/**
 * @swagger
 *  /auth/refreshtoken:
 *      post:
 *          tags: [AuthUser(Auth)]
 *          summary: create and save blog
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/refreshToken'
 *
 *          responses:
 *              201:
 *                  description: created new Book    
 */

/**
 * @swagger
 *  /auth/checkuser:
 *      post:
 *          tags: [AuthUser(Auth)]
 *          summary: create and save blog
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/checkuser'
 *
 *          responses:
 *              201:
 *                  description: created new Book    
 */




/**
 * @swagger
 *  /auth/register:
 *      post:
 *          tags: [AuthUser(Auth)]
 *          summary: create and save blog
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Register'
 *
 *          responses:
 *              201:
 *                  description: created new Book    
 */

/**
 * @swagger
 *  /auth/login:
 *      post:
 *          tags: [AuthUser(Auth)]
 *          summary: login user 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Login'
 *
 *          responses:
 *              201:
 *                  description: created new Book    
 */
