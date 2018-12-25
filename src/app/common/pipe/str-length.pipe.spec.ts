import { StrLengthPipe } from './str-length.pipe';

describe('StrLengthPipe', () => {
  it('create an instance', () => {
    const pipe = new StrLengthPipe();
    expect(pipe).toBeTruthy();
  });
});
