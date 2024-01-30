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

Cozia is a versatile application that encourages entrepreneurship by allowing users to be both sellers and consumers. If users want to sell clothes but also wants to purchase clothes, they can do both through Cozia. Users can track what orders they have, and they can modify their products, the order's delivery status, and delivery date. Also, users can view what items they've purchased. If users want to terminate their account, they will be prompted to re-enter their username to delete their account.

### What did you learn?

-   NPM packages and versions require certain versions in order to work well with other NPMs
-   We expanded our coding skills by challenging ourselves with handling difficult real world application's features such as handling server-side validations and implementing new NPM packages like stripe for payment.
-   We got more practice with debugging, especially with the AWS/Heroku deployment.

### What makes your project stand out?

1. Follows **Mobile First Design**, so it's mobile responsive.
2. Enables **server-side verification** for every form.
3. Uses **dynamic tables** where users can smoothly modify their order list through a clean modal with **preloaded information**.
4. Implements **security verification method** for deleting user's account.
5. Incorporates **Stripe as a payment method** when purchasing clothes. (Don't worry, no real transaction is going through when you use a fake payment information provided for demonstration.)
6. Deploys through popular services: **Heroku and Amazon Web Services (AWS)**.

*But don't take our word for it, check out our cool Cozia!*

## Technologies

##### Client-Side Dependencies

- Apollo Client
- Tailwind
- DAYJS
- Toast
- React
- Stripe
- React-colorful

##### Server-Side Dependencies

- Apollo Server Express
- bcrypt
- dotenv
- Express
- GraphQL
- jsonwebtoken
- MongoDB & Mongoose
- Node.js
- Stripe

##### Dev Dependencies

- Concurrently
- Nodemon
- Faker.js
- Unsplash API

##### Repository and Deployment

- GitHub repository
- AWS && Heroku deployment

(Reference 3 package.jsons to see a full list and versions)

## User Story

AS A business owner and consumer,
I WANT to be able to view and manage my sold products, but also buy products <br>
SO THAT I can organize and plan my business while being a consumer.

## Acceptance Criteria

```
GIVEN an e-commerce clothing apparel app
WHEN a user views the home page,
THEN they can see the new arrival, featured clothes of the day, and the latest discount clothes.
WHEN the user tries to go their account without logging in first,
THEN the user will receive a message to login first before viewing their dashboard.
WHEN a user is given the option to login or sign up,
THEN the user can login or sign up, where they will be redirected to the dashboard.
WHEN the user accesses their dashboard,
THEN they can view many tabs, such as My Products page, Order List page, and their Profile page.
WHEN the user clicks on the "My Products" page,
THEN they can see all of their items that they are selling and edit or delete their products.
WHEN the user clicks on the Order List page,
THEN they can view two tables: Purchased Items and Sales Items.
WHEN the user expands the Purchased Items table,
THEN they can see what items they purchased.
WHEN the user sees the Sales Items table,
THEN the user can edit the delivery date and delivery status of the order.
WHEN the user clicks on their Profile page
THEN the user has the option to delete their account with security verification.
WHEN the user clicks on any of the categories,
THEN a list of products from that category will render. 
WHEN the user clicks on the individual product,
THEN the user will be taken to the item page and view the product's information.
WHEN the user clicks on the "Add to Cart" button,
THEN the user will get a notification that their item has been added to the cart, and the cart will update with that item added to it. 
WHEN the user clicks on the "Remove" button in the cart,
THEN that item is removed from the cart.
WHEN the user clicks on "Checkout" in the cart,
THEN the user has to fill out shipping and billing information.
WHEN the user clicks on "Confirm Order",
THEN they can see all the items that they are purchasing.
WHEN the user clicks on "Make Payment",
THEN they are taken the Stripe to complete the payment process.
WHEN the user clicks on "Pay",
THEN the user will be redirected to the success page and then to their dashboard.
WHEN the user clicks on "Order List" in their dashboard,
THEN that order will render in their purchased items table.
WHEN the user logs out,
THEN their logout is successful and they are redirected to the homepage.
```

## Deployed Application

AWS: https://gocozia.com/
- Demo Account: use Jaylin_Hilpert@gmail.com for the email and password.

Heroku: https://cozia.herokuapp.com/
- Demo Account: use Luther27@gmail.com for the email and password.


> **Please use fake information when checking out Cozia.**

GitHub Repository: https://github.com/mstan19/cozia

## Roadmap

- Include a wishlist feature where users can "love" clothes they want but cannot purchase just yet
- Add a statistics where users can see how much revenue they earned from their sales
- Build a contact page for technical support

## Installation

1. `git clone` the repository and navigate to `cozia` folder.
2. Run `npm i` in the terminal from the root.
3. Next, run `npm run build` and `npm run seed`.
4. Lastly, run `npm run develop` and your browser should open a new tab with http://localhost:3000.

**OR** you can test our app by clicking on the Heroku or AWS deployed application link (from above at the Deployed Application section).

> Note: Also, create an `.env` in the server folder and paste this in the file:
```
JWT_SECRET=

STRIPE_SECRET_KEY=""

CLIENT_URL = http://localhost:3000

CLIENT_ID = 

curated_id = G1AwidaMrdQ
```

### Instructions to set up .env file
1. For `JWT_SECRET`, you can insert anything.
2. For `CLIENT_ID`, go to [Unsplash](https://unsplash.com/join) and make an account if you haven't already, and navigate to the [Unsplash Developers](https://unsplash.com/developers).
3. Click on `Your apps` > `New Application` > Agree to all guidelines of the API Use and Guidelines as well as their Terms of Services.
4. Name the application, "Cozia" > put the description as "E-Commerce Apparel" > Create App.
5. Scroll down where you can see the `Access Key`, copy it, and paste it at `CLIENT_ID`


To run it on localhost, run the seeds and run the app commands in the root
directory `npm run seed && npm run develop`.

### Seeds

This application uses MongoDB and Mongoose (version 5.9.10). To see the seeds, run `npm run seed` in the terminal; this loads the database. To see the database, download the MongoDB app and connect to seed
database called "Cozia" by pressing "Save & Connect". Afterwards, click on
"Cozia" database. You now have access to the database.

### Develop

By running `npm run develop` in the root directory, the app runs both
client-side and server-side servers at the same time. Then, the app will run in
the localhost:3000.

## Usage

## Screenshots

Homepage (Mobile View) <br />
![Mobile Homepage](./client/src/assets/images/mobileHomepageCozia1.png) <br />
Homepage (Mobile View) <br />
![Mobile Homepage](./client/src/assets/images/mobileHomepageCozia2.png) <br />
Homepage (Desktop View) <br />
![Desktop Homepage](./client/src/assets/images/homepageCozia1.png) <br />
Homepage (Desktop View) <br />
![Desktop Homepage](./client/src/assets/images/homepageCozia2.png) <br />
View All Clothes (Mobile View) <br />
![Mobile View All Clothes](./client/src/assets/images/galleryMobileCozia.png) <br />
Login (Mobile View) <br />
![Mobile Login](./client/src/assets/images/loginMobileCozia.png) <br />
Login (Desktop View) <br />
![Desktop Login](./client/src/assets/images/loginCozia.png) <br />
Signup (Mobile View) <br />
![Mobile Signup](./client/src/assets/images/signupMobileCozia.png) <br />
Signup (Desktop View) <br />
![Desktop Signup](./client/src/assets/images/signupCozia.png) <br />
Dashboard (Mobile View) <br />
![Mobile Dashboard](./client/src/assets/images/dashboardMobilCozia.png) <br />
Dashboard (Desktop View) <br />![Desktop Dashboard](./client/src/assets/images/OrderlistCozia.png) <br />
Dashboard Edit Order Modal (Mobile View) <br />
 ![Mobile Dashboard Edit Order Modal](./client/src/assets/images/dashboardMobilCozia.png) <br />
Dashboard Edit Order Modal (Desktop View) <br />
![Desktop Dashboard Edit Order Modal](./client/src/assets/images/editOrderModalCozia.png) <br />
Dashboard My Products Page (Mobile View) <br />
![Mobile Dashboard My Products Page](./client/src/assets/images/myproductsMobileCozia.png) <br />
Dashboard My Products Page (Desktop View) <br />
![Desktop Dashboard My Products Page](./client/src/assets/images/myProductsCozia.png) <br />
Dashboard Add Product Form (Mobile View) <br />
![Mobile Add Product Form](./client/src/assets/images/addformMobileCozia.png) <br />
Dashboard Add Product Form (Desktop View) <br />
![Desktop Add Product Form](./client/src/assets/images/addformCozia.png) <br />
Dashboard Account Page (Mobile View) <br />
![Mobile Dashboard Account Page](./client/src/assets/images/profileMobileCozia.png) <br />
Dashboard Account Page (Desktop View) <br />
![Desktop Dashboard Account Page](./client/src/assets/images/profileCozia.png) <br />
View Clothes By Category (Mobile View) <br />
![Mobile Clothes By Category](./client/src/assets/images/viewClothesMobileCozia.png) <br />
View Clothes By Category (Desktop View) <br />
![Desktop View Clothes By Category](./client/src/assets/images/viewclothesCozia.png) <br />
View Item (Mobile View) <br />
![Mobile Item](./client/src/assets/images/itemMobileCozia.png) <br />
View Item (Desktop View) <br />
![Desktop Item](./client/src/assets/images/itemCozia.png) <br />
Cart (Mobile View) <br />
![Mobile Cart](./client/src/assets/images/cartMobileCozia.png) <br />
Cart (Desktop View) <br />
![Desktop Cart](./client/src/assets/images/cartCozia.png) <br />
Checkout (Mobile View) <br />
![Mobile Checkout](./client/src/assets/images/checkoutMobileCozia.png) <br />
Checkout (Desktop View) <br />
![Desktop Checkout](./client/src/assets/images/checkoutPageCozia.png) <br />
Confirmation page (Mobile View) <br />
![Mobile Confirmation](./client/src/assets/images/confirmMobileCozia.png) <br />
Confirmation page (Desktop View) <br />
![Desktop Confirmation](./client/src/assets/images/confirmCozia.png) <br />
Stripe Payment
![Cozia Stripe Payment Platform](./client/src/assets/images/stripeCozia.png)
Success page (Mobile View) <br />
![Mobile Success](./client/src/assets/images/successMobileCozia.png) <br />
Success page (Desktop View)
![Desktop Success](./client/src/assets/images/successCozia.png)

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
