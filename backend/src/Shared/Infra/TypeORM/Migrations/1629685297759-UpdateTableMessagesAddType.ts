import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateTableMessagesAddType1629685297759
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'messages',
      new TableColumn({
        name: 'type',
        type: 'enum',
        enum: ['info', 'text'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('messages', 'type');
  }
}
