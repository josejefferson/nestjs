import { ApiProperty } from '@nestjs/swagger'
import * as bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'
import { IsEnum, IsString } from 'class-validator'
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { BaseEntity } from '../../base/entities/base.entity'
import { Product } from '../../products/entities/product.entity'

export enum RoleEnum {
  ADMIN = 'admin',
  CUSTOMER = 'customer'
}

@Entity()
export class User extends BaseEntity {
  @ApiProperty({ example: 'Joe' })
  @Column()
  @IsString()
  name: string

  @ApiProperty({ example: 'user@email.com' })
  @Column({ unique: true })
  @IsString()
  username: string

  @ApiProperty({ enum: ['admin', 'customer'] })
  @Column({ default: RoleEnum.ADMIN })
  @IsEnum(RoleEnum)
  role: 'admin' | 'customer'

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string

  @ManyToMany(() => Product)
  @JoinTable()
  cart: Product[]

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 12)
    }
  }
}
