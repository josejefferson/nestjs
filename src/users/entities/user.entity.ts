import { ApiProperty } from '@nestjs/swagger'
import * as bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'
import { IsInt, IsString } from 'class-validator'
import { BaseEntity } from 'src/base/entities/base.entity'
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
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
