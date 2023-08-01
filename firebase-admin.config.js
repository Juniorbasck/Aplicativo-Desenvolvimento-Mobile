import { initializeApp } from "firebase-admin/app";

const adminApp = initializeApp();

console.log('Firebase-admin.config.js initialized...');

export {
    adminApp
};
