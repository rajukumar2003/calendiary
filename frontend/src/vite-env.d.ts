/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_API: string;
    // Add other environment variables here if needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}