import {Injectable} from "@angular/core";
import { getRoot, getTechnologiesRoot, postCandidate} from "../../../shared/interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})

export class CandidatesService {

  // technologies: Tech[] = [
  //   {id: 1, technology: 'PHP', check: false, color: '#de3939'},
  //   {id: 2, technology: 'Python', check: false, color: '#2a73c6'},
  //   {id: 3, technology: 'Java', check: false, color: '#52d545'},
  // ]
  // technologies: Tech[] = [
  //   {id: 1, technology: 'PHP', check: false },
  //   {id: 2, technology: 'Python', check: false },
  //   {id: 3, technology: 'Java', check: false },
  // ]

  // candidates: candidates[] = [
  //   {id: 1,
  //     f_i_o: 'Иванов Иван Иванович',
  //     birth_date: '01.01.2021',
  //     technologies: [
  //       {name: 'PHP', level: 1 },
  //       {name: 'Python', level: 2 },
  //       {name: 'Java', level: 3 },
  //     ],
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.' }
  // ]

  private http!: HttpClient

  constructor(http: HttpClient) {
    this.http = http
  }

  getCandidates(): Observable<getRoot> {
    return this.http.get<getRoot>('https://candidates-django-back.herokuapp.com/api/candidates/')
  }

  getTechnologies(): Observable<getTechnologiesRoot> {
    return this.http.get<getTechnologiesRoot>('https://candidates-django-back.herokuapp.com/api/technologies/')
  }

  postCandidate(post: postCandidate): Observable<postCandidate> {
    return this.http.post<postCandidate>('https://candidates-django-back.herokuapp.com/api/candidate/', post)
  }
}
