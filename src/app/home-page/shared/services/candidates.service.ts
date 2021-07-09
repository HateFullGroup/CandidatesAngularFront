import {Injectable} from "@angular/core";
import { getRoot, getTechnologiesRoot, postCandidate} from "../../../shared/interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})

export class CandidatesService {

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
