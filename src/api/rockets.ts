// fungsi buat manggil API Launch Library 2

import type { Rocket } from '@/types/rocket'

const BASE_URL = 'https://lldev.thespacedevs.com/2.2.0'

export async function getRockets (): Promise<Rocket[]> {
  // mode=detailed & limit=20
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
