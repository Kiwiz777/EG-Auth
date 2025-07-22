This is a Monorepo FullStack (Nest, React) Webapp initialized by npm workspaces.

The Backend (Nest) Contain:

- 2 Mopdules ( Users, Auth ) next to the root module.
- The Auth Module has 3 Routes [ login, signup, me] for the controller.
- The Module Support JWT token & http-only cookie.
- Users Module has Mongoose Schema for the user (id, name, email, hashedpassword as password)
- there are 2 protected routes by authguard /auth/me & the root path "/".
- secrets and any risky data to have is added to the app as environemnt variables (if you don't see them i might have added them as github secrets for the action to use).

The Frontend (React) Contain:

- api interciptor and methods under src/api.
- tailwindcss + MUI.
- Auth store using zustand.
- a Hook to check auth against endpoint /auth/me to validate token.
- 3 pages [Home (protected), Login, Signup].
- Signup Page has Validation for:
  -password vs RepeatPassword.
  -Email Validation.
  -password Validation (must have atleast 1 letter,1 digit, 1 special character and atleast 8 characters).

Adding more after the next push to Clean up some mess :D.
