import { Test } from '@nestjs/testing';

import { BcryptService } from './bcrypt.service';

describe('BcryptService', () => {
  let service: BcryptService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    service = module.get(BcryptService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  describe('hash', () => {
    it('should return a hashed password', async () => {
      const rawPassword = 'password';

      const hashedPassword = await service.hash(rawPassword);

      expect(hashedPassword).not.toEqual(rawPassword);
    });
  });

  describe('compare', () => {
    it('should return true if the hashed password is equal to the raw password', async () => {
      const rawPassword = 'password';

      const hashedPassword = await service.hash(rawPassword);

      const result = await service.compare(rawPassword, hashedPassword);

      expect(result).toBeTruthy();
    });
  });
});
