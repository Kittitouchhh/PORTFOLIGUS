# Portfolio — กิตติธัช สกุลศักดิ์พินิจ

พอร์ตโฟลิโอส่วนตัว (หน้าเดียว) · React 19 + Vite 7 + Tailwind v4 · สองภาษา ไทยเป็นหลัก สลับอังกฤษได้
ไม่มี backend — build แล้วได้ไฟล์ static ขึ้น Vercel / Netlify / Cloudflare Pages ได้เลย

## รันยังไง

```bash
npm install     # ครั้งแรกครั้งเดียว
npm run dev     # เปิด http://localhost:5173
```

| คำสั่ง | ทำอะไร |
|---|---|
| `npm run dev` | รันหน้าเว็บโหมดพัฒนา |
| `npm run build` | typecheck + build → `frontend/dist/` |
| `npm run preview` | เปิดดูผลที่ build แล้ว |
| `npm run lint` | typecheck อย่างเดียว |

## โครงสร้าง

```
PORTFOLIGUS/
├── shared/src/
│   ├── types.ts            Lang, L, helper l('ไทย', 'English')
│   ├── contact.ts          กติกา + ตัวตรวจข้อมูลฟอร์มติดต่อ
│   └── content/profile.ts  ข้อมูลติดต่อ (อีเมล เบอร์ ลิงก์ เรซูเม่)
│
└── frontend/
    ├── public/             รูป (photos, stickers, characters, dpu-hub, brand) + resume*.html
    └── src/
        ├── pages/HomePage.tsx        ลำดับ section ทั้งหน้า
        ├── features/                 แต่ละ section: hero, work, senior-project, method, person, contact
        ├── components/layouts/       SectionBand (แถบ 1 จอ + ย่อให้พอดีจอ), SideNav, Navbar, Footer
        ├── hooks/useMagnetScroll.ts  เลื่อนแบบแม่เหล็ก (ทีละจอ)
        ├── services/contact.service.ts  ส่งฟอร์มผ่าน Web3Forms + ด่านกันสแปม
        └── constants/uiText.ts       ข้อความ UI สองภาษา
```

## ฟอร์มติดต่อ (Web3Forms)

ส่งตรงจากเบราว์เซอร์ไป [Web3Forms](https://web3forms.com) แล้วอีเมลเข้า kittitouch.dev@gmail.com

1. คัดลอก `frontend/.env.example` เป็น `frontend/.env` แล้วใส่ `VITE_WEB3FORMS_ACCESS_KEY=...`
2. key นี้เปิดเผยในหน้าเว็บได้ (ทำได้แค่ส่งเมลเข้ากล่องที่ผูกไว้) — ถ้าโดนสแปมหนัก สร้าง key ใหม่แล้วเปลี่ยนค่า
3. กันสแปมไว้ใน `contact.service.ts`: ช่องล่อบอท · กรอกเร็วผิดปกติ (< 3 วิ) · ลิงก์เกิน 2 · ส่งซ้ำ · ส่งถี่ (60 วิ / 3 ครั้งต่อชม.)

## Deploy (Vercel)

1. push ขึ้น GitHub → Vercel › Add New › Project › เลือก repo
2. Root Directory: `frontend` · Framework: Vite
3. Environment Variables: `VITE_WEB3FORMS_ACCESS_KEY`
4. Deploy — หลังจากนี้ push ทีไรเว็บอัปเดตเอง

## กติกาเรื่องเนื้อหา (สำคัญ — งานลูกค้าติด NDA)

ห้ามใส่ชื่อลูกค้าจริง ชื่อคน เลขใบงาน ชื่อสินค้า ตัวเลขเงิน หรือโค้ดจริง
mockup ทุกจอใช้ข้อมูลสมมติ (`งาน 01…`, `ใบงานตัวอย่าง`, `ขั้น 1–5`, `ร้านภายนอก A/B/C`, `กราฟิก A–D`)
คำพูดผู้ใช้เป็นการถอดความ ให้คงป้าย "(ถอดความ)"

## แก้ข้อความ

ทุกข้อความประกาศด้วย `l('ไทย', 'English')` แล้วเรียกผ่าน `t()` จาก `useLang()`
ข้อความของแต่ละ section อยู่ในไฟล์ของ feature นั้น (`const txt = { ... }` บนหัวไฟล์)
