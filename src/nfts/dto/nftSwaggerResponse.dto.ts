import { ApiProperty } from '@nestjs/swagger';
import { Nft } from '../serializers/nft.serializer';

export class NftGetNftGalleryResponseDto {
  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Nft gallery has been successfully retrieved.',
  })
  message: string;

  @ApiProperty({
    type: [Nft],
  })
  data: Nft[];
}

export class StoreNftResponseDto {
  @ApiProperty({
    example: 201,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Nft record has been successfully created.',
  })
  message: string;

  @ApiProperty({
    type: Nft,
  })
  data: Nft;
}

export class UpdateNftMintedStatusResponseDto {
  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Nft minted status has been successfully updated.',
  })
  message: string;
}
