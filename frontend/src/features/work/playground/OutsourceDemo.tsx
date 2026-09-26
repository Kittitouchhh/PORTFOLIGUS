import { useState, type CSSProperties } from 'react'

/**
 * เคส 03 · ระบบติดตามงานส่งนอก — พอร์ตจาก design-handoff/design/OutsourceDemo.dc.html
 * จอคงที่ 648×640 (ป็อปอัปย่อ/ขยายด้วย scale) · ข้อมูลสมมติทั้งหมด ไม่มีข้อมูลลูกค้า
 */

type Row = {
  id: string
  name: string
  supplier: string
  total: number
  sent: number
  recv: number
  self: number
  due: number
  steps: number
  stepsSent: number
}

type Status = 'notsent' | 'wait' | 'near' | 'late' | 'done'
type Filter = Status | 'all'

const seed = (): Row[] => [
  { id: 'งาน 01', name: 'ใบงานตัวอย่าง', supplier: 'ร้านภายนอก A', total: 360, sent: 300, recv: 100, self: 60, due: 5, steps: 1, stepsSent: 1 },
  { id: 'งาน 02', name: 'ใบงานตัวอย่าง', supplier: 'ร้านภายนอก B', total: 200, sent: 200, recv: 50, self: 0, due: -4, steps: 1, stepsSent: 1 },
  { id: 'งาน 03', name: 'ใบงานตัวอย่าง', supplier: 'ร้านภายนอก C', total: 120, sent: 120, recv: 0, self: 0, due: 2, steps: 1, stepsSent: 1 },
  { id: 'งาน 04', name: 'ใบงานตัวอย่าง', supplier: 'ร้านภายนอก A', total: 400, sent: 200, recv: 200, self: 0, due: 6, steps: 2, stepsSent: 1 },
  { id: 'งาน 05', name: 'ใบงานตัวอย่าง', supplier: 'ร้านภายนอก A', total: 150, sent: 150, recv: 150, self: 0, due: 3, steps: 1, stepsSent: 1 },
  { id: 'งาน 06', name: 'ใบงานตัวอย่าง', supplier: '— ยังไม่เลือก', total: 80, sent: 0, recv: 0, self: 0, due: 8, steps: 1, stepsSent: 0 },
]

/** [key, ป้าย, สีขอบซ้าย, พื้น] */
const CARDS: [Filter, string, string, string][] = [
  ['all', 'ใบงานที่ส่ง Outsource', '#0EA5E9', '#F0F9FF'],
  ['notsent', 'ยังไม่ส่งออก', '#94A3B8', '#FFFFFF'],
  ['wait', 'อยู่ระหว่างรอรับคืน', '#38BDF8', '#FFFFFF'],
  ['near', 'ใกล้ถึงกำหนดรับคืน', '#F59E0B', '#FFFBEB'],
  ['late', 'เกินกำหนดรับคืน', '#EF4444', '#FEF2F2'],
  ['done', 'รับคืนครบถ้วน', '#10B981', '#ECFDF5'],
]

const BADGE: Record<Status, [string, string, string]> = {
  notsent: ['ยังไม่ส่งออก', '#F1F5F9', '#475569'],
  wait: ['รอรับคืน', '#E0F2FE', '#0369A1'],
  near: ['ใกล้ถึงกำหนด', '#FEF3C7', '#92400E'],
  late: ['เกินกำหนด', '#FEE2E2', '#B91C1C'],
  done: ['รับคืนครบ', '#DCFCE7', '#166534'],
}

const EDGE: Record<Status, string> = { late: '#EF4444', near: '#F59E0B', done: '#10B981', notsent: '#94A3B8', wait: '#38BDF8' }

const LEGEND: [string, string][] = [
  ['#10B981', 'รับคืนแล้ว'],
  ['#F97316', 'ค้างที่ผู้รับเหมา'],
  ['#C2410C', 'ค้างเลยกำหนด'],
  ['#6366F1', 'ผลิตเอง'],
  ['#CBD5E1', 'ยังไม่ส่ง'],
]

const stepBtn: CSSProperties = { width: 22, height: 22, borderRadius: 6, border: '1px solid #CBD5E1', background: '#FFFFFF', font: 'inherit', cursor: 'pointer' }

const actBtn = (dis: boolean, bg: string): CSSProperties => ({
  padding: '5px 10px',
  borderRadius: 7,
  border: 0,
  font: 'inherit',
  fontSize: 11,
  fontWeight: 600,
  ...(dis ? { background: '#E2E8F0', color: '#94A3B8', cursor: 'not-allowed' } : { background: bg, color: '#FFFFFF', cursor: 'pointer' }),
})

const pend = (r: Row) => Math.max(r.sent - r.recv, 0)

export function OutsourceDemo() {
  const [rows, setRows] = useState<Row[]>(seed)
  const [filter, setFilter] = useState<Status | null>(null)
  const [warn, setWarn] = useState(3)

  const status = (r: Row): Status => {
    const p = pend(r)
    if (r.sent === 0 || (p === 0 && r.stepsSent < r.steps)) return 'notsent'
    if (p === 0) return 'done'
    if (r.due < 0) return 'late'
    if (r.due <= warn) return 'near'
    return 'wait'
  }

  const counts: Record<Filter, number> = { all: rows.length, notsent: 0, wait: 0, near: 0, late: 0, done: 0 }
  rows.forEach((r) => counts[status(r)]++)

  const upd = (id: string, fn: (x: Row) => Row) => setRows((p) => p.map((x) => (x.id === id ? fn({ ...x }) : x)))
  const shown = rows.filter((r) => !filter || status(r) === filter)

  return (
    <div
      style={{
        position: 'relative',
        width: 648,
        height: 640,
        boxSizing: 'border-box',
        overflow: 'hidden',
        padding: '16px 18px',
        background: '#F8FAFC',
        color: '#0F172A',
        fontFamily: "'Anuphan', system-ui, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        textAlign: 'left',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <span style={{ fontSize: 17, fontWeight: 700 }}>ติดตามสถานะ Outsource</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', borderRadius: 9, background: '#FFFFFF', border: '1px solid #E2E8F0', fontSize: 11, color: '#475569' }}>
          <span>เตือนก่อนถึงกำหนด</span>
          <button type="button" aria-label="ลดจำนวนวันเตือน" onClick={() => setWarn((w) => Math.max(0, w - 1))} style={stepBtn}>
            −
          </button>
          <b style={{ minWidth: 14, textAlign: 'center', color: '#0F172A' }}>{warn}</b>
          <button type="button" aria-label="เพิ่มจำนวนวันเตือน" onClick={() => setWarn((w) => Math.min(60, w + 1))} style={stepBtn}>
            +
          </button>
          <span>วัน</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 6 }}>
        {CARDS.map(([key, label, edge, bg]) => {
          const on = (filter || 'all') === key
          return (
            <button
              key={key}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(key === 'all' || filter === key ? null : key)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                padding: '6px 9px',
                borderRadius: 9,
                border: '1px solid #E2E8F0',
                borderLeft: `4px solid ${edge}`,
                background: bg,
                textAlign: 'left',
                cursor: 'pointer',
                font: 'inherit',
                color: '#0F172A',
                boxShadow: on ? '0 0 0 2px #0F172A' : undefined,
              }}
            >
              <span style={{ fontSize: 10.5, fontWeight: 600, color: '#475569' }}>{label}</span>
              <span style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.1 }}>{counts[key]}</span>
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: 12, fontSize: 10, color: '#475569', flexWrap: 'wrap' }}>
        {LEGEND.map(([c, label]) => (
          <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 12, height: 7, borderRadius: 2, background: c }} />
            {label}
          </span>
        ))}
      </div>

      <div style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {shown.length === 0 && (
          <div style={{ padding: 22, borderRadius: 10, border: '1px dashed #CBD5E1', textAlign: 'center', fontSize: 12, color: '#64748B' }}>
            ไม่มีใบงานในกล่องนี้ — กดกล่องเดิมอีกครั้งเพื่อดูทั้งหมด
          </div>
        )}
        {shown.map((r) => {
          const s = status(r)
          const p = pend(r)
          const none = Math.max(r.total - r.sent - r.self, 0)
          const late = s === 'late'
          const seg = (n: number, c: string): CSSProperties => ({ display: 'block', height: '100%', width: `${(n / r.total) * 100}%`, background: c })
          const due = s === 'done' ? 'ครบแล้ว' : r.sent === 0 ? '—' : r.due < 0 ? `เกินกำหนด ${Math.abs(r.due)} วัน` : `รับคืนใน ${r.due} วัน`
          const send = () => {
            if (none > 0)
              upd(r.id, (x) => {
                x.sent += none
                x.stepsSent = x.steps
                if (x.supplier.startsWith('—')) x.supplier = 'ร้านภายนอก B'
                x.due = 5
                return x
              })
          }
          const receive = () => {
            if (p > 0)
              upd(r.id, (x) => {
                x.recv += Math.min(p, Math.ceil(x.sent / 2))
                return x
              })
          }
          return (
            <div
              key={r.id}
              style={{
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                padding: '9px 12px',
                borderRadius: 10,
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderLeft: `4px solid ${EDGE[s]}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, fontWeight: 700, color: '#0369A1' }}>{r.id}</span>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 999, background: BADGE[s][1], color: BADGE[s][2] }}>{BADGE[s][0]}</span>
                <span style={{ fontSize: 12, color: '#334155' }}>{r.name}</span>
                <span style={{ flexGrow: 1 }} />
                <span style={late ? { fontSize: 10.5, fontWeight: 700, color: '#B91C1C' } : { fontSize: 10.5, color: '#64748B' }}>{due}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10.5, color: '#64748B' }}>
                <span>{r.supplier}</span>
                <span>·</span>
                <span>ทั้งใบ {r.total}</span>
                <span>·</span>
                <span
                  style={{
                    padding: '0 6px',
                    borderRadius: 4,
                    fontWeight: 600,
                    ...(r.stepsSent < r.steps ? { background: '#FEF3C7', color: '#92400E' } : { background: '#F1F5F9', color: '#475569' }),
                  }}
                >
                  ส่งแล้ว {r.stepsSent}/{r.steps} ขั้นตอน
                </span>
              </div>
              <div style={{ display: 'flex', height: 9, borderRadius: 5, overflow: 'hidden', background: '#E2E8F0' }}>
                <span style={seg(r.recv, '#10B981')} />
                <span style={seg(p, late ? '#C2410C' : '#F97316')} />
                <span style={seg(r.self, '#6366F1')} />
                <span style={seg(none, '#CBD5E1')} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 10.5, color: '#475569', flexGrow: 1 }}>
                  ส่ง {r.sent} · รับ {r.recv} · ค้าง {p} · ผลิตเอง {r.self}
                </span>
                <button type="button" disabled={none === 0} onClick={send} style={actBtn(none === 0, '#0284C7')}>
                  → ส่งออก
                </button>
                <button type="button" disabled={p === 0} onClick={receive} style={actBtn(p === 0, '#10B981')}>
                  ← รับคืน
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingTop: 8, borderTop: '1px solid #E2E8F0' }}>
        <span style={{ fontSize: 10.5, color: '#64748B' }}>ข้อมูลสมมติ · กดเล่นได้ทุกปุ่ม</span>
        <button
          type="button"
          onClick={() => {
            setRows(seed())
            setFilter(null)
          }}
          style={{ flexShrink: 0, padding: '5px 10px', borderRadius: 8, border: '1px solid #CBD5E1', background: '#FFFFFF', font: 'inherit', fontSize: 11, fontWeight: 600, color: '#475569', cursor: 'pointer' }}
        >
          ↺ รีเซ็ต
        </button>
      </div>
    </div>
  )
}
