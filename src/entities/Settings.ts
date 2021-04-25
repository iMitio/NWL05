import {Entity, PrimaryColumn, Column, CreateDateColumn} from  "typeorm"
import {v4  as  uuid} from  "uuid"
@Entity("settings")
export class Settings {
  @PrimaryColumn()
  id : string;

  @Column()
  username: string;

  @Column()
  chat: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;


  constructor() {
    if(!this.id) {
      this.id = uuid()
    }
  }
}