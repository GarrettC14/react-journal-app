import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity({name : "journalentry"})
export class JournalEntry {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      type: "varchar",
      length : 8
  })
    date: string;

    @Column({
      type: "varchar",
  })
    description: string;

    @Column({
      type: "varchar",
  })
    label: string;
}
