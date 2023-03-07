import { IsNotEmpty, IsString } from 'class-validator';

export class GetMintsDTO {
  @IsNotEmpty()
  @IsString()
  collectionName: string;
}
