import { useState, type CSSProperties } from 'react'

/**
 * เคส 01 · บันทึกขั้นตอนการผลิต — port จาก design-handoff/design/TrackingDemo.dc.html
 * จอตายตัว 648×640 (ป็อปอัป/ตัวอย่างจะ scale เอง) · ข้อมูลสมมติทั้งหมด ไม่มีชื่อลูกค้า/เลขใบงานจริง
 */

type Dept = 'CUT' | 'PRINT' | 'SEW' | 'QC' | 'PACK' | 'EMB'
type Status = 'waiting' | 'myturn' | 'chase' | 'mydone' | 'alldone'
type Step = { dept: Dept; done: number; outsource: boolean }
type Job = { id: string; name: string; total: number; dueIn: number; steps: Step[] }

const TT_LABEL: Record<Dept, string> = { CUT: 'ขั้น 1', PRINT: 'ขั้น 2', SEW: 'ขั้น 3', QC: 'ขั้น 4', PACK: 'ขั้น 5', EMB: 'ส่งนอก' }

const TT_SEED: { id: string; total: number; dueIn: number; steps: [Dept, number, boolean?][] }[] = [
  { id: 'งาน 01', total: 1200, dueIn: -3, steps: [['CUT', 1200], ['PRINT', 1200], ['SEW', 640], ['QC', 0], ['PACK', 0]] },
  { id: 'งาน 02', total: 500, dueIn: 6, steps: [['CUT', 500], ['EMB', 300, true], ['SEW', 0], ['PACK', 0]] },
  { id: 'งาน 03', total: 3000, dueIn: 14, steps: [['CUT', 0], ['PRINT', 0], ['SEW', 0], ['PACK', 0]] },
  { id: 'งาน 04', total: 240, dueIn: 2, steps: [['CUT', 240], ['SEW', 180], ['QC', 120], ['PACK', 60]] },
  { id: 'งาน 05', total: 800, dueIn: 9, steps: [['CUT', 800], ['PRINT', 800], ['SEW', 800], ['PACK', 800]] },
  { id: 'งาน 06', total: 150, dueIn: -1, steps: [['CUT', 150], ['PRINT', 40], ['SEW', 0], ['PACK', 0]] },
]

const ttClone = (): Job[] =>
  TT_SEED.map((j) => ({
    id: j.id,
    name: 'ใบงานตัวอย่าง',
    total: j.total,
    dueIn: j.dueIn,
    steps: j.steps.map(([dept, done, out]) => ({ dept, done, outsource: !!out })),
  }))

const stepIndex = (job: Job, dept: Dept) => {
  let i = -1
  job.steps.forEach((s, k) => {
    if (s.dept === dept) i = k
  })
  return i
}

function ttClassify(job: Job, dept: Dept): Status | null {
  const i = stepIndex(job, dept)
  if (i < 0) return null
  if (job.steps.every((s) => s.done >= job.total)) return 'alldone'
  if (job.steps[i].done >= job.total) return 'mydone'
  if (job.steps.slice(i + 1).some((s) => s.done > 0)) return 'chase'
  if (i === 0 || job.steps[i - 1].done > 0) return 'myturn'
  return 'waiting'
}

const TT_BOX: { key: Status; title: string; edge: string; bg: string }[] = [
  { key: 'waiting', title: 'ยังไม่ถึงคิว', edge: '#94A3B8', bg: '#FFFFFF' },
  { key: 'myturn', title: 'ถึงคิวแล้ว', edge: '#0EA5E9', bg: '#F0F9FF' },
  { key: 'chase', title: 'ต้องตามเก็บ', edge: '#F97316', bg: '#FFF7ED' },
  { key: 'mydone', title: 'แผนกคุณเสร็จแล้ว', edge: '#FBBF24', bg: '#FFFBEB' },
  { key: 'alldone', title: 'เสร็จทุกขั้นตอน', edge: '#10B981', bg: '#ECFDF5' },
]

const TABS: Dept[] = ['CUT', 'PRINT', 'SEW', 'PACK']

export function TrackingDemo() {
  const [dept, setDept] = useState<Dept>('SEW')
  const [jobs, setJobs] = useState<Job[]>(ttClone)
  const [filter, setFilter] = useState<Status | null>(null)
  const [open, setOpen] = useState<string | null>('งาน 01')

  const rows: { job: Job; status: Status }[] = []
  jobs.forEach((job) => {
    const s = ttClassify(job, dept)
    if (s) rows.push({ job, status: s })
  })
  const counts: Record<Status, number> = { waiting: 0, myturn: 0, chase: 0, mydone: 0, alldone: 0 }
  rows.forEach((r) => counts[r.status]++)
  const overdue = rows.filter((r) => r.job.dueIn < 0 && r.status !== 'mydone' && r.status !== 'alldone').length
  const visible = rows.filter((r) => !filter || r.status === filter).sort((a, b) => a.job.dueIn - b.job.dueIn)

  const record = (id: string) =>
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id !== id) return j
        const i = stepIndex(j, dept)
        const cap = i === 0 ? j.total : j.steps[i - 1].done
        return { ...j, steps: j.steps.map((s, idx) => (idx !== i ? s : { ...s, done: Math.min(cap, s.done + Math.ceil(j.total / 4)) })) }
      }),
    )

  return (
    <div style={S.root}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 18, fontWeight: 700 }}>บันทึกขั้นตอนการผลิต</span>
          <span style={{ fontSize: 12, color: '#64748B' }}>ตัวอย่างหน้าจอ · ย่อรายละเอียดแล้ว</span>
        </div>
        <div role="tablist" aria-label="เลือกแผนก" style={{ display: 'flex', gap: 4, padding: 4, borderRadius: 10, background: '#E2E8F0' }}>
          {TABS.map((d) => {
            const on = d === dept
            return (
              <button
                key={d}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => {
                  setDept(d)
                  setFilter(null)
                }}
                style={{
                  border: 0,
                  borderRadius: 7,
                  padding: '6px 12px',
                  font: 'inherit',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  ...(on ? { background: '#FFFFFF', color: '#0369A1', boxShadow: '0 1px 2px rgba(0,0,0,.08)' } : { background: 'transparent', color: '#64748B' }),
                }}
              >
                {TT_LABEL[d]}
              </button>
            )
          })}
        </div>
      </div>

      {overdue > 0 && (
        <button type="button" onClick={() => setFilter(null)} style={S.overdue}>
          <span style={S.bang}>!</span>
          <span style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#B91C1C' }}>ใบที่เลยกำหนดส่ง {overdue}</span>
            <span style={{ fontSize: 11, color: '#B91C1C' }}>ต้องเร่งก่อน</span>
          </span>
        </button>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 6 }}>
        {TT_BOX.map((b) => {
          const on = filter === b.key
          const dim = !!filter && !on
          return (
            <button
              key={b.key}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(filter === b.key ? null : b.key)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                padding: '8px 9px',
                borderRadius: 9,
                border: '1px solid #E2E8F0',
                borderLeft: `4px solid ${b.edge}`,
                background: b.bg,
                textAlign: 'left',
                cursor: 'pointer',
                font: 'inherit',
                color: '#0F172A',
                boxShadow: on ? '0 0 0 2px #0F172A' : undefined,
                opacity: dim ? 0.5 : undefined,
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 600, color: '#475569' }}>{b.title}</span>
              <span style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.1 }}>{counts[b.key]}</span>
            </button>
          )
        })}
      </div>

      <div style={{ flexGrow: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, paddingRight: 2 }}>
        {visible.length === 0 && <div style={S.empty}>ไม่มีใบงานในกล่องนี้ — กดกล่องเดิมอีกครั้งเพื่อดูทั้งหมด</div>}
        {visible.map(({ job, status }) => {
          const box = TT_BOX.find((b) => b.key === status)!
          const isOpen = open === job.id
          const late = job.dueIn < 0 && status !== 'alldone'
          const can = status === 'myturn' || status === 'chase'
          return (
            <div key={job.id} style={{ flexShrink: 0, borderRadius: 10, border: '1px solid #E2E8F0', borderLeft: `4px solid ${late ? '#EF4444' : box.edge}`, background: '#FFFFFF' }}>
              <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : job.id)} style={S.rowHead}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: box.edge }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: '#0369A1' }}>{job.id}</span>
                <span style={{ fontSize: 13, color: '#334155' }}>{job.name}</span>
                <span style={{ flexGrow: 1 }} />
                <span style={late ? S.dueLate : S.due}>{late ? `เลยกำหนด ${Math.abs(job.dueIn)} วัน` : `ส่งใน ${job.dueIn} วัน`}</span>
                <span style={{ color: '#94A3B8', display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : undefined }}>⌄</span>
              </button>
              {isOpen && (
                <div style={{ borderTop: '1px solid #F1F5F9', padding: '10px 14px 12px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', overflowX: 'auto' }}>
                    {job.steps.map((s, idx) => {
                      const pct = Math.round((s.done / job.total) * 100)
                      const mine = s.dept === dept
                      const skin: CSSProperties = s.outsource
                        ? { border: '1px dashed #FBBF24', background: '#FFFBEB' }
                        : mine
                          ? { border: '1px solid #0EA5E9', background: '#F0F9FF', boxShadow: '0 0 0 3px rgba(14,165,233,.15)' }
                          : { border: '1px solid #E2E8F0', background: '#FFFFFF' }
                      return (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          {idx > 0 && <span style={{ color: '#CBD5E1' }}>›</span>}
                          <div style={{ width: 104, flexShrink: 0, boxSizing: 'border-box', padding: 7, borderRadius: 7, display: 'flex', flexDirection: 'column', ...skin }}>
                            <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, fontWeight: 700, letterSpacing: '.06em', color: '#94A3B8' }}>
                              <span />
                              {s.outsource && <span style={{ padding: '0 4px', borderRadius: 3, background: '#FDE68A', color: '#92400E' }}>ส่งนอก</span>}
                            </span>
                            <span style={{ fontSize: 11, fontWeight: 600, color: '#334155' }}>{TT_LABEL[s.dept]}</span>
                            <span style={{ display: 'block', height: 6, borderRadius: 3, background: '#F1F5F9', overflow: 'hidden', marginTop: 4 }}>
                              <span style={{ display: 'block', height: 6, borderRadius: 3, width: `${pct}%`, background: pct >= 100 ? '#10B981' : mine ? '#0EA5E9' : '#94A3B8' }} />
                            </span>
                            <span style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>
                              {s.done.toLocaleString()}/{job.total.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      disabled={!can}
                      onClick={() => can && record(job.id)}
                      style={{
                        border: 0,
                        borderRadius: 7,
                        padding: '7px 12px',
                        font: 'inherit',
                        fontSize: 12,
                        fontWeight: 600,
                        ...(can ? { background: '#0284C7', color: '#FFFFFF', cursor: 'pointer' } : { background: '#E2E8F0', color: '#94A3B8', cursor: 'not-allowed' }),
                      }}
                    >
                      บันทึกยอด +25%
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingTop: 10, borderTop: '1px solid #E2E8F0' }}>
        <span style={{ fontSize: 11, color: '#64748B' }}>ลองกด "บันทึกยอด" แล้วดูใบงานย้ายสถานะ</span>
        <button
          type="button"
          onClick={() => {
            setJobs(ttClone())
            setFilter(null)
          }}
          style={S.reset}
        >
          ↺ รีเซ็ตข้อมูล
        </button>
      </div>
    </div>
  )
}

const S = {
  root: {
    position: 'relative',
    width: 648,
    height: 640,
    boxSizing: 'border-box',
    overflow: 'hidden',
    padding: 18,
    background: '#F8FAFC',
    color: '#0F172A',
    fontFamily: "'Anuphan', system-ui, sans-serif",
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    textAlign: 'left',
  },
  overdue: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid #FECACA',
    background: '#FEF2F2',
    textAlign: 'left',
    cursor: 'pointer',
    font: 'inherit',
  },
  bang: {
    flexShrink: 0,
    width: 28,
    height: 28,
    borderRadius: '50%',
    background: '#EF4444',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: 14,
  },
  empty: { padding: 24, borderRadius: 10, border: '1px dashed #CBD5E1', textAlign: 'center', fontSize: 12, color: '#64748B' },
  rowHead: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    padding: '10px 14px',
    border: 0,
    background: 'transparent',
    textAlign: 'left',
    cursor: 'pointer',
    font: 'inherit',
  },
  due: { fontSize: 10, color: '#94A3B8' },
  dueLate: { fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: '#EF4444', color: '#FFFFFF' },
  reset: {
    flexShrink: 0,
    padding: '6px 10px',
    borderRadius: 8,
    border: '1px solid #CBD5E1',
    background: '#FFFFFF',
    font: 'inherit',
    fontSize: 11,
    fontWeight: 600,
    color: '#475569',
    cursor: 'pointer',
  },
} satisfies Record<string, CSSProperties>
