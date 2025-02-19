import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNftStatusDto {
  @ApiProperty({
    description: 'The unique ID of the NFT',
    default: 1,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  nftId: number;

  @ApiProperty({
    description: 'The minted status of the NFT',
    default: true,
    type: Boolean,
  })
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
