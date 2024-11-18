import { Title } from 'src/apps/main/titles/entities/title.entity';
import { AbstractEntity } from 'src/resources/base/abstract-entity-base';
import { YesNoEnum } from 'src/resources/enum/yes-no.enum';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class User extends AbstractEntity<User> {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @ManyToOne(() => Title, (title) => title.name)
  title: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true, default: YesNoEnum.NO })
  isLocked: YesNoEnum;

  @Column({ nullable: true, default: YesNoEnum.NO })
  isAdmin: YesNoEnum;
}
