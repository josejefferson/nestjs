import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import { Exclude } from 'class-transformer'
import * as bcrypt from 'bcrypt'

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ApiProperty()
  @Column()
  username: string

  @ApiProperty()
  @Column()
  idade: number

  @ApiProperty()
  @Column({ select: false })
  @Exclude()
  password: string

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 12)
    }
  }
}
