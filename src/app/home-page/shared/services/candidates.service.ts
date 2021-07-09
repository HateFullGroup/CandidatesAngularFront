import {Injectable} from "@angular/core";
import {getRootCandidates, getTechnologiesRoot, postAddTechnology, postCandidate} from "../../../shared/interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})

export class CandidatesService {

  private http!: HttpClient

  constructor(http: HttpClient) {
    this.http = http
  }

  getCandidates(): Observable<getRootCandidates> {
    return this.http.get<getRootCandidates>('https://candidates-django-back.herokuapp.com/api/candidates/')
  }

  getTechnologies(): Observable<getTechnologiesRoot> {
    return this.http.get<getTechnologiesRoot>('https://candidates-django-back.herokuapp.com/api/technologies/')
  }

  postCandidate(post: postCandidate): Observable<postCandidate> {
    return this.http.post<postCandidate>('https://candidates-django-back.herokuapp.com/api/candidate/', post)
  }

  postTechnology(post: any): Observable<postAddTechnology> {
    return this.http.post<postAddTechnology>('https://candidates-django-back.herokuapp.com/api/technology/', post)
  }

  putTechnology(put: any, id: number): Observable<postAddTechnology> {
    return this.http.put<postAddTechnology>(`https://candidates-django-back.herokuapp.com/api/technology/${id}`, put)
  }
}
