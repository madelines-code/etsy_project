class Product < ApplicationRecord
  belongs_to :seller

# SELECT products.name, price, description, category, s.name AS seller FROM products
# INNER JOIN sellers AS s ON products.seller_id = s.id
# ORDER BY s.id ASC;
  def self.index_products_on_seller_id
    select('products.id, products.name, products.seller_id, price, description, category, s.name AS sellerName, s.email')
    .joins('INNER JOIN sellers AS s ON products.seller_id = s.id')
    .order('s.id')
  end

end
