class ChatsController < ApplicationController
  before_action :set_chat, only: [:show, :update, :destroy]

  # GET /chats
  def index
    @chats = Chat.all
    render json: @chats
  end

  # GET /chats/1
  def show
    render json: @chat
  end


  def current_user_messages
    messages=Chat.where('(user_id = ? and friend_id = ?) OR (friend_id = ? and user_id = ?)',
          current_user.id,
          params[:id],
          current_user.id,
          params[:id]
        ).order('created_at ASC')
    if messages
      render json: messages
    else
      render json: messages.errors, status: :unprocessable_entity
    end
  end 

  # POST /chats
  def create
    @chat = Chat.new(chat_params)

    if @chat.save
      render json: @chat, status: :created, location: @chat
    else
      render json: @chat.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /chats/1
  def update
    if @chat.update(chat_params)
      render json: @chat
    else
      render json: @chat.errors, status: :unprocessable_entity
    end
  end

  # DELETE /chats/1
  def destroy
    @chat.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_chat
      @chat = Chat.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def chat_params
      params.require(:chat).permit(:user_id, :friend_id, :message)
    end
end
