class PostLikesController < ApplicationController
  # get all likes on the post
  def index
    @post= Post.find(post_likes_params[:post_id]);
    @postLikes=@post.post_likes;
    render :json => @postLikes, adapter: false;
  end
  # create a like on the post
  def create
    puts(post_likes_params);
    like_exist= PostLike.find_by(post_likes_params)
    if(like_exist.nil?)
      @like= PostLike.new(post_likes_params);
      if(@like.save)
        render :json => @like,status: :created, adapter: false
      else
        render :json => @like.errors.full_messages,status: :unprocessable_entity and return 404;
      end
    else
      render :json => {success:false, message:"User has already liked the post."};
    end
  end
  # destroy alike on the post
  def destroy

    @like= PostLike.find_by(post_likes_params)
    if !@like.nil?
      @like.destroy;
      render :json => {success: true,message: "Like was successfully destroyed."}
    else
      render :json =>{success: false,message: "Post was already destroyed."} 
      
    end

  end

  private 
  def post_likes_params
    params.permit(:post_id,:user_id);
  end
end
