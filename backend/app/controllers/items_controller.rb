class ItemsController < ApplicationController
  before_action :set_item, only: [:show, :update, :destroy]

  # GET /items
  def index
    @items = Item.all

    render json: @items
  end

  # GET /items/1
  def show
    render json: @item
  end

  # POST /items
  def create
    @item = Item.new(item_params)

    if @item.save
      render json: @item, status: :created, location: @item
    else
      render json: @item.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /items/1
  def update
    if @item.update(item_params)
      render json: @item
    else
      render json: @item.errors, status: :unprocessable_entity
    end
  end

  # DELETE /items/1
  def destroy
    @item.destroy
  end

  def category_price_change
    category = params[:category]
    us_percent_change = params[:usPercentChange]
    jp_percent_change = params[:jpPercentChange]
    category_items = Item.where(category: category)
                 .update_all("us_price = (1 + #{us_percent_change}) * us_price,
                              jp_price = (1 + #{jp_percent_change}) * jp_price")

    render json: { message: "Prices in #{category} category have been updated!", body: category_items }
  end

  def update_selected_items_price
    ids = params[:product_ids]
    # byebug
    ids.each do |id|
      item = Item.find(id)
      new_us_price = 1.1 * item.us_price
      item.update_attributes(us_price: new_us_price)
    end

    render json: { message: "#{ids.count} records have been updated", body: ids }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_item
      @item = Item.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def item_params
      params.require(:item).permit(:category,
                                   :sku,
                                   :us_name,
                                   :us_price,
                                   :us_currency,
                                   :jp_name,
                                   :jp_price,
                                   :jp_currency,
                                   :usPercentChange,
                                   :jpPercentChange)
    end
end
