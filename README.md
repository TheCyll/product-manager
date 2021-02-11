# Product Manager (prototype)

This is a personal project with the purpose of dive into _React_ and _Node_.
The function of the app is to be capable of upload a product, its information and an image, then storage the products in a database (_MongoDB_) and be capable of CRUD operations with the products. With the API filled, a front-end display to show the products is easy to implement.

Here I am basically reinventing the wheel for education, I know CMSs can achieve the same result.

## Usability

The user can:

- Create a product
- Upload an image from a file
- Drop an image to the dropable area
- Edit the image before uploading it to the server
- if no image is submited, the server will set a default

Not yet but soon: 

- Delete, update, and see all the products in the database
- Authenticate and authorize (roles)
- Add categories and assign products to them (drag and drop)

## Technologies

- React
- Node
- SASS

## IMPORTANT NOTE

For security reasons, and because the app it's not in production yet, I have removed my MONGO_URI from the database configuration.
If you want to save files to check out the functionality in a development environment you have to pass a MONGO_URI yourself in the ```config/config.js``` as an export from a custom ```secrets.js``` file.
