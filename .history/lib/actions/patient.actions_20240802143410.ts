import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    console.log("Creating new user with data:", user);
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      user.name
    );
    console.log("New user created:", newUser);

    return parseStringify(newUser);
  } catch (error: any) {
    console.error("Error creating new user:", error);
    // Check existing user
    if (error && error?.code === 409) {
      console.log("Conflict error, searching for existing user...");
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);
      console.log("Existing user found:", existingUser);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};
