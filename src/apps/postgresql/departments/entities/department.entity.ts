import { AbstractEntity } from 'src/resources/base/abstract-entity-base';
import { Column, Entity, Unique } from 'typeorm';

@Entity()
@Unique('UniqueDepartmentName', ['name'])
export class Department extends AbstractEntity<Department> {
  @Column()
  name: string;

  @Column()
  location: string;
}
