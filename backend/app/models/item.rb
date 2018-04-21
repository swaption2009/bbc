class Item < ApplicationRecord
  validates :sku, uniqueness: true
end
