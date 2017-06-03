// Remove constraint and index
queryInterface.sequelize.query(
    'ALTER TABLE "borrow" DROP CONSTRAINT IF EXISTS borrow_ibfk_1, DROP CONSTRAINT IF EXISTS borrow_ibfk_2, DROP CONSTRAINT IF EXISTS borrow_ibfk_3;'
).then(function () {
    return queryInterface.removeIndex('user', ['id_Product', 'id_Lender', 'id_Borrower']);
});

//Foreign Key
queryInterface.addConstraint('borrow', 'id_Product', {
    type: 'FOREIGN KEY',
    references: { //Required field
        table: 'product',
        field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
});

//Foreign Key
queryInterface.addConstraint('borrow', 'id_Lender', {
    type: 'FOREIGN KEY',
    references: { //Required field
        table: 'user',
        field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
});

//Foreign Key
queryInterface.addConstraint('borrow', 'id_Borrower', {
    type: 'FOREIGN KEY',
    references: { //Required field
        table: 'user',
        field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
});
