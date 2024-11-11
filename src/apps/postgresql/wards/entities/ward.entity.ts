import { AbstractEntity } from 'src/resources/base/abstract-entity-base';
import { YesNoEnum } from 'src/resources/enum/yes-no.enum';
import { Column, Entity, OneToMany } from 'typeorm';
import { Bed } from '../../beds/entities/bed.entity';

@Entity()
export class Ward extends AbstractEntity<Ward> {
  @Column({ unique: true })
  wardName: string;

  @Column()
  location: string;

  @OneToMany(() => Bed, (bed) => bed.ward)
  beds: Bed[];

  @Column()
  active: YesNoEnum;
}
