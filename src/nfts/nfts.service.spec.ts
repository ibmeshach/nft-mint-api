import { Test, TestingModule } from '@nestjs/testing';
import { NftsService } from './nfts.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('NftsService', () => {
  let service: NftsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    nft: {
      findUnique: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NftsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<NftsService>(NftsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('storeNft', () => {
    it('should create a new NFT successfully', async () => {
      const dto = {
        nftName: 'Test NFT',
        nftDescription: 'Test Description',
        nftLogoUrl: 'https://test.com/logo.png',
        nftId: 1,
        userWalletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      };

      mockPrismaService.nft.findUnique.mockResolvedValue(null);
      mockPrismaService.nft.create.mockResolvedValue(mockNft);

      const result = await service.storeNft(dto);

      expect(result.statusCode).toBe(201);
      expect(result.data).toEqual(mockNft);
      expect(mockPrismaService.nft.create).toHaveBeenCalledWith({
        data: {
          nftName: dto.nftName,
          nftDescription: dto.nftDescription,
          nftLogoUrl: dto.nftLogoUrl,
          nftId: dto.nftId,
          nftOwnerAddress: dto.userWalletAddress,
        },
      });
    });

    it('should throw BadRequestException if NFT already exists', async () => {
      const dto = {
        nftId: 1,
        nftName: 'Test NFT',
        nftDescription: 'Test Description',
        nftLogoUrl: 'https://test.com/logo.png',
        userWalletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      };

      mockPrismaService.nft.findUnique.mockResolvedValue(mockNft);

      await expect(service.storeNft(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('getNftById', () => {
    it('should return an NFT if found', async () => {
      mockPrismaService.nft.findUnique.mockResolvedValue(mockNft);

      const result = await service.getNftById(1);

      expect(result).not.toBeNull();
      expect(result).toEqual(mockNft);
    });

    it('should throw NotFoundException if NFT not found', async () => {
      mockPrismaService.nft.findUnique.mockResolvedValue(null);

      await expect(service.getNftById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getNftGallaryByUserWalletAddress', () => {
    it('should return NFTs for a valid wallet address', async () => {
      const mockNfts = [mockNft];
      mockPrismaService.nft.findMany.mockResolvedValue(mockNfts);

      const result = await service.getNftGallaryByUserWalletAddress(
        '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      );

      expect(result.statusCode).toBe(200);
      expect(result.data).toEqual(mockNfts);
    });

    it('should throw NotFoundException if no NFTs found for wallet', async () => {
      mockPrismaService.nft.findMany.mockResolvedValue([]);

      await expect(
        service.getNftGallaryByUserWalletAddress(
          '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
