import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class Setting {

    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', length: 50, nullable: true })
    title: string;

    @Column({ type: 'varchar',length:200, nullable: true })
    desc: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    email: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    fbLink: string;
  
    @Column({ type: 'varchar', length: 100, nullable: true })
    instaLink: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    twiterLink: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    printrestLink: string;

    @Column({ type: 'varchar', length: 14, nullable: true })
    callUs: string;

    @Column({ type: 'varchar', length: 14, nullable: true })
    callNumber: string;

    @Column({ type: 'varchar', length: 14, nullable: true })
    suppNumber: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    address: string;
  
    @Column({type: 'text',  nullable: true})
    logo: string;
  
    @Column({type: 'text', nullable: true})
    logoPath: string;

    @Column({ type: 'varchar', length:250, nullable: true })
    workingTime:string;

    @Column({ type: 'varchar', length:250, nullable: true })
    workingDays:string;
  
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

}
