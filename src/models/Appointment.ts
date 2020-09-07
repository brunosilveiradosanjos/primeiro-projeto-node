// const { v4: uuid } = require('uuid');
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

// @ eh um decorator
// Funciona como função, que recebe a classe abaixo com um parâmetro da entidade
@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: string;

    @Column('time with time zone')
    date: Date;

    // constructor({ provider, date }: Omit<Appointment, 'id'>) {
    //     this.id = uuid();
    //     this.provider = provider;
    //     this.date = date;
    // }
}

export default Appointment;