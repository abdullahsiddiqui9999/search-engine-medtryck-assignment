class ApplicationController < ActionController::Base
  def search
    puts "Hellow orld"

    respond_to do |format|
      format.json { render json: { abdull: "fgjk" } }
    end
  end
end
