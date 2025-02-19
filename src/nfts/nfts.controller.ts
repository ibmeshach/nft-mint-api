import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Patch,
} from '@nestjs/common';
import { NftsService } from './nfts.service';
import { StoreNftDto } from './dto/storeNft.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiSecurity,
} from '@nestjs/swagger';
import { Nft } from './serializers/nft.serializer';
import {
  NftGetNftGalleryResponseDto,
  StoreNftResponseDto,
  UpdateNftMintedStatusResponseDto,
} from './dto/nftSwaggerResponse.dto';
import { UpdateNftStatusDto } from './dto/updateNftStatus.dto';

@ApiTags('NFT')
@Controller('nfts')
export class NftsController {
  constructor(private readonly nftsService: NftsService) {}

  @ApiSecurity('x-api-key')
  @ApiCreatedResponse({
    description: 'Nft record has been successfully created.',
    type: StoreNftResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Nft record with nftID already exists',
  })
  @Post('store-nft')
  @HttpCode(HttpStatus.CREATED)
  async storeNft(@Body() body: StoreNftDto) {
    return this.nftsService.storeNft(body);
  }

  @ApiSecurity('x-api-key')
  @ApiOkResponse({
    description: 'Nft gallery has been successfully retrieved.',
    type: NftGetNftGalleryResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Nft gallery with userWalletAddress not found',
  })
  @ApiQuery({
    name: 'userWalletAddress',
    required: true,
    type: String,
    description: 'user wallet address',
    example: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    pattern: '^0x[a-fA-F0-9]{40}$',
  })
  @Get('gallery/all')
  @HttpCode(HttpStatus.OK)
  async getNftGallary(@Query('userWalletAddress') userWalletAddress: string) {
    return this.nftsService.getNftGallaryByUserWalletAddress(userWalletAddress);
  }

  @ApiOkResponse({
    description: 'Nft record has been successfully retrieved.',
    type: Nft,
  })
  @ApiNotFoundResponse({
    description: 'Nft record with nftId not found',
  })
  @ApiParam({
    name: 'nftId',
    type: 'integer',
    description: 'The ID of the NFT',
    required: true,
    example: 1,
  })
  @Get('/:nftId')
  @HttpCode(HttpStatus.OK)
  async getNftById(@Param('nftId', ParseIntPipe) nftId: number) {
    return this.nftsService.getNftById(nftId);
  }

  @ApiSecurity('x-api-key')
  @ApiOkResponse({
    description: 'Nft minted status has been successfully updated.',
    type: UpdateNftMintedStatusResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Nft record with nftId not found',
  })
  @Patch('minted-status')
  @HttpCode(HttpStatus.OK)
  async updateNftMintedStatus(@Body() body: UpdateNftStatusDto) {
    return this.nftsService.updateNftMintedStatus(body);
  }
}
