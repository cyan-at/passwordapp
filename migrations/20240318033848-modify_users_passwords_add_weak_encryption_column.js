'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
        'UserPasswords',
        'weak_encryption',
        {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        }
    ),
        await queryInterface.addColumn(
            'UserPasswords',
            'source_password_id',
            {
                type: Sequelize.INTEGER,
                defaultValue: null,
            }
        )
},

async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('UserPasswords', 'weak_encryption');
    await queryInterface.removeColumn('UserPasswords', 'source_password_id');
}
};
