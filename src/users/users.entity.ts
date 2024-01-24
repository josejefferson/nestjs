import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import { Exclude } from 'class-transformer'
import * as bcrypt from 'bcrypt'
import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsString } from 'class-validator'

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'user@email.com' })
  @Column({ unique: true })
  @IsString()
  username: string

  @ApiProperty({ example: 29 })
  @Column()
  @IsInt()
  idade: number

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 12)
    }
  }
}
