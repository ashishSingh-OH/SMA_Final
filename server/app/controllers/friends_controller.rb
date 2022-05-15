class FriendsController < ApplicationController
  before_action :set_friend, only: [:show, :update, :destroy]

  # GET /friends
  def index
    friend_ids=current_user.friends.pluck(:friend_id)
    u=User.where(id: friend_ids).joins(:friends).select('users.*,friends.block')
    render json: u 
  end

  # GET /friends/1
  def show
    render json: @friend
  end

  def block 
    puts("=======================")
    puts(" in the block function ")
    friend=Friend.find_by(user_id: params[:id], friend_id: params[:current_user])
    friend.block=true
    if friend.save   
       render status: 200
    end
  end 

  def unblock 
    puts("=======================")
    puts(" in the unblock  function ")
    friend=Friend.find_by(user_id: params[:id], friend_id: params[:current_user])
    friend.block=false
    if friend.save   
       render status: 200
    end
  end 

  # POST /friends
  def create
    @friend = Friend.new(friend_params)
    if @friend.save
      render json: @friend, status: :created, location: @friend
    else
      render json: @friend.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /friends/1
  def update
    if @friend.update(friend_params)
      render json: @friend
    else
      render json: @friend.errors, status: :unprocessable_entity
    end
  end

  # DELETE /friends/1
  def destroy
    @friend.destroy
  end


  def remove_friend
    friend=Friend.find_by(user_id: params[:id],friend_id: params[:current_user])
    if friend.destroy
      render json: { message: "Friend Successfully removed"}, status: :created
    else
      render json: {message: "Friend not removed"}, status: :unprocessable_entity
    end
  end 
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friend
      @friend = Friend.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def friend_params
      params.require(:friend).permit(:user_id, :friend_id)
    end
end
