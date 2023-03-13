# Cozia

## Table of Contents

-   [Description](#description)
-   [Technologies](#technologies)
-   [User Story](#user-story)
-   [Acceptance Criteria](#acceptance-criteria)
-   [Deployed Application](#deployed-application)
-   [Future Improvements](#future-improvements)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Contributing](#contributing)
-   [Tests](#tests)
-   [Credits](#credits)
-   [Questions](#questions)
-   [License Information](#license-information)

## Description

This versatile application encourages entrepreneurship by allowing users to be both sellers and consumers. If users wants to be a seller but also wants to purchase products, then with this applications, they can both. Users can keep track what orders they have, and they can modify their products, the order's deliver status and delivery date. Also, users can view what items they purchased. If users want to terminate their account, they can by entering their username and proceed to delete their account.

### What did you learn?

-   Some npm packages and versions require a certain version in order to work
    well with other npm
-   We expanded our coding skills by challenging ourselves with new challenges,
    such as handling server-side validations and implementing new npm packages like stripe for payment.
-   We got more practice with debugging, especially with the AWS/Heroku deployment.

### What makes your project stand out?

There are a lot of cool features. One, this application is mobile responsive. Two, every form uses server-side verifications. Three, this application has a dynamic table where users can modify their order list. If users want to update their products, then a modal will pop up and have their previous data preloaded already. Four, if users want to delete a product or delete their account, then a modal will pop up and users have to input their username correctly. Finally, this app is deployed with popular services: Amazon Web Services (AWS) and Heroku.

But don't take our word for it, checkout out our cool app!

## Technologies

##### Client-Side Dependencies

-   Apollo Client
-   Tailwind
-   DAYJS
-   Toast
-   React
-   Stripe

##### Server-Side Dependencies

-   Apollo Server Express
-   bcrypt
-   dotenv
-   Express
-   GraphQL
-   jsonwebtoken
-   MongoDB & Mongoose
-   Node.js
-   Stripe

##### Dev Dependencies

-   Concurrently
-   Nodemon
-   Faker.js
-   NEW SEED API \*

##### Repository and Deployment

-   Github repository
-   AWS && Heroku deployment

(Reference 3 package.jsons to see a full list and versions)

## User Story

AS A business owner and consumer, <br>
I WANT to be able to view and manage my sold products, but also buy products <br>
SO THAT I can organize and plan my business while being a consumer.

## Acceptance Criteria

GIVEN an e-commerce clothing apparel app <br>
WHEN a user views the homepage, <br>
THEN they can see the new arrival, featured clothes of the day, and the latest discounted clothes. <br>
WHEN the user tries to go their account without loggin in first, <br>
THEN the user will recieve a message to login first before viewing their dashboard. <br>
WHEN a user is given the option to login or signup, <br>
THEN the user can login or sign up, where they will be redirected to the dahsboard. <br>
WHEN the user access their dashboard, <br>
THEN they can view many tabs, such as My Products page, Order List page, and their profile page. <br>
WHEN the user clicks on the "My Product" page, <br>
THEN they can see all of their items that they are selling and edit/delete their products. <br>
WHEN the user clicks on the Order List page, <br>
THEN they can view two tables: Purchased Items and Sales Items. <br>
WHEN the user expands the Purchased Items table, <br>
THEN they can see what items they purchased. <br>
WHEN the user sees the Sales Items table, <br>
THEN the user can edit the delievery date and delievery status of the order. <br>
WHEN the user clicks on their profile page <br>
THEN the user has the option to delete their account. <br>
WHEN the user clicks on any of the categories, <br>
THEN a list of products from that category will render. <br>
WHEN the user clicks on the individual product, <br>
THEN the user will be taken to the item page and view the product's information. <br>
WHEN the user clicks "Add to Cart", <br>
THEN the user will get a notification that their item has been added to the cart and the cart will obtain that item. <br>
WHEN the user clicks on "Delete" in the cart, <br>
THEN that item is deleted. <br>
WHEN the user clicks on "Checkout" in the cart, <br>
THEN the user has to fill out shipping and billing information. <br>
WHEN the user clicks on "Confirm Order", <br>
THEN they can see all the items that they are purchasing. <br>
WHEN the user clicks on "Make Payment" <br>
THEN they are taken the Stripe to complete the payment process. <br>
WHEN the user clicks on "Pay", <br>
THEN the user will be redirect the success page then to their dashboard. <br>
WHEN the user clicks on "Order List" in their dashboard, <br>
THEN that order will render in their purchased items table. <br>
WHEN the user logs out, <br>
THEN their logout is successful and they are redirected to the homepage.

## Deployed Application

AWS: []\*

Heroku: []\*

Github Repository: [https://github.com/mstan19/cozia]

## Future Improvements

-   Add a wishlist
-   Build a contact page for technical support
-   Handle a better way to upload images
-   Turn the app into a PWA

## Installation

```
clone github repo
npm install
npm run build
npm run develop
Go to http://localhost:3000
```

OR follow the above Heroku or AWS deployed application link.

Also, create an .env in the server folder. This file will contain the JWS secret (AKA JWT_SECRET), stripe secret key (AKA STRIPE_SECRET_KEY), and client url (AKA CLIENT_URL). You will need to create stripe secrete key and jws secret.

To run it on localhost, run the seeds and run the app commands in the root
directory `npm run seed && npm run develop`.

### Seeds

This application uses MongoDB and Mongoose (version 5.9.10). First run the seed
file in server directory by running this command `npm run seed`; this loads the
database. To see the database, download the MongoDB app and connect to seed
database called "Cozia" by pressing "Save & Connect". Afterwards, click on
"Cozia" database. You now have access to the database.

### Develop

By running `npm run develop` in the root directory, the app runs both
client-side and server-side servers at the same time. Then, the app will run in
the localhost:3000.

## Usage

### Screenshots

\*
Homepage ![Cozia Homepage](./client/src/assets/)
User can login or signup
![Cozia Login](./client/src/assets/images/loginCozia.png)
![Cozia Signup](./client/src/assets/images/)
Dashboard ![Cozia Dashboard](./client/src/assets/images/)
Stripe Payment
![Cozia Stripe Payment Platform]()

## Contributing

Considering to contribute? Follow these steps:

1] Follow installation instructions above. <br> 2] Create a branch for your
feature. <br> 3] The main branch is protected. Please contact one of us to review and potentially merge your contribution when you have completed your feature.

## Tests

No tests are applicable to this project at this time.

## Credits

Collaborators:

[Christy Le](https://github.com/christylex3),
[Melissa Stan](https://github.com/mstan19)

## Questions

Any questions? We'd love to hear from you! Contact any of us through our above
linked githubs.

## License Information

This project does not have any licenses at the moment.

---
