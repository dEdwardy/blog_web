import { DetailModule } from './detail.module';

describe('DetailModule', () => {
  let detailModule: DetailModule;

  beforeEach(() => {
    detailModule = new DetailModule();
  });

  it('should create an instance', () => {
    expect(detailModule).toBeTruthy();
  });
});
