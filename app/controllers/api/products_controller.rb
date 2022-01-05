class Api::ProductsController < ApplicationController
  def index 
    render json: Product.index_products_on_seller_id
  end
end
