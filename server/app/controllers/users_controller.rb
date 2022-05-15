class UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]

    def create
    @user=User.new(user_params)
    if @user.save
      render :create 
    else
      puts(@user.errors.full_messages)
      head(:unprocessable_entity)
    end
  end 

  def user_edit
    user=User.where(id: params[:id])
    if user==nil 
      puts("============ in the null user =============")
      render json: { error: true, message: 'User not found !'}, 
      status: 401 and return
    end
    if user.update(user_modified_params)
      puts("============ in the user updated  =============")
      render json: user.as_json(only: [:id ,:first_name,:last_name,:username,:age,:gender, :email,:authentication_token]),status: :created
    else
      puts(user.errors.full_messages)
      head(:unprocessable_entity)
    end
  end
  
  
  # #get /users"
  # def index
  #   @users = User.all
  #   render json: @users
  # end

  # GET /user/1
  # def show
  #   render json: @user
  # end

  def userfriend
    x=Friend.find_by(user_id: current_user.id, friend_id: params[:id])
    if x.block==true
      render json: { error: true, message: 'You are not authorized to see this profile'}, :status => :unauthorized and return
    end

    user=User.where(id: params[:id]).first
    if user==nil 
      render json: { error: true, message: 'User not found !'}, 
      status: 401 and return
    else 
      render json: user.as_json(only: [:id ,:first_name,:last_name,:username,:age,:gender, :email]),status: :created
       
    end
  end

  # PATCH/PUT /user/1/
  def update
    if @user.update(user_modified_params)
      render json: @user
    else
      render json: ErrorSerializer.serialize(@user.errors.full_messages), status: :unprocessable_entity
    end
  end

  # # DELETE /user/1
  # def destroy
  #   if @user.destroy
  #    render json: {success: true , message: 'User was successfully destroyed'}
  #   else
  #     render json: {success: false , message:"User cant be deleted/"=}
  # end
  # def update_info
  #   puts(" inthe update function ========================")
  #   # @user = User.find(params[:id])
  #   # if @user.update(user_params)
  #   #   puts 'the user info successfully updated' #add whatever you want
  #   # else
  #   #   puts 'failed'
  #   # end
  # end
  def friends_index
    user=current_user
    friend_ids=user.friends.pluck(:friend_id)
    users=User.where.not(id: friend_ids << user.id)

    if users
      render json: users
    else
      render json: {status: false , message: 'No user found'}
    end
  end 

  def user_posts
    @user= User.find_by(user_post_params)
    if !@user.nil?
      render json: @user.posts
    else
      render json: {status: false , message: 'User does not exist.'}
    end
  end

  def all_info_for_friend
    user=User.find_by(user_for_friend_params);
    posts=user.posts
    comments_on_post=[];
    comments_users=[]

    for post in posts do
      comments_on_post.push(post.comments)
    end
    friends=user.friends
    
    render json: {comments: comments_on_post, friends: friends}
  end


  def user_posts_likes
    @user=User.find(user_post_params[:id]);
    @posts= @user.posts
    @total_likes_by_each_post=[];
    for post in @posts
      @total_likes_by_each_post.push({post_id: post.id, likes:post.post_likes.count})
    end

    render json: @total_likes_by_each_post

  end

  private 
  def user_params 
    params.require(:user).permit(:email,:password, :password_confirmation,:first_name,:last_name,:age,:gender,:username)
  end

  def user_post_params
    params.permit(:id)
  end
  def user_modified_params
    params.permit(:id,:first_name,:last_name,:age,:gender,:username,:email,);
  end
  def user_for_friend_params
    params.permit(:id)
  end


end
