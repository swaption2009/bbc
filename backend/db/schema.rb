# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_04_22_153159) do

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categories_items", id: false, force: :cascade do |t|
    t.integer "category_id"
    t.integer "item_id"
    t.index ["category_id"], name: "index_categories_items_on_category_id"
    t.index ["item_id"], name: "index_categories_items_on_item_id"
  end

  create_table "items", force: :cascade do |t|
    t.string "category"
    t.string "sku"
    t.string "us_name"
    t.float "us_price"
    t.string "us_currency"
    t.string "jp_name"
    t.float "jp_price"
    t.string "jp_currency"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stores", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.string "countryIsoAlpha2"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
