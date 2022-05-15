Rails.application.routes.draw do
  default_url_options :host => "localhost:3000"
  resources :chats
  resources :friends
  resources :friend_requests

  resources :posts do 
    get '/comments/userinfo',to: 'comments#get_comments_userInfo_for_each_post'
    get '/postlikes',to: 'post_likes#index';
    post '/postlikes/users/createlike/:user_id', to: 'post_likes#create';
    delete '/postlikes/users/deletelike/:user_id', to: 'post_likes#destroy';
    get 'posts',to:'posts#index'
    resources :comments do
    post '/reply', to: 'comments#create_comment_reply' 
    end

  end

  post '/users', to:'users#create'
  post '/users/sign_in', to: 'sessions#create'
  delete '/users/sign_out', to: 'sessions#destroy'
  get '/user_posts/:id', to: 'users#user_posts'
  get '/user_posts/likes/:id', to: 'users#user_posts_likes'
  patch '/edituser',to: 'users#user_edit'
  get '/addfriend',to: 'users#friends_index'
  get '/requests/:id',to: 'friend_requests#user_friendRequests'
  get '/usersfriend/:id',to: 'users#userfriend'

  get'/userfriend/info/:id',to: 'users#all_info_for_friend'

  delete '/removefriend/:id/:current_user',to: 'friends#remove_friend'
  patch '/block/:id/:current_user',to: 'friends#block'
  patch '/unblock/:id/:current_user',to: 'friends#unblock'
  get '/messages/:id',to: 'chats#current_user_messages'

  devise_for :users,expect: [:update]

end
