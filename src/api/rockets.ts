// fungsi buat manggil API Launch Library 2
// pake versi 2.2.0 soalnya field-nya sesuai sama yang diminta di soal

import type { Rocket } from '@/types/rocket'

const BASE_URL = 'https://lldev.thespacedevs.com/2.2.0'

export async function getRockets (): Promise<Rocket[]> {
  // mode=detailed & limit=20 wajib ada, kalo ga datanya kepotong
  const res = await fetch(
    `${BASE_URL}/config/launcher/?manufacturer__name=SpaceX&mode=detailed&limit=20`,
  )
  if (!res.ok) {
    throw new Error('Gagal ambil data rocket')
  }
  const json = await res.json()
  return json.results
}

export async function getRocketById (id: string): Promise<Rocket> {
  const res = await fetch(`${BASE_URL}/config/launcher/${id}/`)
  if (!res.ok) {
    throw new Error('Gagal ambil detail rocket')
  }
  return await res.json()
}
