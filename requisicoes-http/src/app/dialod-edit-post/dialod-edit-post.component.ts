import { Post } from './../post.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialod-edit-post',
  templateUrl: './dialod-edit-post.component.html',
  styleUrls: ['./dialod-edit-post.component.css']
})
export class DialodEditPostComponent implements OnInit {

  post: Post = {id: null, title: '', texto: '', body: '', userId: null}

  constructor(
    public dialogRef: MatDialogRef<DialodEditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public p: Post) {
      this.post = p;
    }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

}
