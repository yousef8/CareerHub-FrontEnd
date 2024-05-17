import type { User } from './User'

export interface JobPost {
  id: number
  title: string
  description: string
  requirements: string
  city: string
  country: string
  min_salary: number
  max_salary: number
  min_exp_years: number
  max_exp_years: number
  expires_at: string
  status: string
  type: string
  remote_type: string
  experience_level: string
  created_at: string
  updated_at: string
  employer: User
}
