"use server";

import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { 
  BUCKET_ID, 
  DATABASE_ID, 
  ENDPOINT, 
  PATIENT_COLLECTION_ID, 
  PROJECT_ID, 
  databases, 
  storage, 
  users 
} from "../appwrite.config";
import { parseStringify } from "../utils";

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newuser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

export const registerPatient = async ({
  identificationDocument,
  primaryPhysician, // Verifica si este campo está definido en Appwrite
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      console.log("Identification document received:", identificationDocument);

      const blobFile = identificationDocument.get("blobFile") as Blob;
      const fileName = identificationDocument.get("fileName") as string;

      console.log("Blob File:", blobFile);
      console.log("File Name:", fileName);

      // Convert Blob to ArrayBuffer and then to Buffer
      const arrayBuffer = await blobFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const inputFile = InputFile.fromBuffer(buffer, fileName);

      console.log("Creating file in storage...");
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
      console.log("File created with ID:", file.$id);
    }

    // Verifica que los campos enviados estén definidos en la colección
    const patientData = {
      identificationDocumentId: file?.$id ? file.$id : null,
      identificationDocumentUrl: file?.$id
        ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
        : null,
      // Solo agregar campos que están definidos en la colección
      ...(primaryPhysician && { primaryPhysician }), 
      ...patient,
    };

    console.log("Patient Data:", patientData); // Log the patient data before sending it

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      patientData
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
    throw error; // Re-throw the error to see it in higher-level logs
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};
