export interface User {
  username: string,
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
  f_i_o: string
  birth_date: string
  technologies: Technology[]
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
  name: string
  level: number

}

export interface getRoot {
  results: getCandidates[]
  count: number
  next: string
  previous: string
}



export interface getTechnologiesRoot {
  results: getTechnologies[]
  count: number
  next: string
  previous: string
}

export interface getCandidates {
  id: number
  f_i_o: string
  birth_date: string
  added_at?: string
  description: string
  phone_number: string
  feedback: string
  place_of_employment: string
  salary: number
  job_position: string
  candidatetechnology_set: Technology[]
}

export interface getTechnologies {
  id: number
  name: string
  check?: boolean
}