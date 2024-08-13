import {IsString, IsNotEmpty} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  public thumbnail: string;
}

export class UpdateBookDto {
  @IsString()
  @IsNotEmpty()
  public title: string;
}
