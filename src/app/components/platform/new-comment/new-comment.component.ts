import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TmpService }  from '../../../services/tmp.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {
  
  id: any;
  registerForm: FormGroup;
  submitted = false;
  object_title = "Nuevo Comentario a Publicación";
  Publication: any;

  constructor(
    private route: ActivatedRoute,
    private tmpService: TmpService,
    private formBuilder: FormBuilder,
    private ts: ToastrService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.createForm();
    this.registerForm.controls['publication_id'].setValue(this.id); 
    this.tmpService.getPublicationById(this.id).subscribe(res => {
      this.Publication = res.data;
      console.log(res.data);
    })
  }

  get f() { return this.registerForm.controls; this.submitted = false }

  createForm() {
    this.registerForm = this.formBuilder.group({
      publication_id: [''],
      text: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) { return; }
    if(this.submitted) { console.log( this.registerForm.value );
      this.tmpService.createPubComment(this.registerForm.value).subscribe( res => { console.log(res);
        // this.ts.success(res[0].message);
        this.ts.success(res.MESSAGE);
        this.registerForm.reset()
        this.submitted = false;
      })
    }
  }

}
