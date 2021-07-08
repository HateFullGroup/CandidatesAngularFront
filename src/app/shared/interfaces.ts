export interface User {
  login: string,
  password: string
}

export interface Tech {
  technology: string
  check: boolean
  color?: string
  id: number
}

export interface TechForUser {
  technology: string
  level: number
  color: string
}

export interface candidates {
  id: number
  fio: string
  date: string
  technologies: TechForUser[]
  description: string
  more?: string
}

export interface KnowledgeLevels {
  name: string
}
