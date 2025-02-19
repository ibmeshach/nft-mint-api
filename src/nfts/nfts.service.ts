import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StoreNftDto } from './dto/storeNft.dto';

@Injectable()
export class NftsService {
  constructor(private readonly prisma: PrismaService) {}

  async storeNft(body: StoreNftDto) {
    const { nftName, nftDescription, nftLogoUrl, nftId, userWalletAddress } =
      body;

    const existingNft = await this.prisma.nft.findUnique({
      where: { nftId },
    });

    if (existingNft) {
      throw new BadRequestException('Nft record with nftID already exists');
    }

    const nft = await this.prisma.nft.create({
      data: {
        nftName,
        nftDescription,
        nftLogoUrl,
        nftId,
        nftOwnerAddress: userWalletAddress,
      },
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Nft record has been successfully created.',
      data: nft,
    };
  }

  async getNftById(nftId: number) {
    const nft = await this.prisma.nft.findUnique({
      where: { nftId },
    });

    if (!nft) {
      throw new NotFoundException('Nft record with nftId not found');
    }

    return nft;
  }

  async getNftGallaryByUserWalletAddress(userWalletAddress: string) {
    const nfts = await this.prisma.nft.findMany({
      where: { nftOwnerAddress: userWalletAddress },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (nfts.length === 0) {
      throw new NotFoundException(
        'Nft gallery with userWalletAddress not found',
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Nft gallery has been successfully retrieved.',
      data: nfts,
    };
  }
}
