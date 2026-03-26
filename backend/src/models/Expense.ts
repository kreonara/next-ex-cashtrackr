import { Table, Column, DataType, AllowNull, BelongsTo, ForeignKey, Model } from 'sequelize-typescript';
import Budget from './Budget';

// Modelo: Presupuesto
@Table({
  tableName: 'expenses'
})

class Expense extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100)
  })
  declare name: string
  
  @AllowNull(false)
  @Column({
    type: DataType.DECIMAL
  })
  declare amount: number

  @ForeignKey(() => Budget)
  declare budgetId: number

  // un Expense tiene un Budget [un gasto tiene un presupuesto]
  @BelongsTo(() => Budget)
  declare budget: Budget
}

export default Expense