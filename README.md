# Cozia

## License

<!-- [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
??? -->

## Table of Contents

-   [License](#license)
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

### Motivation

### What problem does it solve?

### What did you learn?

-   Some npm packages and versions require a certain version in order to work
    well with other npm
-   By following the Test Driven Development (TDD), this ensures that components
    and features are being render and are working together. This help to improve
    the code. ensures every feature works when expanding the project.
-   We got more practice with debugging, especially with the Heroku deployment.
-   Each of us became more knowledgeable about the tool or technology he or she
    was tasked.

### What makes your project stand out?

## Technologies

##### Client-Side Dependencies

-   Apollo Client
-   Tailwind
-   Jest
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

##### Repository and Deployment

-   Github repository
-   Heroku deployment

(Reference 3 package.jsons to see a full list and versions)

## User Story

## Acceptance Criteria

## Deployed Application

Heroku: []

Github Repository: [https://github.com/mstan19/cozia]

## Future Improvements

-   Turn the app into a PWA
-   Refactor for neatness/readability
-   More error handling throughout

## Installation

```
clone github repo
npm install
npm run build
npm run develop
Go to http://localhost:3000
```

OR follow the above Heroku deployed application link

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

Homepage ![Cozia Homepage]() User can login or signup
![Cozia Login]()![Cozia Signup]() Dashboard ![Cozia Dashboard]() Stripe Payment
![Cozia Stripe Payment Platform]()

## Contributing

Thanks for contributing! Please follow the license guidelines found in the
License Information section.

Instructions to contribute:

1] Follow installation instructions above. <br> 2] Create a branch for your
feature. <br> 3] The main branch is protected. Contact one of us to review and
potentially merge your contribution when you have completed your feature.

## Tests

Several tests are implemented to ensure features are still working when the app
expands. Jest (version x.x) is the testing library that was used to test our
features.

## Credits

Collaborators:

[Christy Le](https://github.com/christylex3),
[Melissa Stan](https://github.com/mstan19)

## Questions

Any questions? We'd love to hear from you! Contact any of us through our above
linked githubs.

## License Information

<!-- Click on the license badge for more information about our license [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) -->

---
