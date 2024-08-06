import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { BlogSearchComponent } from './blog-search.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('BlogSearchComponent', () => {
  let component: BlogSearchComponent;
  let fixture: ComponentFixture<BlogSearchComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BlogSearchComponent,
        FormsModule,
        CommonModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogSearchComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call API if category, durationFrom, or durationTo is missing', () => {
    component.category = '';
    component.durationFrom = '2023-01-01';
    component.durationTo = '2023-12-31';
    component.onSearch();
    httpMock.expectNone(component.apiURL);

    component.category = 'tech';
    component.durationFrom = '';
    component.durationTo = '2023-12-31';
    component.onSearch();
    httpMock.expectNone(component.apiURL);

    component.category = 'tech';
    component.durationFrom = '2023-01-01';
    component.durationTo = '';
    component.onSearch();
    httpMock.expectNone(component.apiURL);
  });
  it('should call API and set blogs on success', () => {
    const mockResponse: any = {
      result:
        {
          title: 'Blog 1',
          content: 'Content 1',
          authorName: 'Author 1',
          category: 'tech',
          timestamp: '2023-01-01',
        },
    }
    component.category = 'tech';
    component.durationFrom = '2023-01-01';
    component.durationTo = '2023-12-31';
    component.onSearch();

    const req = httpMock.expectOne(
      `${component.apiURL}/tech/2023-01-01/2023-12-31`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(component.blogs).toEqual(mockResponse.result);
  });

  it('should handle API error', () => {
    const mockError = { message: 'Failed to fetch blogs' };
    spyOn(console, 'log');
    spyOn(console, 'error');

    component.category = 'tech';
    component.durationFrom = '2023-01-01';
    component.durationTo = '2023-12-31';
    component.onSearch();

    const req = httpMock.expectOne(
      `${component.apiURL}/tech/2023-01-01/2023-12-31`
    );
    req.flush(mockError, { status: 500, statusText: 'Server Error' });

    expect(console.log).toHaveBeenCalledWith(
      'Failed to fetch blogs',
      jasmine.any(Object)
    );
    expect(console.error).toHaveBeenCalledWith(
      'Failed to fetch blogs',
      mockError.message
    );
  });
});
