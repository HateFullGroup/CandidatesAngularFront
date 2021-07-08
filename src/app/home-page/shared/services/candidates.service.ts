import {Injectable} from "@angular/core";
import {Tech, candidates, getCandidates, getRoot} from "../../../shared/interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})

export class CandidatesService {

  technologies: Tech[] = [
    {id: 1, technology: 'PHP', check: false, color: '#de3939'},
    {id: 2, technology: 'Python', check: false, color: '#2a73c6'},
    {id: 3, technology: 'Java', check: false, color: '#52d545'},
  ]

  candidates: candidates[] = [
    {id: 1,
      fio: 'Иванов Иван Иванович',
      date: '01.01.2021',
      technologies: [
        {technology: 'PHP', level: 1, color: '#de3939'},
        {technology: 'Python', level: 2, color: '#2a73c6'},
        {technology: 'Java', level: 3, color: '#52d545'},
      ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.' }
  ]

  private http!: HttpClient

  constructor(http: HttpClient) {
    this.http = http
  }

  getCandidates(): Observable<getRoot> {
    return this.http.get<getRoot>('http://localhost:8000/api/candidates/')
  }
}
