/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** access key ของ Web3Forms (เปิดเผยได้) — ฟอร์มติดต่อส่งอีเมลตรงจากเบราว์เซอร์ */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
