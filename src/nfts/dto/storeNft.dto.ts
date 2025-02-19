import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StoreNftDto {
  @ApiProperty({
    description: 'The name of the NFT',
    default: 'NFT Name',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  nftName: string;

  @ApiProperty({
    description: 'The description of the NFT',
    default: 'This is a description of the NFT',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  nftDescription: string;

  @ApiProperty({
    description: 'The logo url of the NFT',
    default: 'https://example.com/logo.png',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  nftLogoUrl: string;

  @ApiProperty({
    description: 'The unique ID of the NFT',
    default: 1,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  nftId: number;

  @ApiProperty({
    description: 'The wallet address of the user',
    default: '0x1234567890123456789012345678901234567890',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  userWalletAddress: string;
}
