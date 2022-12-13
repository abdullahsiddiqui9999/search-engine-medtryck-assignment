Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  resource :locations, only: [] do
    get '/search', to: 'application#search'
  end
end
