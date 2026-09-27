/// <reference types="vite/client" />

/** วันที่ build (ISO) — ใส่ผ่าน define ใน vite.config ใช้แสดง "แก้ไขล่าสุด" ใน footer */
declare const __BUILD_DATE__: string

interface ImportMetaEnv {
  /** access key ของ Web3Forms (เปิดเผยได้) — ฟอร์มติดต่อส่งอีเมลตรงจากเบราว์เซอร์ */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
