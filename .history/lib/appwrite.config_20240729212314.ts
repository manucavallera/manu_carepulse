import * as sdk from "node-appwrite";

export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

// Añadir logs para verificar las variables de entorno
console.log("Appwrite Configurations:");
console.log("PROJECT_ID:", PROJECT_ID);
console.log("API_KEY:", API_KEY ? "API Key is set" : "API Key is missing");
console.log("DATABASE_ID:", DATABASE_ID);
console.log("PATIENT_COLLECTION_ID:", PATIENT_COLLECTION_ID);
console.log("DOCTOR_COLLECTION_ID:", DOCTOR_COLLECTION_ID);
console.log("APPOINTMENT_COLLECTION_ID:", APPOINTMENT_COLLECTION_ID);
console.log("BUCKET_ID:", BUCKET_ID);
console.log("ENDPOINT:", ENDPOINT);

const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
