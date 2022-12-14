Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")

  # We only need "search" method
  resource :locations, only: [] do
    get '/search', to: 'locations#search'
  end
end
