export interface Rocket {
  id: string
  full_name: string
  description: string | null
  image_url: string | null
  launch_cost: string | null
  maiden_flight: string | null
  manufacturer: {
    country_code: string | null
  } | null
}

export interface NewRocketForm {
  full_name: string
  description: string
  image_url: string
  launch_cost: string
  country_code: string
  maiden_flight: string
}
