type ClassValue = string | false | null | undefined

/** รวม className แบบง่าย ๆ ไม่ต้องพึ่ง lib ภายนอก */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
