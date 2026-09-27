import { useSyncExternalStore } from 'react'

/** จอคอม = กว้าง ≥ 1100px (ตรงกับ lg ใน index.css) — ใช้เลือกชุดหน้าตา desktop (เดิม) / มือถือ-ไอแพด (v8) */
const QUERY = '(min-width: 1100px)'

const subscribe = (onChange: () => void) => {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

export function useIsDesktop() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => true)
}
