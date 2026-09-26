import { useState, type CSSProperties } from 'react'

/**
 * เคส 02 · ระบบแบ่งงานทีมกราฟิก — พอร์ตจาก design-handoff/design/GraphicDemo.dc.html
 * จอคงที่ 648×640 · แถบคนเลื่อนวนเอง (grMarquee ใน index.css) · ใบงานกางออกเป็น 5 ขั้น → มอบหมาย → เสร็จ?
 * ข้อมูลสมมติทั้งหมด (งาน 01…, กราฟิก A–D)
 */

type PersonId = 'A' | 'B' | 'C' | 'D'
/** [id, ชื่อ, สีหลัก, สีพื้น] */
type Person = [PersonId, string, string, string]
type Step = { who: PersonId | null; done: boolean }
type Job = { id: string; isNew: boolean; steps: Step[] }
type Filter = 'fresh' | 'open' | 'doing' | 'done'

const PEOPLE: Person[] = [
  ['A', 'กราฟิก A', '#24C0A9', '#E6F8F5'],
  ['B', 'กราฟิก B', '#008CE1', '#E6F3FC'],
  ['C', 'กราฟิก C', '#8B5CF6', '#F1ECFE'],
  ['D', 'กราฟิก D', '#F97316', '#FFF1E6'],
]
const DONE_BASE: Record<PersonId, number> = { A: 43, B: 41, C: 38, D: 31 }
const STEPS = ['ออกแบบ', 'อนุมัติแบบ', 'จัดไฟล์พิมพ์', 'จัดไฟล์ตัด', 'ตรวจไฟล์']

const st5 = (a: [PersonId?, 1?][]): Step[] => a.map((x) => ({ who: x[0] ?? null, done: !!x[1] }))
const seed = (): Job[] => [
  { id: 'งาน 01', isNew: true, steps: st5([[], [], [], [], []]) },
  { id: 'งาน 02', isNew: false, steps: st5([['A', 1], ['B'], [], [], []]) },
  { id: 'งาน 03', isNew: false, steps: st5([['B', 1], ['B', 1], ['C', 1], ['D', 1], ['A', 1]]) },
  { id: 'งาน 04', isNew: true, steps: st5([['C'], [], [], [], []]) },
  { id: 'งาน 05', isNew: false, steps: st5([['D', 1], ['A', 1], ['C'], [], []]) },
]

const CARDS: [Filter, string, string, string][] = [
  ['fresh', 'งานใหม่วันนี้', '#F43F5E', '#FFF1F2'],
  ['open', 'ยังไม่มอบหมาย', '#F97316', '#FFF7ED'],
  ['doing', 'กำลังทำ', '#008CE1', '#EFF8FF'],
  ['done', 'เสร็จสิ้นแล้ว', '#24C0A9', '#ECFBF8'],
]
const TABS = ['มอบหมายงานกราฟิก', 'ภาระงานรายบุคคล']
const PODIUM_H = [150, 118, 96, 76]

const person = (id: PersonId | null) => PEOPLE.find((p) => p[0] === id) ?? null

const av = (p: Person, s: number): CSSProperties => ({
  width: s,
  height: s,
  flexShrink: 0,
  borderRadius: '50%',
  background: p[3],
  color: p[2],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: Math.round(s * 0.42),
  fontWeight: 800,
})

const blueBtn: CSSProperties = {
  background: 'linear-gradient(180deg, #0EA5E9, #0284C7)',
  color: '#FFFFFF',
  boxShadow: '0 1px 2px rgba(2,132,199,.35)',
  cursor: 'pointer',
}

const jobState = (j: Job): 'open' | 'doing' | 'done' => {
  if (j.steps.every((s) => s.done)) return 'done'
  if (j.steps.some((s) => s.who && !s.done)) return 'doing'
  return 'open'
}

export function GraphicDemo() {
  const [tab, setTab] = useState(0)
  const [jobs, setJobs] = useState<Job[]>(seed)
  const [filter, setFilter] = useState<Filter | null>(null)
  const [open, setOpen] = useState<string | null>('งาน 02')
  const [dlg, setDlg] = useState<{ jid: string; idx: number } | null>(null)
  const [picked, setPicked] = useState<PersonId | null>(null)

  const all = jobs.flatMap((j) => j.steps)
  const doing = (pid: PersonId) => all.filter((s) => s.who === pid && !s.done).length
  const load = (pid: PersonId) => doing(pid) * 2

  const people = PEOPLE.map((p) => ({ p, doing: doing(p[0]), points: load(p[0]) }))
  const loop = [...people, ...people]

  const counts: Record<Filter, number> = { fresh: 0, open: 0, doing: 0, done: 0 }
  let unassigned = 0
  jobs.forEach((j) => {
    counts[jobState(j)]++
    if (j.isNew) counts.fresh++
    if (j.steps.some((x) => !x.who)) unassigned++
  })

  const setStep = (jid: string, idx: number, patch: Partial<Step>) =>
    setJobs((prev) => prev.map((j) => (j.id !== jid ? j : { id: j.id, isNew: false, steps: j.steps.map((s, k) => (k === idx ? { ...s, ...patch } : s)) })))

  const rows = jobs.filter((j) => !filter || (filter === 'fresh' ? j.isNew : jobState(j) === filter))

  const order = PEOPLE.map((p) => ({ p, pts: DONE_BASE[p[0]] + all.filter((s) => s.who === p[0] && s.done).length * 2 })).sort((a, b) => b.pts - a.pts)
  const podium = [order[1], order[0], order[2], order[3]].map((x) => ({ ...x, rank: order.indexOf(x) + 1 }))

  const pickList = PEOPLE.map((p) => ({ p, pts: load(p[0]) })).sort((a, b) => a.pts - b.pts)
  const noPerson = !picked

  const confirm = () => {
    if (!picked || !dlg) return
    const d = dlg
    setDlg(null)
    setStep(d.jid, d.idx, { who: picked })
  }

  return (
    <div
      style={{
        position: 'relative',
        width: 648,
        height: 640,
        boxSizing: 'border-box',
        overflow: 'hidden',
        background: '#F6F7F9',
        color: '#0A0A0A',
        fontFamily: "'Noto Sans Thai', system-ui, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
      }}
    >
      {/* top bar */}
      <div style={{ flexShrink: 0, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,0,0,.06)' }}>
        <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.02em' }}>Graphic Board</span>
        <span style={{ fontSize: 11, color: '#24C0A9', fontWeight: 600 }}>หัวหน้าทีม</span>
      </div>

      <div style={{ flexGrow: 1, minHeight: 0, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <span style={{ fontSize: 18, fontWeight: 800 }}>แบ่งงานทีมกราฟิก</span>
          <span style={{ fontSize: 10.5, color: '#737373' }}>มอบหมายงานและดูภาระงานของทีมในที่เดียว</span>
        </div>

        {/* people strip */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6, padding: 7, borderRadius: 10, background: '#FFFFFF', overflow: 'hidden' }}>
          <span
            style={{
              position: 'relative',
              zIndex: 2,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '4px 9px',
              borderRadius: 999,
              border: '1px solid #FDBA74',
              background: '#FFF7ED',
              fontSize: 10.5,
              fontWeight: 700,
              color: '#C2410C',
              boxShadow: '8px 0 8px #FFFFFF',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F97316' }} />
            รอมอบหมาย {unassigned}
          </span>
          <div
            style={{
              flexGrow: 1,
              minWidth: 0,
              overflow: 'hidden',
              WebkitMaskImage: 'linear-gradient(to right, transparent, #000 18px, #000 calc(100% - 18px), transparent)',
              maskImage: 'linear-gradient(to right, transparent, #000 18px, #000 calc(100% - 18px), transparent)',
            }}
          >
            <div style={{ display: 'flex', gap: 6, width: 'max-content', animation: 'grMarquee 16s linear infinite' }}>
              {loop.map(({ p, doing: n, points }, k) => (
                <span
                  key={k}
                  aria-hidden={k >= people.length || undefined}
                  style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5, padding: '3px 8px 3px 3px', borderRadius: 999, background: p[3], border: `1px solid ${p[2]}40` }}
                >
                  <span style={av(p, 20)}>{p[0]}</span>
                  <span style={{ fontSize: 10.5, fontWeight: 700 }}>{p[1]}</span>
                  <span style={{ fontSize: 9.5, color: '#525252' }}>ทำ {n} ขั้น</span>
                  <span style={{ padding: '1px 6px', borderRadius: 999, background: '#FFFFFF', border: '1px solid #E5E5E5', fontSize: 9.5, fontWeight: 700, color: '#B45309' }}>★ {points}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* tabs */}
        <div role="tablist" aria-label="มุมมอง" style={{ alignSelf: 'flex-start', display: 'flex', gap: 2, padding: 3, borderRadius: 9, background: '#EBEDF0' }}>
          {TABS.map((label, k) => {
            const on = tab === k
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setTab(k)}
                style={{
                  border: 0,
                  borderRadius: 7,
                  padding: '5px 12px',
                  font: 'inherit',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  ...(on ? { background: '#FFFFFF', color: '#0A0A0A', boxShadow: '0 1px 2px rgba(0,0,0,.08)' } : { background: 'transparent', color: '#737373' }),
                }}
              >
                {label}
              </button>
            )
          })}
        </div>

        {tab === 0 && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 6 }}>
              {CARDS.map(([key, label, c, bg]) => {
                const on = filter === key
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFilter(on ? null : key)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      padding: '7px 9px',
                      borderRadius: 9,
                      border: `1px solid ${c}40`,
                      borderLeft: `4px solid ${c}`,
                      background: bg,
                      textAlign: 'left',
                      cursor: 'pointer',
                      font: 'inherit',
                      color: '#0A0A0A',
                      boxShadow: on ? `0 0 0 2px ${c}` : undefined,
                    }}
                  >
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: c }}>{label}</span>
                    <span style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                      <span style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.1 }}>{counts[key]}</span>
                      <span style={{ fontSize: 10, color: c }}>ใบ</span>
                    </span>
                  </button>
                )
              })}
            </div>
            <div style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', borderRadius: 10, background: '#FFFFFF', borderTop: '3px solid #008CE1', boxShadow: '0 1px 3px rgba(0,0,0,.06)' }}>
              <div style={{ padding: '9px 12px 6px', fontSize: 12, fontWeight: 800 }}>ใบสั่งงานผลิตที่ยังดำเนินการอยู่</div>
              {rows.map((j) => {
                const isOpen = open === j.id
                const left = j.steps.filter((s) => !s.who).length
                return (
                  <div key={j.id} style={{ borderTop: '1px solid #F0F0F0' }}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : j.id)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: 0, background: isOpen ? '#F8FBFF' : '#FFFFFF', font: 'inherit', cursor: 'pointer', textAlign: 'left' }}
                    >
                      <span style={{ fontSize: 11.5, fontWeight: 800, color: '#006CE0' }}>{j.id}</span>
                      {j.isNew && <span style={{ fontSize: 8.5, fontWeight: 800, padding: '0 5px', borderRadius: 4, background: '#EF4444', color: '#FFFFFF' }}>NEW</span>}
                      <span style={{ fontSize: 10, color: '#737373' }}>ใบงานตัวอย่าง</span>
                      <span style={{ marginLeft: 'auto', fontSize: 9.5, fontWeight: 700, padding: '1px 8px', borderRadius: 999, background: '#FFF1E6', color: '#C2410C' }}>
                        {left ? `รอมอบหมาย ${left} ขั้น` : 'มอบหมายครบ'}
                      </span>
                      <span style={{ color: '#A3A3A3', display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : undefined }}>⌄</span>
                    </button>
                    {isOpen && (
                      <div style={{ display: 'flex', alignItems: 'stretch', gap: 3, padding: '6px 10px 10px', overflowX: 'auto' }}>
                        {j.steps.map((s, k) => {
                          const p = person(s.who)
                          const pct = s.done ? 100 : s.who ? 45 : 0
                          return (
                            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                              {k > 0 && <span style={{ color: '#D4D4D4', fontSize: 11 }}>›</span>}
                              <div
                                style={{
                                  width: 104,
                                  flexShrink: 0,
                                  boxSizing: 'border-box',
                                  padding: '6px 7px',
                                  borderRadius: 8,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 3,
                                  border: `1px solid ${s.done ? '#BBE5CC' : s.who ? '#B9DDF7' : '#E5E5E5'}`,
                                  background: s.done ? '#F3FBF7' : s.who ? '#F5FAFE' : '#FFFFFF',
                                }}
                              >
                                <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '.04em', color: '#A3A3A3' }}>ขั้น {k + 1}</span>
                                <span style={{ fontSize: 10.5, fontWeight: 800 }}>{STEPS[k]}</span>
                                <span style={{ display: 'block', height: 4, borderRadius: 2, background: '#F0F0F0', overflow: 'hidden' }}>
                                  <span style={{ display: 'block', height: 4, width: `${pct}%`, background: s.done ? '#198754' : '#008CE1' }} />
                                </span>
                                <span style={{ fontSize: 9, color: '#737373' }}>{s.done ? 'เสร็จแล้ว' : s.who ? 'กำลังทำ' : 'ยังไม่มอบหมาย'}</span>
                                {!s.who && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setDlg({ jid: j.id, idx: k })
                                      setPicked(null)
                                    }}
                                    style={{ marginTop: 2, padding: '4px 0', borderRadius: 6, border: 0, font: 'inherit', fontSize: 9.5, fontWeight: 700, ...blueBtn }}
                                  >
                                    + มอบหมาย
                                  </button>
                                )}
                                {p && !s.done && (
                                  <button
                                    type="button"
                                    onClick={() => setStep(j.id, k, { done: true })}
                                    style={{
                                      marginTop: 2,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      gap: 4,
                                      padding: '2px 0',
                                      borderRadius: 999,
                                      border: `1px solid ${p[2]}60`,
                                      background: p[3],
                                      color: p[2],
                                      font: 'inherit',
                                      fontSize: 9.5,
                                      fontWeight: 800,
                                      cursor: 'pointer',
                                    }}
                                  >
                                    <span style={av(p, 14)}>{p[0]}</span>
                                    เสร็จ?
                                  </button>
                                )}
                                {s.done && <span style={{ marginTop: 2, fontSize: 9.5, fontWeight: 800, color: '#198754', textAlign: 'center' }}>✓ {p?.[1]}</span>}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}

        {tab === 1 && (
          <div style={{ flexGrow: 1, minHeight: 0, borderRadius: 10, background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,0,0,.06)', padding: '12px 14px', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 12, fontWeight: 800 }}>อันดับผลงานทีมกราฟิก · พอยท์ที่ทำเสร็จ</span>
            <div style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 18, paddingTop: 10 }}>
              {podium.map(({ p, pts, rank }) => (
                <div key={p[0]} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 104 }}>
                  {rank === 1 && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="อันดับ 1">
                      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
                      <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
                    </svg>
                  )}
                  <span style={{ fontSize: 11, fontWeight: 800, padding: '2px 9px', borderRadius: 999, background: p[3], color: p[2] }}>{pts} พอยท์</span>
                  <span style={av(p, 38)}>{p[0]}</span>
                  <span style={{ fontSize: 11, fontWeight: 700 }}>{p[1]}</span>
                  <span
                    style={{
                      width: 72,
                      height: PODIUM_H[rank - 1],
                      borderRadius: '8px 8px 0 0',
                      background: p[2],
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      paddingTop: 10,
                      boxSizing: 'border-box',
                      fontSize: 18,
                      fontWeight: 800,
                    }}
                  >
                    {rank}
                  </span>
                </div>
              ))}
            </div>
            <span style={{ marginTop: 8, fontSize: 10, color: '#737373', textAlign: 'center' }}>หัวหน้าเห็นภาพรวมทั้งทีมก่อนแจกงานรอบถัดไป</span>
          </div>
        )}
      </div>

      {/* assign dialog */}
      {dlg && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div role="dialog" aria-label="มอบหมายงาน" style={{ width: 400, boxSizing: 'border-box', borderRadius: 14, background: '#FFFFFF', overflow: 'hidden', boxShadow: '0 20px 40px -10px rgba(0,0,0,.35)' }}>
            <div style={{ padding: '12px 16px', background: 'linear-gradient(to right, #24C0A9, #008CE1, #006CE0)', color: '#FFFFFF' }}>
              <span style={{ fontSize: 14, fontWeight: 800 }}>
                มอบหมาย {dlg.jid} · ขั้น {dlg.idx + 1} {STEPS[dlg.idx]}
              </span>
            </div>
            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#525252' }}>เลือกคนทำขั้นนี้</span>
              {pickList.map(({ p, pts }, i) => {
                const on = picked === p[0]
                const pct = Math.min(100, Math.round((pts / 10) * 100))
                const level = pts <= 2 ? 'ว่าง' : pts <= 6 ? 'ปานกลาง' : 'งานเยอะ'
                const lc = pts <= 2 ? '#047857' : pts <= 6 ? '#B45309' : '#B91C1C'
                const bc = pts <= 2 ? '#24C0A9' : pts <= 6 ? '#F59E0B' : '#EF4444'
                return (
                  <button
                    key={p[0]}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setPicked(p[0])}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '7px 10px',
                      borderRadius: 10,
                      font: 'inherit',
                      cursor: 'pointer',
                      background: '#FFFFFF',
                      border: on ? '2px solid #008CE1' : '1px solid #E5E5E5',
                    }}
                  >
                    <span style={av(p, 26)}>{p[0]}</span>
                    <span style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 3, textAlign: 'left' }}>
                      <span style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 11.5, fontWeight: 700 }}>
                        {p[1]}
                        {i === 0 && <span style={{ fontSize: 9, fontWeight: 800, padding: '0 6px', borderRadius: 999, background: '#D1FAE5', color: '#047857' }}>ว่างสุด</span>}
                      </span>
                      <span style={{ display: 'block', height: 5, borderRadius: 3, background: '#F1F5F9', overflow: 'hidden' }}>
                        <span style={{ display: 'block', height: 5, borderRadius: 3, width: `${pct}%`, background: bc }} />
                      </span>
                    </span>
                    <span style={{ flexShrink: 0, fontSize: 10.5, fontWeight: 700, color: lc }}>{level}</span>
                  </button>
                )
              })}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
                <button
                  type="button"
                  onClick={() => setDlg(null)}
                  style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #E5E5E5', background: '#FFFFFF', font: 'inherit', fontSize: 11.5, fontWeight: 600, color: '#525252', cursor: 'pointer' }}
                >
                  ยกเลิก
                </button>
                <button
                  type="button"
                  disabled={noPerson}
                  onClick={confirm}
                  style={{
                    padding: '7px 16px',
                    borderRadius: 6,
                    border: 0,
                    font: 'inherit',
                    fontSize: 11.5,
                    fontWeight: 700,
                    ...(noPerson ? { background: '#E5E5E5', color: '#A3A3A3', cursor: 'not-allowed' } : blueBtn),
                  }}
                >
                  ยืนยัน
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
