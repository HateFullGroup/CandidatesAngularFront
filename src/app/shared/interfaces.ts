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

export interface Levels {
  tecnology_id: number
  technology: string
  level: number
}

export interface Technology {
  technology_name: string
  knowledge_level: number
}

export interface getRoot {
  count: number
  next: string
  previous: string
  results: getCandidates[]
}

export interface getCandidates {
  f_i_o: string
  birth_date: string
  description: string
  phone_number: string
  feedback: string
  place_of_employment: string
  salary: number
  job_position: string
  candidatetechnology_set: Technology[]
}
