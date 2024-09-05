## Set Up and Run the Application

> React Native Environment Setup: [Link](https://reactnative.dev/docs/next/set-up-your-environment)

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/ShobhitShah1/User-Management.git
   cd User-Management
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Application:**

   ```bash
   npx react-native run-android
   npx react-native run-ios
   ```

4. **Start the Metro Bundler:**

   ```bash
   npm start
   # or
   yarn start
   ```

## Explanation of Architecture and Design Decisions

### 1. Architecture Overview:

The application uses React Native CLI with TypeScript for type safety. It has Redux Toolkit for state management, React Navigation for navigation, and custom components for UI rendering.

### 2. Components:

- **Navigation:**
  The app uses `@react-navigation/native` and `@react-navigation/native-stack` to manage navigation between screens. The navigation configuration is defined in the `MainRoute` component, which sets up the `UserList` and `UserDetail` screens.

- **Redux for State Management:**
  The app uses Redux Toolkit to manage global state, specifically for handling user data, loading states, and errors. The `userDataSlice` contains actions and reducers to handle user-related operations, including fetching users, handling pagination, and managing loading and error states.

- **Async Operations with `createAsyncThunk`:**
  The `fetchUsers` action is defined using `createAsyncThunk` to handle asynchronous API calls with Redux. This approach simplifies handling loading, success, and error states without manually managing these scenarios in components.

- **Service Layer:**
  The app follows a service-oriented approach where API calls are encapsulated in separate service files (ex, `userService.ts`). This separation promotes the single responsibility principle, makes the code more testable, and allows easier changes to the API logic.

- **Custom Components:**
  The app uses a custom component, `RenderUserList`, to render individual user items.

### 3. Design Decisions:

- **TypeScript for Type Safety:**
  TypeScript is used throughout the application to provide type safety, reduce bugs, and enhance code readability.

- **Separation of Concerns:**
  The project separates concerns by organizing files into folders by functionality, such as `redux`, `services`, and `screens`. This improves maintainability and scalability.

- **Infinite Scroll and Pull-to-Refresh:**
  The `UserList` screen implements infinite scrolling to load more users as the user reaches the end of the list and pull-to-refresh to reload users from the beginning.

- **Error Handling:**
  The app display error messages when an API request fails, ensuring that users are informed of any issues.
