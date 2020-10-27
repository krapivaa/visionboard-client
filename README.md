# Vision Board

Vision Board is an app for inspiration. It is a blank canvas where users can collect, organize, and display photos and other items that inspire them in a streamlined web application. Users can create boards with a chosen theme and add items which speak to them.

## Created by the Code Revolutionaries:

- Gabriel Francis: github.com/thecoder-droid
- Marina Ivanovskaya: github.com/krapivaa
- Lauren Anthony: github.com/LaurenEAnthony

## App Features:

### Users:

- Create and log in to a personal account.
- Create and view boards for user defined topics on the landing page.
- Update board title, and other info, and delete boards that are no longer wanted.
- Add and view items inside of each board.
- Create items with images or text only items. Images can be URL or uploaded from a device.
- Update item information and delete items no longer wanted.
- Quickly switch between boards with sidebar navigation.

### Admin:

- View user information table.
- Create new admin users through a protected route.
- Update user passwords and admin status.
- Delete all user information.

## App Endpoints:

### User: ~/api/user

```
POST /signup                        => Register new user
POST /login                         => Log in a user
POST /admin/signup                  => Register a new admin
GET  /admin/view-all                => Get all users
PUT  /admin/edit/:userId            => Update user info
DELETE /admin/delete/:userId        => Delete user
```

### Board: ~/api/board

```
POST /create                        => Create a new board
PUT  /update/:boardId               => Update existing board
DELETE /delete/:boardId             => Delete existing board
GET  /mine                          => Find all user’s boards
GET  /:boardId                      => Find all items for a specific board
```

### Item: ~/api/item

```
POST  /create-new-on-board/:boardId => Create a new item on specified board
PUT /update/:itemId                 => Update existing item
DELETE  /delete/:itemId             => Delete existing item
```

## A Peak Inside:

### Login & Signup

![Auth Page](https://raw.githubusercontent.com/krapivaa/visionboard-client/master/src/assets/screenshots/visionboard-login-signup.png)

### Board Display

![Board Display](https://raw.githubusercontent.com/krapivaa/visionboard-client/master/src/assets/screenshots/visionboard-boardDisplay.png)

### Item Display

![Item Display](https://raw.githubusercontent.com/krapivaa/visionboard-client/master/src/assets/screenshots/visionboard-itemDisplay.png)

### Image Modal

![Image Modal](https://raw.githubusercontent.com/krapivaa/visionboard-client/master/src/assets/screenshots/visionboard-itemviewmodal.png)

### Admin Page

![Admin Page](https://raw.githubusercontent.com/krapivaa/visionboard-client/master/src/assets/screenshots/visionboard-adminview.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
