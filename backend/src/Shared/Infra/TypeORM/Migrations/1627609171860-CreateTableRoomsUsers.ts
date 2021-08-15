import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTableRoomsUsers1627609171860
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rooms_users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'room_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'rooms_users',
      new TableForeignKey({
        name: 'rooms_users_user_id',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'rooms_users',
      new TableForeignKey({
        name: 'rooms_users_room_id',
        columnNames: ['room_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'rooms',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('rooms_users', 'rooms_users_room_id');

    await queryRunner.dropForeignKey('rooms_users', 'rooms_users_user_id');

    await queryRunner.dropTable('rooms_users');
  }
}
