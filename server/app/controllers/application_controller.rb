class ApplicationController < ActionController::API
    before_action :configure_permitted_parameters, if: :devise_controller?
    acts_as_token_authentication_handler_for User, except: [:create]
  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:account_update, keys: [:id,:first_name, :last_name, :age, :email, :password, :password_confirmation,:gender,:username])
  end

end
