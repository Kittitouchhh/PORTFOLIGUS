# Portfolio — React + Express (npm workspaces)

พอร์ตโฟลิโอส่วนตัว แยก frontend / backend / shared เป็นคนละ workspace
เนื้อหาสองภาษา ไทยเป็นหลัก สลับอังกฤษได้

## รันยังไง

```bash
npm install     # ครั้งแรกครั้งเดียว ติดตั้งให้ครบทุก workspace
npm run dev     # รัน backend (4000) + frontend (5173) พร้อมกัน
```

เปิด http://localhost:5173 — vite proxy `/api` ไปที่ backend ให้แล้ว ไม่ต้องยุ่งกับ CORS ตอน dev

| คำสั่ง | ทำอะไร |
|---|---|
| `npm run dev` | รันทั้งสองฝั่งพร้อมกัน (ใช้ concurrently) |
| `npm run dev:web` | รันเฉพาะ frontend |
| `npm run dev:api` | รันเฉพาะ backend |
| `npm run build` | typecheck + build ทั้งโปรเจกต์ |
| `npm run lint` | typecheck อย่างเดียว ทุก workspace |
| `npm run start:api` | รัน backend โหมด production |

## โครงสร้าง

```
PORTFOLIGUS/
├── package.json          workspaces + สคริปต์รวม
│
├── shared/               ⬅️ ใช้ร่วมกันสองฝั่ง ไม่มี dependency
│   └── src/
│       ├── types.ts      Lang, L, Txt, helper l()
│       ├── contact.ts    กติกาฟอร์มติดต่อ + validator + รูปแบบคำตอบ API
│       └── content/      เนื้อหาทั้งเว็บ — profile, stats, skills,
│                         process, projects, experience, learning
│
├── backend/              Express 5 + TypeScript (รันด้วย tsx ไม่ต้อง build)
│   ├── .env.example
│   ├── data/             ข้อความจากฟอร์ม (.jsonl, ไม่ commit)
│   └── src/
│       ├── index.ts      bootstrap + ปิดเซิร์ฟเวอร์ให้เรียบร้อยตอนโดนสั่งหยุด
│       ├── app.ts        ประกอบ middleware ทั้งหมด
│       ├── config/env.ts อ่าน env ทีเดียว มี default และตรวจชนิดให้
│       ├── lib/          logger, HttpError, ตัวช่วยตอบ JSON
│       ├── middleware/   errorHandler, notFound, rateLimit
│       ├── routes/       health, content, contact
│       └── services/     ตรรกะจริงอยู่ตรงนี้ route แค่รับส่ง
│
└── frontend/             React 19 + Vite 7 + Tailwind v4
    └── src/
        ├── content/      ContentProvider — ดึงเนื้อหาจาก API
        ├── i18n/         ระบบสองภาษา
        ├── lib/          api client, useTheme, useReveal, cn
        ├── components/   layout/ + ui/
        └── sections/     Hero, Stats, About, Skills, Process,
                          Work, Experience, Learning, Contact
```

## ทำไมเนื้อหาถึงอยู่ใน `shared/`

เพราะทั้งสองฝั่งต้องใช้ของชุดเดียวกัน:

- **backend** เสิร์ฟมันผ่าน `/api/content`
- **frontend** ใช้เป็นค่าตั้งต้นที่ build ติดไปกับหน้าเว็บ

ผลคือ **หน้าเว็บไม่มีวันขึ้นว่างหรือหมุนรอ** — เนื้อหาแสดงทันทีตั้งแต่เฟรมแรก
แล้ว `ContentProvider` ค่อยขอตัวล่าสุดจาก API มาทับทีหลัง
ถ้า backend ล่ม เว็บก็ยังอ่านได้ครบ แค่เป็นเนื้อหารุ่นที่ build ไว้

`validateContact()` ก็อยู่ใน `shared/` ด้วยเหตุผลเดียวกัน — frontend ตรวจก่อนส่งเพื่อให้
ผู้ใช้เห็นทันที backend ตรวจซ้ำเพราะห้ามเชื่อ client แต่ **กติกาเขียนไว้ที่เดียว**

## API

| Method | Endpoint | ทำอะไร |
|---|---|---|
| `GET` | `/api/health` | สถานะเซิร์ฟเวอร์ + uptime |
| `GET` | `/api/content` | เนื้อหาทั้งหมด |
| `GET` | `/api/content/sections` | รายชื่อ section ที่ดึงแยกได้ |
| `GET` | `/api/content/:section` | ดึงทีละส่วน เช่น `/api/content/projects` |
| `POST` | `/api/contact` | รับข้อความจากฟอร์มติดต่อ |

ทุก endpoint ตอบรูปแบบเดียวกัน:

```jsonc
{ "ok": true,  "data": { ... } }
{ "ok": false, "error": { "code": "validation_failed", "message": "...", "fields": { ... } } }
```

**ที่กันไว้แล้ว** — helmet, CORS จำกัด origin (ไม่ใช่ `*`), จำกัดขนาด body 32kb,
rate limit ฟอร์ม 5 ครั้ง/15 นาทีต่อ IP, honeypot กันบอท, `trust proxy` ตั้งเป็น `1`
ไม่ใช่ `true` เพราะ `true` เปิดช่องให้ปลอม IP ผ่าน header ได้

ตอนนี้ข้อความเก็บลงไฟล์ `.jsonl` — ถ้าจะเปลี่ยนไปส่งอีเมลหรือลง DB
**แก้แค่ฟังก์ชัน `deliver()` ใน `backend/src/services/contact.service.ts`** ที่เหลือไม่ต้องแตะ

## ดีไซน์

ธีม **Swiss editorial** — ขาวดำเกือบล้วน ตัวพาดหัวใหญ่เต็มหน้า บรรทัดที่สองเป็นตัวกลวง

| | |
|---|---|
| พาดหัว | `.display` + `.display-outline` — บรรทัดสองใช้ `-webkit-text-stroke` ทำเป็นตัวกลวง |
| ปุ่ม | `.pill` แคปซูล มี `pill-solid` (ทึบกลับสี) กับ `pill-outline` (เส้นบาง) |
| ป้าย | `.tag` / `tag-solid` / `tag-dash` — แยกระดับด้วยรูปทรง ไม่ใช้สี |
| ปุ่มกลม | `.circle-cta` — ลูกศร ↗ ลอยทับตัวอักษร hover แล้วหมุน 45° กลับสี |
| ลิงก์ | `.link-wipe` — เส้นใต้วิ่งจากซ้ายไปขวาตอน hover |
| โครง | ใช้ **เส้นบาง** แบ่งส่วนแทนกล่องทึบ ทุก section เป็นตาราง |
| สี | ขาวดำล้วน + ส้ม `#ff5a1f` จุดเดียวทั้งเว็บ ใช้เน้นเฉพาะผลลัพธ์กับ error |
| หน้ากระดาษ | มุมโค้งลอยบนพื้นเข้ม เหมือนแผ่นงานวางบนโต๊ะ |
| ตัวอักษร | Kanit 800 (พาดหัว) · Anuphan (เนื้อความ) |

**เรื่อง line-height ของพาดหัว** — ดีไซน์แบบนี้ปกติบีบบรรทัดถึง `0.85`
แต่ภาษาไทยมีสระบนกับวรรณยุกต์ซ้อนกันสองชั้น บีบขนาดนั้นแล้วหัวสระโดนตัด
เลยตั้งไว้ที่ `0.94` — ยังแน่นพอให้ดูมีพลัง แต่ไม่กินหัวตัวอักษร

**เรื่องตัวกลวง** — `-webkit-text-stroke` ตั้งความหนาเป็น `em` ไม่ใช่ `px`
เส้นขอบจะได้หนาตามขนาดตัวอักษรเวลาจอเปลี่ยนขนาด
และมี `@supports not` เผื่อเบราว์เซอร์ที่ไม่รองรับ ให้แสดงเป็นสีจางแทนตัวใส จะได้ไม่หายไปทั้งบรรทัด

**แก้พาดหัว** — อยู่ใน `shared/src/content/profile.ts` ที่ `headline`
เขียนสั้น ๆ คำเดียวหรือสองคำ ยาวกว่านั้นตัวจะเล็กลงจนไม่มีพลัง

**ใส่รูปตัวเอง** — วางไฟล์ที่ `frontend/public/avatar.png`
เอารูปที่ **ตัดพื้นหลังออกแล้ว** จะเข้าที่สุด เพราะตัวคนจะซ้อนทับตัวอักษรพอดี
ถ้าไม่มีไฟล์ พาดหัวจะจัดกลางให้เองอัตโนมัติ

โทเคนสีอยู่ใน `frontend/src/index.css` แยกชุด `:root` กับ `.dark`

> เวลาเขียนคลาสใหม่ อย่าใช้ arbitrary value ที่มี `/` ข้างใน เช่น `[background:rgb(var(--x)/0.1)]`
> Tailwind จะตีความ `/` เป็น opacity modifier แล้วคลาสหายเงียบ ๆ ไม่มี error
> ให้ประกาศเป็นตัวแปรแล้วเรียก `[background:var(--x-bg)]` แทน

## กติกาเรื่องเนื้อหา (สำคัญ)

เว็บนี้เล่า **กระบวนการทำงาน** ไม่ใช่ **ทรัพย์สินของนายจ้าง**

ห้ามใส่:
- ซอร์สโค้ด สคีมาฐานข้อมูล หรือไฟล์ config ของบริษัท
- ชื่อระบบภายใน ชื่อลูกค้า ชื่อโปรเจกต์ที่อยู่ใต้ NDA
- ภาพหน้าจอจริง ข้อมูลจริง ตัวเลขทางการเงินหรือสัญญา
- URL ภายใน ชื่อเซิร์ฟเวอร์ credential ทุกชนิด

ใส่ได้:
- บทบาทและสิ่งที่ตัวเองลงมือทำ
- วิธีเก็บ requirement / วิธีสรุปงาน / วิธีทำ mockup
- ตัวเลขเชิงปริมาณแบบปัดกลม (จำนวนเดือน จำนวนลูกค้าที่คุย จำนวนหน้าจอ)
- ผลลัพธ์เชิงคุณภาพ โดยไม่อ้างตัวเลขภายใน
- mockup ที่วาดขึ้นใหม่เอง (`components/ui/MockupFrame.tsx` เป็น wireframe จาก div ล้วน ไม่มีภาพจริง)

`shared/src/content/projects.ts` มี flag `confidential: true` ต่อเคส เพื่อให้ขึ้นป้ายและ
หมายเหตุกำกับอัตโนมัติ

## แก้เนื้อหา

ทุกข้อความที่แปลได้ประกาศด้วย `l('ไทย', 'English')`:

```ts
title: l('ระบบจัดการงานภายใน', 'Internal operations system')
```

ในคอมโพเนนต์เรียกผ่าน `t()` (ค่าจาก content) หรือ `tr()` (ข้อความ UI):

```tsx
const { t, tr } = useLang()
const { projects } = useContent()

<h3>{t(projects[0].title)}</h3>
<p>{tr('section.work.title')}</p>
```

ชื่อเทคโนโลยีที่ไม่ต้องแปล เขียนเป็น string ธรรมดาได้เลย — `t()` รับทั้งสองแบบ

### เพิ่มผลงานใหม่
เติม object ใน `shared/src/content/projects.ts` — TypeScript เตือนถ้าใส่ field ไม่ครบ
`mockup` เลือกได้ 4 แบบ: `dashboard` | `form` | `table` | `flow`
แก้ที่เดียว ทั้ง API และหน้าเว็บได้ของใหม่พร้อมกัน

### ยังต้องแก้ก่อนเอาไปใช้จริง
หา `TODO:` ใน `shared/src/content/` — มีเรื่องช่วงเวลาทำงาน ตัวเลขสถิติ และลิงก์โซเชียล
ถ้าจะแนบ CV วางไฟล์ที่ `frontend/public/cv.pdf` แล้วตั้ง `resume.enabled: true` ใน `profile.ts`

## Deploy

สองฝั่งแยกกันได้เลย

**frontend** — static ล้วน ขึ้น Vercel / Netlify / Cloudflare Pages
ตั้ง `VITE_API_URL` เป็นโดเมนของ API (ดู `frontend/.env.example`)

```bash
npm run build --workspace @portfolio/frontend   # ได้ frontend/dist/
```

**backend** — Node 20+ ที่ไหนก็ได้ (Railway / Render / VPS)
คัดลอก `backend/.env.example` เป็น `.env` แล้วตั้ง `CORS_ORIGINS` เป็นโดเมนจริงของ frontend

```bash
npm run start:api
```
