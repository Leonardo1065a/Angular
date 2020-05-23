import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  readonly url: string = "https://jsonplaceholder.typicode.com";

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/posts`);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.url}/posts/${id}`);
  }

  getPostsError(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/posts/23423`);
  }
  
  getPostsDelay(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/posts`);
  }

  postPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.url}/posts`, post);
  }

  deletePost(post: Post) {
    return this.http.delete(`${this.url}/posts/${post.id}`);
  }

  patchPost(post: Post): Observable<Post>{
    return this.http.patch<Post>(`${this.url}/posts/${post.id}`, post);
  }
}
