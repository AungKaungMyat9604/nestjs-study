import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { YesNoEnum } from '../enum/yes-no.enum';

export abstract class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: YesNoEnum.Yes })
  active: YesNoEnum;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  modifyDate: Date;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
