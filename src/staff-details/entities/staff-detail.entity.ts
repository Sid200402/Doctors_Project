import { Account } from "src/account/entities/account.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StaffDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', length: 100, nullable: true} )
  name: string;

  @Column({type: 'varchar', length: 100, nullable: true })
  email: string;


  @Column({ type: 'varchar', length: 500, nullable: true })
  address: string;


  @Column({ type: 'varchar', length: 100, nullable: true })
  wpNo: string;

 

  @Column({ type: 'uuid', nullable: true })
  accountId: string;

  @ManyToOne(() => Account, (account) => account.staffDetail,{  onUpdate: 'CASCADE', onDelete: 'CASCADE', })
  account: Account;
}