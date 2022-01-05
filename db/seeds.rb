# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# u1 = User.create(email: "test@test.com", password: 123456)


# p u1
categories = [
  'Cameras',
  'Tea',
  'Comics',
]



10.times do
  s = Seller.create(
    name: Faker::Name.name,
    email: Faker::Internet.email,
  )

  5.times do
    num_categories = rand(0..categories.length - 1);
    Buyer.create(
      name: Faker::Name.name,
      max_price: rand(10..1000),
      desired_categories: categories.sample(num_categories),
      seller_id: s.id
    )
  end
  
  2.times do
    price = rand(200..1000)
    p = Product.create(
      name: Faker::Camera.brand_with_model,
      price: price,
      description: "Describing a camera is like describing a thing you don't want to describe.",
      category: "Cameras",
      seller_id: s.id 
  )
  end

  2.times do
    price = rand(10..100)
    p = Product.create(
      name: Faker::Tea.variety,
      price: price,
      description: "Tastes like brown water",
      category: "Tea",
      seller_id: s.id 
  )
  end

  2.times do
    price = rand(10..1000)
    p = Product.create(
      name: Faker::DcComics.title,
      price: price,
      description: "A rare find indeed.",
      category: "Comics",
      seller_id: s.id 
  )
  end

  
end