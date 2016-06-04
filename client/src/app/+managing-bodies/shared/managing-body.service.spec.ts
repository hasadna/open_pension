import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { ManagingBodyService } from './managing-body.service';

describe('ManagingBody Service', () => {
  beforeEachProviders(() => [ManagingBodyService]);

  it('should ...',
      inject([ManagingBodyService], (service: ManagingBodyService) => {
    expect(service).toBeTruthy();
  }));
});
