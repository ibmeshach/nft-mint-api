import { ApiProperty } from '@nestjs/swagger';

export class Nft {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nftId: number;

  @ApiProperty()
  nftName: string;

  @ApiProperty()
  nftDescription: string;

  @ApiProperty()
  nftLogoUrl: string;

  @ApiProperty()
  nftOwnerAddress: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  constructor(partial: Partial<Nft>) {
    Object.assign(this, partial);
  }
}
