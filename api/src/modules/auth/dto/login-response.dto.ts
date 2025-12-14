import { ApiProperty } from "@nestjs/swagger";

export class LoginResponse {
  @ApiProperty({
    example: "Loged successfully"
  })
  message: string;

  @ApiProperty({
    example: "token example"
  })
  token: string;
}
