export default (sequelize, DataTypes) => {
    return sequelize.define('comment', {
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tasks', 
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
  }
  