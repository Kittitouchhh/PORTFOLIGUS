/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** โดเมนของ API ตอน deploy จริง — ตอน dev ปล่อยว่างแล้วใช้ proxy ของ vite */
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
