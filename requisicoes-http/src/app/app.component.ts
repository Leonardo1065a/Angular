import { DialodEditPostComponent } from "./dialod-edit-post/dialod-edit-post.component";
import { Post } from "./post.model";
import { PostService } from "./post.service";
import { Component } from "@angular/core";
import { Observable, Subject } from "rxjs";
import {
  delay,
  map,
  switchMap,
  takeWhile,
  filter,
} from "rxjs/operators";
import { MatSnackBarConfig, MatSnackBar, MatDialog } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  simpleReqPostObs$: Observable<Post[]>;
  postsErrorHandling: Post[];
  postsLoading: Post[];
  isLoading: boolean;
  postsNames: Post[];
  newlyPosts: Post[] = [];
  postsToDelete: Post[] = [];
  postsToEdit: Post[] = [];
  unsubscribAll$: Subject<any> = new Subject();

  constructor(
    private postService: PostService,
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  getSimplesHttpRequest() {
    this.simpleReqPostObs$ = this.postService.getPosts();
  }

  getPostsWithErrorHandling() {
    this.postService.getPostsError().subscribe(
      (res) => {
        this.postsErrorHandling = res;
      },
      (err) => {
        console.log(err);
        console.log(`Message: ${err.error}`);
        console.log(`Status code: ${err.status}`);
        let config = new MatSnackBarConfig();
        config.duration = 2000;
        config.panelClass = ["snack-error"];
        if (err.status == 0)
          this.matSnackBar.open("Could not connect to server", "", config);
        else
          this.matSnackBar.open(
            err.status == 404 ? "Error message from the server" : "",
            "",
            config
          );
      }
    );
  }

  getPostsWithErrorHandlingOk() {
    this.postService
      .getPostsDelay()
      .pipe(delay(2000))
      .subscribe((res) => {
        this.postsErrorHandling = res;
        let config = new MatSnackBarConfig();
        config.duration = 2000;
        config.panelClass = ["snack-ok"];
        this.matSnackBar.open("Posts successfuly loader!", "", config);
      });
  }

  getPostsLoading() {
    this.isLoading = true;
    this.postService
      .getPostsDelay()
      .pipe(delay(3000))
      .subscribe((res) => {
        this.postsLoading = res;
        this.isLoading = false;
      });
  }

  getPostsNames() {
    this.postService.getPosts().subscribe((res) => (this.postsNames = res));
  }

  loadname(id: number) {
    this.postService
      .getPostById(id)
      .pipe(map((p) => p.title))
      .subscribe((res) => {
        let index = this.postsNames.findIndex((p) => p.id === id);
        if (index >= 0) this.postsNames[index].texto = res;
      });
  }

  savePost(title: string, body: string, userId: number) {
    const post: Post = { title, body, userId };
    this.postService.postPost(post).subscribe(
      (res) => {
        this.newlyPosts.push(res);
        let config = new MatSnackBarConfig();
        config.duration = 2000;
        config.panelClass = ["snack-ok"];
        this.matSnackBar.open("Posts save with successfuly!", "", config);
      },
      (err) => {
        let config = new MatSnackBarConfig();
        config.duration = 2000;
        config.panelClass = ["snack-error"];
        this.matSnackBar.open("Error", "", config);
      }
    );
  }

  loadPostToDelete() {
    this.postService.getPosts().subscribe((res) => (this.postsToDelete = res));
  }

  deletePost(post: Post) {
    this.postService.deletePost(post).subscribe(
      (res) => {
        const index = this.postsToDelete.findIndex((p) => p.id == post.id);
        if (index >= 0) this.postsToDelete.splice(index, 1);
      },
      (err) => console.log(err)
    );
  }

  loadPostToEdit() {
    this.postService.getPosts().subscribe((res) => (this.postsToEdit = res));
  }

  editPost(post: Post) {
    const newPost = { ...post };
    const dialogRef = this.dialog.open(DialodEditPostComponent, {
      width: "400px",
      data: newPost,
    });

    dialogRef.afterClosed().subscribe((result: Post) => {
      console.log(result);
      if (result) {
        this.postService.patchPost(result).subscribe(
          (res: Post) => {
            const index = this.postsToEdit.findIndex((p) => (p.id = post.id));
            if (index >= 0) this.postsToEdit[index] = res;
          },
          (err) => console.error(err)
        );
      }
    });
  }

  editPostSecondOption(post: Post) {
    const newPost = { ...post };
    const dialogRef = this.dialog.open(DialodEditPostComponent, { width: "400px", data: newPost });
    let resultPost;
    
    dialogRef.afterClosed()
      .pipe(
        map((v) => { if (v != null) resultPost = v; }),
        takeWhile(() => resultPost != null),
        switchMap(() => this.postService.patchPost(resultPost))
      )
      .subscribe(
        (res: Post) => {
          const index = this.postsToEdit.findIndex((p) => (p.id = post.id));
          if (index >= 0) this.postsToEdit[index] = res;
        },
        (err) => console.error(err)
      );
  }

  editPostAula(p: Post) {
    let newProduct: Post = {...p};
    let dialogRef = this.dialog.open(DialodEditPostComponent, {width: '400px', data: newProduct});

    dialogRef.afterClosed()
      .pipe(
        filter( (prod: Post)=> prod!=undefined),
        switchMap((prod: Post) => this.postService.patchPost(prod)))
      .subscribe(
        (prod: Post,) => {
          let i = this.postsToEdit.findIndex(p=>p.id== prod.id);
          if (i>=0)
            this.postsToEdit[i] = prod;
        },
        (err) => console.error(err)
      )
}
}
