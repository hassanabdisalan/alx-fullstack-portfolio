/// <reference types="vite/client" />
declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any; // You can use a proper type here if using @types/facebook-js-sdk
  }
}
