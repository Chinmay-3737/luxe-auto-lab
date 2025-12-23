/// <reference types="vite/client" />

declare global {
  interface SDKTypeMode {
    strict: true;
  }
}

interface ImportMetaEnv {
  readonly VITE_BASE_NAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
