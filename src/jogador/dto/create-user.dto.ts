import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'Nome pelo o qual o user deseja ser chamado',
    required: true
  })
  readonly nome: string;
  @ApiProperty({
    example: 'Doe',
    description: 'Sobrenome pelo o qual o user deseja ser chamado',
    required: true
  })
  readonly sobrenome: string;
  @ApiProperty({
    example: 80757390781,
    description:
      'CPF do usuário, apenas com os dígitos, preenchido caso o mesmo queira concorrer a premiações',
    minimum: 0,
    maximum: 99999999999,
    required: false
  })
  readonly cpf: number;
  @ApiProperty({
    example: 'Jogador',
    description: 'Apelido público do jogador',
    required: false
  })
  readonly apelido: string;
  @ApiProperty({
    example: 'http://pudim.com.br/pudim.jpg',
    description: 'URL do avatar público do jogador',
    required: false
  })
  readonly avatar: string;
}
