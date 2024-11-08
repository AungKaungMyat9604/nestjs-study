import { AbstractEntity } from 'src/resources/base/abstract-entity-base';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Ward } from '../../wards/entities/ward.entity';
import { YesNoEnum } from 'src/resources/enum/yes-no.enum';

@Entity()
export class Bed extends AbstractEntity<Bed> {
  @Column()
  name: string;

  @Column()
  @ManyToOne(() => Ward, (ward) => ward.name)
  ward: string;

  @Column()
  active: YesNoEnum;
}
