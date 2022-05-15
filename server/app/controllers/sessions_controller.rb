class SessionsController < ApplicationController

  def create 
    user=User.where(email: params[:email]).first
    if user==nil 
      render json: { error: true, message: 'User not found !'}, 
      status: 401 and return
    end

      if user &.valid_password?(params[:password])
          render json: user.as_json(only: [:id ,:first_name,:last_name,:username,:age,:gender, :email,:authentication_token]),status: :created
      else 
          head(:unauthorized)
      end
  end 
  
  def destroy
    if current_user==nil 
      render json: { error: true, message: 'no current User Login'}, status: 200 and return
    end
    current_user.invalidate_all_sessions!
    render json: { success: true, message: 'you are sucessfully log out '},
    status: 200 and return
  end

end