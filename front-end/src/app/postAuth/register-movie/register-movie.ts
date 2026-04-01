import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-movie',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-movie.html',
  styleUrl: './register-movie.scss',
})
export class RegisterMovie implements OnInit {
  movieForm!: FormGroup;
  buttonText: string = 'Register';
  productionStatusList = ['ANNOUNCED', 'PRE_PRODUCTION', 'FILMING', 'POST_PRODUCTION', 'RELEASED'];
  visibilityList = ['DRAFT', 'PRIVATE', 'PUBLISHED'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.movieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      slug: ['', [Validators.required]],
      synopsis: ['', [Validators.required]],
      genres: this.fb.array([], Validators.required),
      language: ['', [Validators.required]],
      durationMinutes: [null, [Validators.required, Validators.min(1)]],
      releaseDate: [null],

      productionStatus: ['', [Validators.required]],
      visibility: ['', [Validators.required]],

      director: [''],
      cast: this.fb.array([]),
      posterUrl: [''],
      tags: this.fb.array([]),

      isArchived: [false],
    });
  }
  ngOnInit() {
    this.addGenre();
    this.addCast();
    this.addTag();
  }

  get genres(): FormArray {
    return this.movieForm.get('genres') as FormArray;
  }

  get cast(): FormArray {
    return this.movieForm.get('cast') as FormArray;
  }

  get tags(): FormArray {
    return this.movieForm.get('tags') as FormArray;
  }

  addGenre() {
    this.genres.push(this.fb.control('', Validators.required));
  }
  removeGenre(i: number) {
    this.genres.removeAt(i);
  }

  addCast() {
    this.cast.push(this.fb.control(''));
  }
  removeCast(i: number) {
    this.cast.removeAt(i);
  }

  addTag() {
    this.tags.push(this.fb.control(''));
  }
  removeTag(i: number) {
    this.tags.removeAt(i);
  }

  onSubmit() {
    const movieData = this.movieForm.value;
  }
}
