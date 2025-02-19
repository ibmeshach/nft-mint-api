import { Test, TestingModule } from '@nestjs/testing';
import { NftsController } from './nfts.controller';
import { NftsService } from './nfts.service';
import { HttpStatus } from '@nestjs/common';

describe('NftsController', () => {
  let controller: NftsController;
  let service: NftsService;

  const mockNft = {
    id: 1,
    nftId: 1,
    nftName: 'Test NFT',
    nftDescription: 'Test Description',
    nftLogoUrl: 'https://test.com/logo.png',
    nftOwnerAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockNftsService = {
    storeNft: jest.fn(),
    getNftById: jest.fn(),
    getNftGallaryByUserWalletAddress: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NftsController],
      providers: [
        {
          provide: NftsService,
          useValue: mockNftsService,
        },
      ],
    }).compile();

    controller = module.get<NftsController>(NftsController);
    service = module.get<NftsService>(NftsService);
  });

  describe('storeNft', () => {
    it('should create a new NFT', async () => {
      const dto = {
        nftName: 'Test NFT',
        nftDescription: 'Test Description',
        nftLogoUrl: 'https://test.com/logo.png',
        nftId: 1,
        userWalletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      };

      const expectedResponse = {
        statusCode: HttpStatus.CREATED,
        message: 'Nft record has been successfully created.',
        data: mockNft,
      };

      mockNftsService.storeNft.mockResolvedValue(expectedResponse);

      const result = await controller.storeNft(dto);

      expect(result).toEqual(expectedResponse);
      expect(mockNftsService.storeNft).toHaveBeenCalledWith(dto);
    });
  });

  describe('getNftById', () => {
    it('should return an NFT by ID', async () => {
      const expectedResponse = {
        statusCode: HttpStatus.OK,
        message: 'Nft record has been successfully retrieved.',
        data: mockNft,
      };

      mockNftsService.getNftById.mockResolvedValue(expectedResponse);

      const result = await controller.getNftById(1);

      expect(result).toEqual(expectedResponse);
      expect(mockNftsService.getNftById).toHaveBeenCalledWith(1);
    });
  });

  describe('getNftGallary', () => {
    it('should return NFTs for a wallet address', async () => {
      const walletAddress = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
      const expectedResponse = {
        statusCode: HttpStatus.OK,
        message: 'Nft gallery has been successfully retrieved.',
        data: [mockNft],
      };

      mockNftsService.getNftGallaryByUserWalletAddress.mockResolvedValue(
        expectedResponse,
      );

      const result = await controller.getNftGallary(walletAddress);

      expect(result).toEqual(expectedResponse);
      expect(
        mockNftsService.getNftGallaryByUserWalletAddress,
      ).toHaveBeenCalledWith(walletAddress);
    });
  });
});
