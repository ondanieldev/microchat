import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateTableMessages1629062099552
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'messages',
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
            name: 'content',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
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
      'messages',
      new TableForeignKey({
        name: 'messages_user_id',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'messages',
      new TableForeignKey({
        name: 'messages_room_id',
        columnNames: ['room_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'rooms',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('messages', 'messages_room_id');

    await queryRunner.dropForeignKey('messages', 'messages_user_id');

    await queryRunner.dropTable('messages');
  }
}
