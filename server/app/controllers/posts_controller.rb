class PostsController < ApplicationController
  include ErrorSerializer
  # before_action :authenticate_user!

  
  before_action :set_post, only: [:show, :update, :destroy]

  # GET /posts
  def index
    @posts = Post.all

    render json: @posts
  end

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    @post = Post.new(post_params)
    puts(@post)
    if @post.save
      render json: @post,status: :created, location: @post
    else
      render json: ErrorSerializer.serialize(@post.errors.messages.full_messages), status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_update_params)
      render json: @post
    else
      render json: ErrorSerializer.serialize(@post.errors), status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
    render json: {success: true , message: 'Post was successfully destroyed'}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def post_params
      params.permit(:id,:title, :description,:user_id) 
    end
    def post_update_params
      params.permit(:id,:title, :description) 
    end
end
