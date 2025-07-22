import { Button, Card, Field, Input, Stack, Link } from "@chakra-ui/react";

export const SignupForm = () => (
  <Card.Root maxW="sm">
    <Card.Header>
      <Card.Title>Login</Card.Title>
      {/* <Card.Description>
        Fill in the form below to create an account
      </Card.Description> */}
    </Card.Header>
    <Card.Body>
      <Stack gap="4" w="full">
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input />
        </Field.Root>
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input />
        </Field.Root>
        <Field.Root>
          <Field.Label>Password</Field.Label>
          <Input />
        </Field.Root>
      </Stack>
    </Card.Body>
    <Card.Footer justifyContent="flex-end">
      <Button variant="solid">Signup</Button>
      <Link href="#">Sign In.</Link>
    </Card.Footer>
  </Card.Root>
);
