class CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :update, :destroy]

  # GET /comments
  def index
    @post=Post.find(comment_params[:post_id])
    @comments = @post.comments
    if @comments != nil
      render json: @comments
    else 
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # GET /comments/1
  def show
    render json: @comment
  end

  # POST /comments
  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render json: @comment, status: :created, location: post_comments_path(@comment)
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comments/1
  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1
  def destroy
     if @comment.destroy
      render json: {success: true , message: 'Comment was successfully destroyed'}
     else 
      render json: {success: false , message: 'Comment was unable to be destroyed'}
     end

  end

  def get_comments_userInfo_for_each_post
    post_id=post_comments_params[:post_id].to_i
    @post_comments= Post.find(post_id).comments
    @post_comment_userinfo= []
    if @post_comments != nil 
      for comment in @post_comments do
        @user= User.find_by(id: comment.user_id);
        
        @post_comment_userinfo.push({ comment_id: comment.id,post_id: comment.post_id, user_info: @user})
      end
       render json: @post_comment_userinfo, adapter: nil
    else
      render json: @post_comments.errors, status: :unprocessable_entity, message: "Failed to fetch Comments of the post."
    end

  end

  def create_comment_reply
    puts("create comment reply working")
    @comment_reply= Comment.new(create_comment_reply_params);
    if @comment_reply.save
      render json: @comment_reply, status: :created
    else
      render json: @comment_reply.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def comment_params
      params.permit(:body, :post_id, :user_id, :parent_comment_id,:user_name)
    end
    def post_comments_params
      params.permit(:post_id) 
    end
    def create_comment_reply_params
      params.permit(:user_id,:post_id, :parent_comment_id ,:body,:user_name)
    end
end
