import { ApiProperty } from "@nestjs/swagger";

export class DefaultResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  id: string;
}
