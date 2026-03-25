import { Table, Column, DataType, HasMany, Model } from 'sequelize-typescript';
import Expense from './Expense';

// Modelo: Presupuesto
@Table({
  tableName: 'budgets'
})

class Budget extends Model {
  @Column({
    type: DataType.STRING(100)
  })
  declare name: string
  
  @Column({
    type: DataType.DECIMAL
  })
  declare amount: number

  // un Budget tiene muchos Expenses [un presupuesto tiene muchos gastos]
  @HasMany(() => Expense, {
    onUpdate: 'CASCADE', // RESTRICT
    onDelete: 'CASCADE'
  })
  declare exprenses: Expense[]
}

export default Budget