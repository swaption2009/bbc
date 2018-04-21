require 'test_helper'

class ItemsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @item = items(:one)
  end

  test "should get index" do
    get items_url, as: :json
    assert_response :success
  end

  test "should create item" do
    assert_difference('Item.count') do
      post items_url, params: { item: { category: @item.category, jp_currency: @item.jp_currency, jp_name: @item.jp_name, jp_price: @item.jp_price, sku: @item.sku, us_currency: @item.us_currency, us_name: @item.us_name, us_price: @item.us_price } }, as: :json
    end

    assert_response 201
  end

  test "should show item" do
    get item_url(@item), as: :json
    assert_response :success
  end

  test "should update item" do
    patch item_url(@item), params: { item: { category: @item.category, jp_currency: @item.jp_currency, jp_name: @item.jp_name, jp_price: @item.jp_price, sku: @item.sku, us_currency: @item.us_currency, us_name: @item.us_name, us_price: @item.us_price } }, as: :json
    assert_response 200
  end

  test "should destroy item" do
    assert_difference('Item.count', -1) do
      delete item_url(@item), as: :json
    end

    assert_response 204
  end
end
