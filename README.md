# CS4261 First App

Template starter with React Navigation and Firebase auth using React Context

# Preview

<div style="display: inline-block;">
<img src="media/Auth.png"  width="300">
<img src="media/home_page.jpeg"  width="300">
<img src="media/info_screen.jpeg"  width="300">
</div>

# Installation

1. Install [node.js](https://nodejs.org/en/)
2. Install Expo

   ```sh
   npm install --global expo-cli
   ```

3. Download this repo
4. Install deps on your template folder

   ```sh
   npm install
   ```

5. Start the environtment

   ```sh
   yarn start
   ```

# Auth Flow

### Firebase Setup

- Set up a new firebase project
- Go to Authentication and under Sign-in Method enable Email/Password
- Go to project overview and create iOS app
- Fill this firebase config to your config inside `./src/navigation/AppNavigator.js`

```jsx
// Better put your these secret keys in .env file
const firebaseConfig = {
	apiKey: '',
	authDomain: '',
	databaseURL: '',
	projectId: '',
	storageBucket: '',
	messagingSenderId: '',
	appId: '',
};
```

### React Navigation Auth Flow

The checking logged users process is inside `./src/provider/AuthProvider` I use React Context, you can add more functions like get the data of the user and store it to the context (better static data, ex: uid)

Inside the navigator `./src/navigation/AppNavigator.js`
There's 2 stack navigator :

- `<Auth/>` → for not logged in users stack
- `<Main/>` → for logged in users stack
- `<Loading/>` → when checking if the user is logged in or not loading screen

```jsx
export default () => {
	const auth = useContext(AuthContext);
	const user = auth.user;
	return (
		<NavigationContainer>
			{user == null && <Loading />}
			{user == false && <Auth />}
			{user == true && <Main />}
		</NavigationContainer>
	);
};
```

## Rapi UI

These UI components are provided by [Rapi UI](https://rapi-ui.kikiding.space/).
Check the [documentation](https://rapi-ui.kikiding.space/docs/) for usage and more components.

# File Managements

These are the folders and the functionality

```
/src/assets -> for media such as images, etc
/src/components -> for components
/src/navigation -> for React Navigation
/src/provider -> for React Context
/src/screens -> for Screens
```
