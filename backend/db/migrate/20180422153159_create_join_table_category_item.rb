class CreateJoinTableCategoryItem < ActiveRecord::Migration[5.2]
  def change
    create_join_table :categories, :items do |t|
      t.references :category, foreign_key: true
      t.references :item, foreign_key: true
    end
  end
end
