import type { UserEntity } from "../entities/user.ts";

export class UserValue implements UserEntity {
    uuid: string;
    name: string;
    email: string;
    username: string;

    constructor({ email, name, username, uuid }: UserEntity){
        this.uuid = 'NUESTRO_UUID_ID'
        this.name = name
        this.email = email
        this.username = username
    }
    
}