import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from './car.entity';
import { CarSides } from 'src/enums/car-sides.enum';
import { DamageType } from 'src/enums/damage-type.enum';

@Entity()
export class Damage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car, (car) => car.damages, { onDelete: 'CASCADE' })
  car: Car;

  @Column({ nullable: true, enum: CarSides })
  car_side: CarSides;

  @Column({type: 'numeric',precision: 18,scale: 16})
  x_coordinate: number;

  @Column({
    type: 'numeric',
    precision: 18,
    scale: 16,
  })
  y_coordinate: number;

  @Column({ type: 'enum', enum: DamageType })
  type: DamageType;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  damage_registered_at: Date;

}
