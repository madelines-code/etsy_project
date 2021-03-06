Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    get "products", to: "products#index"
    get "buyers", to: "buyers#index"
  end
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
