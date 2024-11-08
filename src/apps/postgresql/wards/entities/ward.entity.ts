import { AbstractEntity } from 'src/resources/base/abstract-entity-base';
import { YesNoEnum } from 'src/resources/enum/yes-no.enum';
import { Column, Entity, Unique } from 'typeorm';

@Entity()
@Unique('UniqueWardName', ['name'])
export class Ward extends AbstractEntity<Ward> {
  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  active: YesNoEnum;
}
