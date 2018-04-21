class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :category
      t.string :sku
      t.string :us_name
      t.float :us_price
      t.string :us_currency
      t.string :jp_name
      t.float :jp_price
      t.string :jp_currency

      t.timestamps
    end
  end
end
