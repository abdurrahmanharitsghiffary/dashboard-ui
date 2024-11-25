# Project Structure Guidelines

This document outlines the conventions and best practices for the project structure and code style. Follow these guidelines strictly to ensure consistency, readability, and maintainability across the codebase. Make sure you read all the important articles listed in the **Important Reading Resources** section below.

## Naming Conventions

- **PascalCase**:

  - Used for interfaces and components.
  - Example: `UserProfile`, `ComponentProps`.

- **camelCase**:

  - Used for variables and properties.
  - Example: `userProfile`, `isLoggedIn`.

- **UPPER_CASE**:

  - Used for constant variables.
  - Example: `API_URL`, `MAX_RETRIES`.

- **kebab-case**:
  - Used for file names.
  - Example: `user-profile.tsx`, `auth-context.ts`.

## File Extensions

- **`.ts`**:

  - Used for custom hooks and other files that are not components.
  - Example: `useAuth.ts`.

- **`.tsx`**:
  - Used for React components.
  - Example: `UserProfile.tsx`.

## Component Guidelines

1. **Use the `function` keyword for components**:

   - **Good** ✅:
     ```javascript
     function MyComponent() {
       return 'MyComponent';
     }
     ```
   - **Bad** ❌:
     ```javascript
     const MyComponent = () => 'MyComponent';
     ```

2. **Conditional rendering**:

   - Avoid using `isTrue && <SomeComponent />`.
   - Use `isTrue ? <SomeComponent /> : null` for better clarity.

3. **Props interface**:

   - Always define props using an interface with a `Props` suffix.
   - Example:
     ```typescript
     interface UserProfileProps {
       name: string;
       age: number;
     }
     ```

4. **Export naming**:
   - The name of a default export must match the file name.
   - Example:
     - File: `listing-page.tsx`
     - Component: `export default function ListingPage() {}`

## Metadata Declaration

- Always explicitly declare metadata types for pages.

  - Example:
    ```typescript
    export const metadata: Metadata = {
      title: 'My Page',
      description: 'This is my page',
    };
    ```

## Custom Hooks

- Never use default exports for custom hooks.
- Example:

  - **Bad** ❌:
    ```javascript
    export default function useAuth() {}
    ```
  - **Good** ✅:
    ```typescript
    export function useAuth() {
      // logic
    }
    ```

## Important Reading Resources

- [Project Structure](https://github.com/alan2207/bulletproof-react)
- [Conventional Commit Cheatsheet](https://gist.github.com/Zekfad/f51cb06ac76e2457f11c80ed705c95a3)
- [Naming Cheatsheet](https://github.com/kettanaito/naming-cheatsheet)
- [Tao Of React](https://alexkondov.com/tao-of-react)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)

### Final Reminder

📝 **Reading and understanding these guidelines is crucial before starting your work. It's better to follow them from the beginning rather than fixing mistakes later as pointed out by your code reviewer!** 🤣
