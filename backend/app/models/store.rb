class Store < ApplicationRecord
  validates :address, uniqueness: true
end
