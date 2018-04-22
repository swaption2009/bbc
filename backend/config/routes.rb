Rails.application.routes.draw do
  resources :items do
    collection do
      put :category_price_change
      put :update_selected_items_price
    end
  end
end
