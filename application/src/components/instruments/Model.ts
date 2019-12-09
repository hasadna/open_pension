import { DataTypes, Model, Sequelize } from "sequelize";

export class InstrumentsModel extends Model {

    public static initModel(sequelize: Sequelize) {
        return this.init(
            {
                id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                },
                type: DataTypes.STRING,
            },
            { sequelize },
        );
    }

    public id!: number;
    public type!: string;
}
