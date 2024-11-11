import { AbstractEntity } from 'src/resources/base/abstract-entity-base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Ward } from '../../wards/entities/ward.entity';
import { YesNoEnum } from 'src/resources/enum/yes-no.enum';

@Entity()
export class Bed extends AbstractEntity<Bed> {
  @Column()
  bedNo: number;

  @ManyToOne(() => Ward, (ward) => ward.beds)
  @JoinColumn()
  ward: Ward;

  @Column()
  active: YesNoEnum;
}
